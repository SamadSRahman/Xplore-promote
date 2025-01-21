import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import {nodePolyfills} from 'vite-plugin-node-polyfills';


const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0', // Allows external devices to connect
        port: 5173, // You can choose any port
      },
    plugins: [
        svelte(),
        nodePolyfills(),
    ],
    resolve: {
        alias: {
          crypto: 'crypto-browserify',
        },
      },
    base: isProduction ? process.env.PROD_BASE : undefined
});
