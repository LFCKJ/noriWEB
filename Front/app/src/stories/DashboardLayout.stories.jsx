import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardLayout } from '../components';

export default {
    title: 'Layout/DashboardLayout',
    component: DashboardLayout,
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    argTypes: {
        groups: {
            description: '그룹 목록 배열'
        },
        selectedGroup: {
            description: '현재 선택된 그룹'
        },
        tabs: {
            description: '탭 목록 배열'
        },
        onPersonalSelect: {
            action: 'personal-selected',
            description: '개인 공간 선택 핸들러'
        },
        onGroupSelect: {
            action: 'group-selected',
            description: '그룹 선택 핸들러'
        },
        onCreateGroup: {
            action: 'create-group',
            description: '새 그룹 만들기 핸들러'
        },
        onTabClick: {
            action: 'tab-clicked',
            description: '탭 클릭 핸들러'
        },
        isActiveTab: {
            description: '활성 탭 판별 함수'
        }
    }
};

// 개인 공간 선택 상태
export const PersonalSpace = {
    args: {
        groups: [
            { id: '1', name: 'React Study', image: null },
            {
                id: '2',
                name: 'Design Team',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
            },
            { id: '3', name: 'Frontend Dev', image: null }
        ],
        selectedGroup: 'personal',
        tabs: [
            { id: 'notes', name: '개인 노트' },
            { id: 'tasks', name: '할 일 목록' },
            { id: 'calendar', name: '캘린더' }
        ],
        isActiveTab: tab => tab.id === 'notes'
    }
};

// 그룹 선택 상태
export const GroupSelected = {
    args: {
        groups: [
            { id: '1', name: 'React Study', image: null },
            {
                id: '2',
                name: 'Design Team',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
            },
            { id: '3', name: 'Frontend Dev', image: null }
        ],
        selectedGroup: { id: '1', name: 'React Study', image: null },
        tabs: [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' },
            { id: 'members', name: '멤버' },
            { id: 'settings', name: '설정' }
        ],
        isActiveTab: tab => tab.id === 'chat'
    }
};

// 빈 그룹 목록
export const EmptyGroups = {
    args: {
        groups: [],
        selectedGroup: 'personal',
        tabs: [
            { id: 'notes', name: '개인 노트' },
            { id: 'tasks', name: '할 일 목록' }
        ],
        isActiveTab: tab => tab.id === 'notes'
    }
};

// 많은 그룹들
export const ManyGroups = {
    args: {
        groups: Array.from({ length: 10 }, (_, i) => ({
            id: `group-${i + 1}`,
            name: `그룹 ${i + 1}`,
            image:
                i % 3 === 0
                    ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
                    : null
        })),
        selectedGroup: {
            id: 'group-3',
            name: '그룹 3',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
        },
        tabs: [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' },
            { id: 'members', name: '멤버' },
            { id: 'calendar', name: '캘린더' },
            { id: 'tasks', name: '할 일' },
            { id: 'notes', name: '노트' },
            { id: 'settings', name: '설정' }
        ],
        isActiveTab: tab => tab.id === 'files'
    }
};

// 인터랙티브 대시보드
export const Interactive = () => {
    const [selectedGroup, setSelectedGroup] = React.useState('personal');
    const [activeTabId, setActiveTabId] = React.useState('notes');

    const groups = [
        { id: '1', name: 'React Study', image: null },
        {
            id: '2',
            name: 'Design Team',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop'
        },
        { id: '3', name: 'Frontend Dev', image: null },
        { id: '4', name: 'Marketing', image: null }
    ];

    const getTabsForGroup = group => {
        if (group === 'personal') {
            return [
                { id: 'notes', name: '개인 노트' },
                { id: 'tasks', name: '할 일 목록' },
                { id: 'calendar', name: '캘린더' }
            ];
        }

        return [
            { id: 'chat', name: '채팅' },
            { id: 'files', name: '파일' },
            { id: 'members', name: '멤버' },
            { id: 'settings', name: '설정' }
        ];
    };

    const handleGroupChange = group => {
        setSelectedGroup(group);
        const newTabs = getTabsForGroup(group);
        setActiveTabId(newTabs[0]?.id || 'chat');
    };

    const currentTabs = getTabsForGroup(selectedGroup);
    const selectedGroupObj =
        selectedGroup === 'personal' ? 'personal' : groups.find(g => g.id === selectedGroup);

    return (
        <div style={{ height: '100vh' }}>
            <DashboardLayout
                groups={groups}
                selectedGroup={selectedGroupObj}
                tabs={currentTabs}
                onPersonalSelect={() => handleGroupChange('personal')}
                onGroupSelect={group => handleGroupChange(group.id)}
                onCreateGroup={() => alert('새 그룹 만들기')}
                onTabClick={tab => setActiveTabId(tab.id)}
                isActiveTab={tab => tab.id === activeTabId}
            />
        </div>
    );
};

// 반응형 테스트
export const ResponsiveTest = () => (
    <div>
        <div
            style={{
                marginBottom: '20px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '8px'
            }}>
            <h3>반응형 테스트</h3>
            <p>브라우저 창 크기를 조절해서 반응형 동작을 확인해보세요.</p>
        </div>

        <div style={{ height: '80vh' }}>
            <DashboardLayout
                groups={[
                    { id: '1', name: 'React Study', image: null },
                    { id: '2', name: 'Design Team', image: null }
                ]}
                selectedGroup={{ id: '1', name: 'React Study', image: null }}
                tabs={[
                    { id: 'chat', name: '채팅' },
                    { id: 'files', name: '파일' },
                    { id: 'members', name: '멤버' }
                ]}
                onPersonalSelect={() => {}}
                onGroupSelect={() => {}}
                onCreateGroup={() => {}}
                onTabClick={() => {}}
                isActiveTab={tab => tab.id === 'chat'}
            />
        </div>
    </div>
);
