/* eslint-disable no-unused-vars */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
    decorators: [
        Story => (
            <MemoryRouter initialEntries={['/']}>
                <Story />
            </MemoryRouter>
        )
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
