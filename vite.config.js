import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import path from 'path'

export default defineConfig({
  base: "/",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      frontmatter: true, // чтобы читать YAML в начале файла
      markdownItSetup(md) {
        // плагины markdown-it при необходимости
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})