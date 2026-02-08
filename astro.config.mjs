import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          implementation: 'sass'
        }
      }
    },
    ssr: {
      external: ["svgo"]
    }
  },
  integrations: [
    mdx(), 
    icon({
      include: {
        'simple-icons': ["*"],
        'mdi': ["*"]
      }
    }), 
    tailwind({
      applyBaseStyles: false,
    }), 
    compress()
  ],
})
