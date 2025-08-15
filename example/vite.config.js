import { resolve } from 'path'
import { svgSpritePlugin } from 'vite-plugin-svg-sprite-builder'

export default {
  plugins: [
    svgSpritePlugin({
      iconDir: resolve(__dirname, './icons'),
      mode: 'inline' // Try different modes: 'inline' | 'file' | 'hybrid'
    })
  ]
}