import React from 'react';
import { TabButton } from '../components';

export default {
    title: 'UI/TabButton',
    component: TabButton,
    parameters: {
        layout: 'centered'
    },
    args: {
        children: '채팅',
        active: false,
        disabled: false
    },
    argTypes: {
        children: {
            control: 'text',
            description: '탭 버튼 텍스트'
        },
        active: {
            control: 'boolean',
            description: '활성 상태'
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 상태'
        },
        onClick: {
            action: 'clicked',
            description: '클릭 이벤트 핸들러'
        }
    }
};

// 기본 탭 버튼
export const Default = {};

// 활성 상태
export const Active = {
    args: {
        active: true
    }
};

// 비활성화 상태
export const Disabled = {
    args: {
        disabled: true
    }
};

// 활성화된 비활성화 버튼
export const ActiveDisabled = {
    args: {
        active: true,
        disabled: true
    }
};

// 다양한 텍스트
export const LongText = {
    args: {
        children: '파일 공유 및 관리'
    }
};

// 탭 그룹 예시
export const TabGroup = () => {
    const [activeTab, setActiveTab] = React.useState('chat');

    return (
        <div
            style={{
                display: 'flex',
                gap: '4px',
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '8px'
            }}>
            <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
                채팅
            </TabButton>
            <TabButton active={activeTab === 'files'} onClick={() => setActiveTab('files')}>
                파일
            </TabButton>
            <TabButton active={activeTab === 'members'} onClick={() => setActiveTab('members')}>
                멤버
            </TabButton>
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                설정
            </TabButton>
        </div>
    );
};
