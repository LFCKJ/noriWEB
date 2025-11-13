import React from 'react';
import { GroupItem } from '../components';

export default {
    title: 'Features/GroupItem',
    component: GroupItem,
    parameters: {
        layout: 'centered'
    },
    args: {
        active: false,
        variant: 'default'
    },
    argTypes: {
        group: {
            description: '그룹 데이터 객체 (name, image 포함)'
        },
        active: {
            control: 'boolean',
            description: '활성 상태'
        },
        variant: {
            control: 'select',
            options: ['default', 'personal', 'add'],
            description: '그룹 아이템 변형'
        },
        onClick: {
            action: 'clicked',
            description: '클릭 이벤트 핸들러'
        }
    }
};

// 기본 그룹
export const Default = {
    args: {
        group: {
            name: 'React Study',
            image: null
        }
    }
};

// 이미지가 있는 그룹
export const WithImage = {
    args: {
        group: {
            name: 'Design Team',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
        }
    }
};

// 활성 상태 그룹
export const Active = {
    args: {
        group: {
            name: 'Active Group',
            image: null
        },
        active: true
    }
};

// 개인 공간
export const Personal = {
    args: {
        variant: 'personal'
    }
};

// 개인 공간 (활성 상태)
export const PersonalActive = {
    args: {
        variant: 'personal',
        active: true
    }
};

// 새 그룹 추가
export const Add = {
    args: {
        variant: 'add'
    }
};

// 긴 이름을 가진 그룹
export const LongName = {
    args: {
        group: {
            name: 'JavaScript Development Team for Frontend Projects',
            image: null
        }
    }
};

// 그룹 목록 예시
export const GroupList = () => {
    const [activeGroup, setActiveGroup] = React.useState('personal');

    const groups = [
        { id: 'personal', variant: 'personal' },
        {
            id: 'react-study',
            group: {
                name: 'React Study',
                image: null
            }
        },
        {
            id: 'design-team',
            group: {
                name: 'Design Team',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
            }
        },
        {
            id: 'frontend-dev',
            group: {
                name: 'Frontend Dev',
                image: null
            }
        },
        { id: 'add', variant: 'add' }
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '8px',
                width: '80px'
            }}>
            {groups.map(item => (
                <GroupItem
                    key={item.id}
                    group={item.group}
                    variant={item.variant}
                    active={activeGroup === item.id}
                    onClick={() => setActiveGroup(item.id)}
                />
            ))}
        </div>
    );
};

// 다양한 상태들
export const States = () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
            <GroupItem group={{ name: 'Normal', image: null }} onClick={() => {}} />
            <small style={{ display: 'block', marginTop: '4px' }}>Normal</small>
        </div>
        <div style={{ textAlign: 'center' }}>
            <GroupItem group={{ name: 'Active', image: null }} active={true} onClick={() => {}} />
            <small style={{ display: 'block', marginTop: '4px' }}>Active</small>
        </div>
        <div style={{ textAlign: 'center' }}>
            <GroupItem variant="personal" onClick={() => {}} />
            <small style={{ display: 'block', marginTop: '4px' }}>Personal</small>
        </div>
        <div style={{ textAlign: 'center' }}>
            <GroupItem variant="personal" active={true} onClick={() => {}} />
            <small style={{ display: 'block', marginTop: '4px' }}>Personal Active</small>
        </div>
        <div style={{ textAlign: 'center' }}>
            <GroupItem variant="add" onClick={() => {}} />
            <small style={{ display: 'block', marginTop: '4px' }}>Add</small>
        </div>
    </div>
);
