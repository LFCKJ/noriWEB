import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

/**
 * Dashboard - 메인 대시보드 페이지 컴포넌트
 *
 * Discord 스타일의 2단계 네비게이션 구조를 제공합니다:
 * 1. 좌측 사이드바: 개인 공간 + 그룹 목록 + 새 그룹 추가
 * 2. 상단 탭바: 선택된 그룹/개인공간의 기능별 탭들
 *
 * URL 구조:
 * - /dashboard/personal - 개인 공간
 * - /dashboard/personal/{tab} - 개인 공간의 특정 탭
 * - /dashboard/groups/{groupId} - 그룹 메인
 * - /dashboard/groups/{groupId}/{tab} - 그룹의 특정 탭
 */
export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();
    const [selectedGroup, setSelectedGroup] = useState(null);

    // 개인 공간 데이터
    const personalSpace = { id: 'personal', name: '개인 공간', image: null };

    // 사용자가 속한 그룹 목록 (임시 데이터)
    const groups = [
        { id: '1', name: '프론트엔드 팀', image: null },
        { id: '2', name: '백엔드 팀', image: null },
        { id: '3', name: '디자인 팀', image: null },
        { id: '4', name: '프로젝트 관리', image: null }
    ];

    // 개인 공간에서 사용할 수 있는 탭 메뉴들
    const personalTabs = [
        { id: 'dashboard', name: '대시보드', path: '' },
        { id: 'projects', name: '내 프로젝트', path: 'projects' },
        { id: 'notes', name: '노트', path: 'notes' },
        { id: 'settings', name: '설정', path: 'settings' }
    ];

    // 그룹에서 사용할 수 있는 탭 메뉴들
    const groupTabs = [
        { id: 'dashboard', name: '대시보드', path: '' },
        { id: 'test', name: '테스트', path: 'test' },
        { id: 'members', name: '멤버', path: 'members' },
        { id: 'analytics', name: '분석', path: 'analytics' },
        { id: 'settings', name: '설정', path: 'settings' }
    ];

    // 현재 개인 공간이 선택되었는지 URL로 판별
    const isPersonalSelected = location.pathname.startsWith('/dashboard/personal');

    // URL 변경 감지하여 선택된 그룹 상태 업데이트
    useEffect(() => {
        if (groupId) {
            const group = groups.find(g => g.id === groupId);
            setSelectedGroup(group);
        } else if (isPersonalSelected) {
            setSelectedGroup(personalSpace);
        } else {
            setSelectedGroup(null);
        }
    }, [groupId, isPersonalSelected]);

    // 개인 공간 선택 핸들러
    const handlePersonalSelect = () => {
        setSelectedGroup(personalSpace);
        navigate('/dashboard/personal');
    };

    // 그룹 선택 핸들러
    const handleGroupSelect = group => {
        setSelectedGroup(group);
        navigate(`/dashboard/groups/${group.id}`);
    };

    // 탭 클릭 핸들러 - 개인 공간과 그룹에 따라 다른 URL로 이동
    const handleTabClick = tab => {
        if (selectedGroup?.id === 'personal') {
            // 개인 공간 탭 클릭
            if (tab.path === '') {
                navigate('/dashboard/personal');
            } else {
                navigate(`/dashboard/personal/${tab.path}`);
            }
        } else {
            // 그룹 탭 클릭
            if (tab.path === '') {
                navigate(`/dashboard/groups/${groupId}`);
            } else {
                navigate(`/dashboard/groups/${groupId}/${tab.path}`);
            }
        }
    };

    // 현재 탭이 활성화되어 있는지 판별하는 함수
    const isActiveTab = tab => {
        if (selectedGroup?.id === 'personal') {
            const currentPath = location.pathname
                .replace('/dashboard/personal', '')
                .replace('/', '');
            return currentPath === tab.path;
        } else {
            const currentPath = location.pathname
                .replace(`/dashboard/groups/${groupId}`, '')
                .replace('/', '');
            return currentPath === tab.path;
        }
    };

    // 현재 선택된 공간에 따라 적절한 탭 목록 반환
    const getCurrentTabs = () => {
        return selectedGroup?.id === 'personal' ? personalTabs : groupTabs;
    };

    // 새 그룹 생성 핸들러
    const handleCreateGroup = () => {
        // TODO: 그룹 생성 모달
        console.log('새 그룹 생성');
    };

    return (
        <DashboardLayout
            groups={groups}
            selectedGroup={selectedGroup}
            tabs={getCurrentTabs()}
            onPersonalSelect={handlePersonalSelect}
            onGroupSelect={handleGroupSelect}
            onCreateGroup={handleCreateGroup}
            onTabClick={handleTabClick}
            isActiveTab={isActiveTab}
        />
    );
}
