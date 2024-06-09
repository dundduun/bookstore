export default defineNuxtConfig({
    runtimeConfig: {
      public: {
          vercelEnv: process.env.VERCEL_ENV,
      }
    },

    devtools: { enabled: true },

    typescript: { strict: true },

    modules: [
        '@pinia/nuxt',
        '@nuxt/test-utils/module',
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
    ],

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "@/assets/styles/variables.scss" as *;',
                },
            },
        },
    },

    supabase: {
        redirect: false,
    },
});
