export default defineNuxtConfig({
    devtools: { enabled: true },

    typescript: { strict: true },

    modules: ['@pinia/nuxt', '@nuxt/test-utils/module', "@nuxtjs/supabase"],

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

    supabase: {
        redirect: false,
        url: 'https://jbovtfmcskxgtxmagpsm.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impib3Z0Zm1jc2t4Z3R4bWFncHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTIwNzUsImV4cCI6MjAyOTcyODA3NX0.KhnRq6v5LMGNSnPW2hIZsUXO6kqUimxhxS-GwgT45Jo',
    },
});