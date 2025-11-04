import React from 'react';
import { TabNavigation } from '../components';

export default {
    title: 'Features/TabNavigation',
    component: TabNavigation,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        tabs: {
            description: '탭 배열 (각 탭은 id, name을 가져야 함)'
        },
        onTabClick: {
            action: 'tab-clicked',
            description: '탭 클릭 이벤트 핸들러'
        },
        isActiveTab: {
            description: '활성 탭 판별 함수'
        }
    }
};

// 기본 탭 내비게이션
export const Default = {
    args: {
        tabs: [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' },
            { id: 'members', name: '멤버' },
            { id: 'settings', name: '설정' }
        ],
        isActiveTab: tab => tab.id === 'chat'
    }
};

// 많은 탭들
export const ManyTabs = {
    args: {
        tabs: [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' },
            { id: 'members', name: '멤버' },
            { id: 'calendar', name: '캘린더' },
            { id: 'tasks', name: '할 일' },
            { id: 'notes', name: '노트' },
            { id: 'settings', name: '설정' },
            { id: 'analytics', name: '분석' }
        ],
        isActiveTab: tab => tab.id === 'files'
    }
};

// 짧은 탭들
export const ShortTabs = {
    args: {
        tabs: [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' }
        ],
        isActiveTab: tab => tab.id === 'chat'
    }
};

// 긴 이름을 가진 탭들
export const LongNames = {
    args: {
        tabs: [
            { id: 'chat', name: '실시간 채팅 메시지' },
            { id: 'files', name: '파일 공유 및 관리' },
            { id: 'members', name: '그룹 멤버 관리' },
            { id: 'settings', name: '그룹 설정 및 권한' }
        ],
        isActiveTab: tab => tab.id === 'members'
    }
};

// 인터랙티브 탭 내비게이션
export const Interactive = () => {
    const [activeTabId, setActiveTabId] = React.useState('chat');

    const tabs = [
        { id: 'chat', name: '채팅' },
        { id: 'files', name: '파일' },
        { id: 'members', name: '멤버' },
        { id: 'calendar', name: '캘린더' },
        { id: 'settings', name: '설정' }
    ];

    return (
        <div style={{ width: '100%', maxWidth: '600px' }}>
            <TabNavigation
                tabs={tabs}
                onTabClick={tab => setActiveTabId(tab.id)}
                isActiveTab={tab => tab.id === activeTabId}
            />

            <div
                style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                <h3>현재 선택된 탭: {tabs.find(tab => tab.id === activeTabId)?.name}</h3>
                <p>탭을 클릭해서 변경해보세요!</p>
            </div>
        </div>
    );
};

// 스크롤 가능한 긴 탭 목록
export const ScrollableTabs = () => {
    const [activeTabId, setActiveTabId] = React.useState('tab1');

    const tabs = Array.from({ length: 15 }, (_, i) => ({
        id: `tab${i + 1}`,
        name: `탭 ${i + 1}${i === 0 ? ' (긴 이름 예시)' : ''}`
    }));

    return (
        <div style={{ width: '400px' }}>
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                <TabNavigation
                    tabs={tabs}
                    onTabClick={tab => setActiveTabId(tab.id)}
                    isActiveTab={tab => tab.id === activeTabId}
                />
            </div>

            <div
                style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                활성 탭: <strong>{tabs.find(tab => tab.id === activeTabId)?.name}</strong>
            </div>
        </div>
    );
};

// 다양한 크기로 표시
export const Sizes = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
            <h4 style={{ marginBottom: '8px' }}>작은 컨테이너 (300px)</h4>
            <div style={{ width: '300px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <TabNavigation
                    tabs={[
                        { id: 'chat', name: '채팅' },
                        { id: 'files', name: '파일' },
                        { id: 'members', name: '멤버' },
                        { id: 'settings', name: '설정' }
                    ]}
                    onTabClick={() => {}}
                    isActiveTab={tab => tab.id === 'chat'}
                />
            </div>
        </div>

        <div>
            <h4 style={{ marginBottom: '8px' }}>큰 컨테이너 (600px)</h4>
            <div style={{ width: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <TabNavigation
                    tabs={[
                        { id: 'chat', name: '채팅' },
                        { id: 'files', name: '파일' },
                        { id: 'members', name: '멤버' },
                        { id: 'settings', name: '설정' }
                    ]}
                    onTabClick={() => {}}
                    isActiveTab={tab => tab.id === 'files'}
                />
            </div>
        </div>
    </div>
);
