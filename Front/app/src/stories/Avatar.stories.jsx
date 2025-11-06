import { Avatar } from '../components';

export default {
    title: 'UI/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered'
    },
    args: {
        name: 'John Doe',
        size: 'medium',
        variant: 'default'
    },
    argTypes: {
        name: {
            control: 'text',
            description: '사용자 이름 (이니셜 표시용)'
        },
        image: {
            control: 'text',
            description: '프로필 이미지 URL'
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large', 'xlarge'],
            description: '아바타 크기'
        },
        variant: {
            control: 'select',
            options: ['default', 'personal', 'add'],
            description: '아바타 스타일 변형'
        },
        onClick: {
            action: 'clicked',
            description: '클릭 이벤트 핸들러'
        }
    }
};

// 기본 아바타 (이니셜)
export const Default = {};

// 이미지가 있는 아바타
export const WithImage = {
    args: {
        name: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
};

// 다양한 크기
export const Small = {
    args: {
        name: 'Small User',
        size: 'small'
    }
};

export const Large = {
    args: {
        name: 'Large User',
        size: 'large'
    }
};

export const ExtraLarge = {
    args: {
        name: 'XL User',
        size: 'xlarge'
    }
};

// 개인 공간 스타일
export const Personal = {
    args: {
        name: 'Personal',
        variant: 'personal'
    }
};

// 추가 버튼 스타일
export const Add = {
    args: {
        name: '+',
        variant: 'add'
    }
};

// 클릭 가능한 아바타
export const Clickable = {
    args: {
        name: 'Clickable User',
        onClick: () => alert('Avatar clicked!')
    }
};

// 크기별 그룹
export const Sizes = () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Avatar name="S" size="small" />
        <Avatar name="M" size="medium" />
        <Avatar name="L" size="large" />
        <Avatar name="XL" size="xlarge" />
    </div>
);

// 변형별 그룹
export const Variants = () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Avatar name="D" variant="default" />
        <Avatar name="P" variant="personal" />
        <Avatar name="+" variant="add" />
    </div>
);
