import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
    plugins: [
        solidPlugin(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ensocharts',
            fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: [], // No external deps, bundle everything (including solid-js)
            output: {
                globals: {
                    // If we had externals
                }
            }
        }
    },
});
