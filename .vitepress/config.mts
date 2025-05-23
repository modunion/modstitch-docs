import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Modstitch Documentation",
  description: "Documentation for Modstitch, a gradle plugin to unify official tooling for both Fabric and (Neo)Forge.",

  cleanUrls: true,
  base: "/modstitch-docs",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: {
      "/guide": [
        {
          text: 'Getting Started',
          items: [
            {
              text: "What is Modstitch?",
              link: "/guide/getting-started/what-is-modstitch"
            },
            {
              text: "Setting Up a Modstitch Project",
              link: "/guide/getting-started/setup"
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
