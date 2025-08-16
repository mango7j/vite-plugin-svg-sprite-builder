import {promises as fs} from "fs"
import path from "node:path"
import type {Plugin} from "vite"
import {generateSprite, createInlineScript, createIIFEScript} from "./core.js"

const virtualId = "virtual:svg-sprite"

export type SpriteMode = "inline" | "file" | "hybrid"

export interface SvgSpritePluginOptions {
  iconDir: string
  mode?: SpriteMode
  outputFile?: string
  autoInject?: boolean
  svgoConfig?: any
}

export function svgSpritePlugin(options: SvgSpritePluginOptions): Plugin {
  const {
    iconDir,
    mode = "inline",
    outputFile = "dist/sprite.svg",
    autoInject = true,
    svgoConfig
  } = options

  return {
    name: "vite-plugin-svg-sprite",
    resolveId(id) {
      if (id === virtualId) {
        return id
      }
    },
    async load(id) {
      if (id === virtualId) {
        const {sprite} = await generateSprite({iconDir, svgoConfig})
        
        if (mode === "inline") {
          return createInlineScript(sprite)
        } else if (mode === "file") {
          return `// Sprite will be generated as a static file at build time`
        } else if (mode === "hybrid") {
          // In development, use inline mode for HMR
          // In production, defer to buildStart hook for file generation
          return createInlineScript(sprite)
        }
      }
    },
    async buildStart() {
      if (mode === "file" || mode === "hybrid") {
        const {sprite} = await generateSprite({iconDir, svgoConfig})
        
        // Write sprite as a static SVG file
        const outputPath = path.resolve(outputFile)
        const outputDir = path.dirname(outputPath)
        
        await fs.mkdir(outputDir, {recursive: true})
        await fs.writeFile(outputPath, sprite, "utf-8")
        
        console.log(`[svg-sprite] Generated ${path.relative(process.cwd(), outputPath)}`)
      }
    },
    transformIndexHtml: {
      enforce: "pre",
      transform(html) {
        if ((mode === "file" || mode === "hybrid") && autoInject) {
          // Inject sprite loading script into HTML
          const script = `<script>
            fetch('/${path.basename(outputFile)}')
              .then(res => res.text())
              .then(sprite => {
                const container = document.createElement('div');
                container.id = '__svg_sprite_container__';
                container.innerHTML = sprite;
                document.body.insertBefore(container, document.body.firstChild);
              });
          </script>`
          
          return html.replace('</head>', `${script}\n</head>`)
        }
        return html
      }
    }
  }
}
