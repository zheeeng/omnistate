import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [react(), windiCSS()]
})
