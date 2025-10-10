import { fn } from 'storybook/test';
import { Navigation } from '../components/Navigation';

export default {
    title: 'Components/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    args: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn()
    }
};

export const LoggedIn = {
    args: {
        user: {
            name: 'Jane Doe'
        }
    }
};

export const LoggedOut = {};
