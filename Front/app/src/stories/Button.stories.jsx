// Button.stories.js
import { Button } from '../components/Button';

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    args: {
        bgColor: '#007bff',
        color: '#ffffff',
        size: 'medium',
        label: '버튼',
        children: '버튼'
    },
    argTypes: {
        bgColor: { control: 'color', description: '배경색' },
        color: { control: 'color', description: '글자색' },
        size: {
            control: 'radio',
            options: ['small', 'medium', 'large'],
            description: '버튼 크기'
        },
        label: { control: 'text', description: '버튼 텍스트' }
    }
};

export const Default = {};
export const Large = { args: { size: 'large' } };
export const Red = { args: { bgColor: '#dc3545' } };
