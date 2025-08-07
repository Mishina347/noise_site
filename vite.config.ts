import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	base: '/noise_site/',
	build: {
		outDir: 'dist',
		target: 'esnext',
		sourcemap: false,
	},
	plugins: [
		react(),

		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: {
				name: 'noise',
				short_name: 'noise',
				start_url: '/noise_site/',
				scope: '/noise_site/',
				display: 'standalone',
				background_color: '#111111',
				theme_color: '#111111',
				icons: [
					{
						src: 'icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
})
