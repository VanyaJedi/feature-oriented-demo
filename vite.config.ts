import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@infra': fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        },
    },
})
