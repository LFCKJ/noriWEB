// Button.stories.js
import { Button } from '../components';

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    args: {
        children: '버튼',
        variant: 'default',
        size: 'medium'
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'danger', 'ghost'],
            description: '버튼 스타일'
        },
        size: {
            control: 'radio',
            options: ['small', 'medium', 'large'],
            description: '버튼 크기'
        },
        children: { control: 'text', description: '버튼 텍스트' },
        disabled: { control: 'boolean', description: '비활성화 상태' }
    }
};

export const Default = {};
export const Large = { args: { size: 'large' } };
export const Red = { args: { bgColor: '#dc3545' } };
