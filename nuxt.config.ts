export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            vercelEnv: process.env.VERCEL_ENV,
        },
    },

    devtools: { enabled: true },

    typescript: { strict: true },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
        'nuxt-swiper',
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt"
    ],

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            htmlAttrs: {
                lang: 'ru',
            },
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