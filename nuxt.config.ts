export default defineNuxtConfig({
    devtools: { enabled: true },

    typescript: { strict: true },

    modules: [
        '@pinia/nuxt', 
        '@nuxt/test-utils/module'
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
                    additionalData: '@use "@/assets/styles/_variables.scss" as *;',
                },
            },
        },
    },
});
