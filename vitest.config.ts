import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    // plugins: [vue()],
    // any custom Vitest config you require
    test: {
        environment: 'jsdom',
    },
})

