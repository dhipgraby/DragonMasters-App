import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		// host: '0.0.0.0',
		port: 4000,
		// hmr: {
		//   host: 'localhost',
		//   protocol: 'wss',
		//   port: 3001
		// },
		fs: {
			allow: ['static'],
		},
	},
};

export default config;
