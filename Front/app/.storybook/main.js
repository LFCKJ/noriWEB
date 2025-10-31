/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        '@storybook/addon-essentials' // 기본 컨트롤·액션·도큐먼트 등 유용한 기능
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {}
    },

    // 👇 React 19 JSX 런타임 강제 인식 설정
    viteFinal: async config => {
        config.esbuild = {
            jsx: 'automatic',
            jsxImportSource: 'react'
        };
        return config;
    }
};

export default config;
