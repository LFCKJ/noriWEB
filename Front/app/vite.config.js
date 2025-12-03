import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic', // React 17+ JSX runtime 강제
            jsxImportSource: 'react' // React 19 런타임 명시
        }),
        tailwindcss()
    ]
});
