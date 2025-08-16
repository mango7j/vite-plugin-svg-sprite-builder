#!/usr/bin/env node

import {promises as fs} from "fs"
import path from "node:path"
import {generateSprite, createIIFEScript} from "./core.js"

interface CliOptions {
  iconsDir: string
  outFile: string
  format: "js" | "svg"
}

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name)
  return idx > -1 ? process.argv[idx + 1] : undefined
}

async function buildSprite(options: CliOptions): Promise<void> {
  const {iconsDir, outFile, format} = options
  const resolvedIconsDir = path.resolve(process.cwd(), iconsDir)
  const resolvedOutFile = path.resolve(process.cwd(), outFile)
  const outDir = path.dirname(resolvedOutFile)

  const {sprite, iconCount} = await generateSprite({iconDir: resolvedIconsDir})

  await fs.mkdir(outDir, {recursive: true})
  
  if (format === "svg") {
    await fs.writeFile(resolvedOutFile, sprite, "utf-8")
  } else {
    const js = createIIFEScript(sprite)
    await fs.writeFile(resolvedOutFile, js, "utf-8")
  }
  
  console.log(`[svg-sprite] Generated ${path.relative(process.cwd(), resolvedOutFile)} with ${iconCount} icons`)
}

async function main(): Promise<void> {
  const iconsArg = getArg("--icons") || "./assets/icons"
  const outArg = getArg("--out") || "dist/sprite.js"
  const formatArg = (getArg("--format") || "js") as "js" | "svg"

  if (formatArg !== "js" && formatArg !== "svg") {
    console.error('[svg-sprite] Invalid format. Use "js" or "svg"')
    process.exit(1)
  }

  try {
    await buildSprite({
      iconsDir: iconsArg,
      outFile: outArg,
      format: formatArg
    })
  } catch (err) {
    console.error("[svg-sprite] build failed:", err)
    process.exit(1)
  }
}

main()