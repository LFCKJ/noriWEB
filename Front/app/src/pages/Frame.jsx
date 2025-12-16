import { Outlet, useParams } from 'react-router-dom';
import { Sidebar } from '../components/layout';
import './Frame.css';

/**
 * Frame - 작업영역 틀
 *
 * 개인 공간과 워크스페이스의 공통 레이아웃 컴포넌트입니다.
 * 현재 위치에 따라 다른 사이드바를 표시합니다.
 *
 * URL 구조:
 * - /frame             - 작업 영역 프레임(디버깅용)
 * - /personal          - 개인 공간 (개인 사이드바)
 * - /spaces            - 워크스페이스 선택
 * - /workspace/:id     - 워크스페이스 상세 (워크스페이스 사이드바)
 */
export default function Frame() {
  const { workspaceId } = useParams();

  // 개인 공간 메뉴 데이터
  const personalMenus = [
    { id: 'home', name: '홈', path: '/personal', icon: '🏠' },
    { id: 'projects', name: '프로젝트', path: '/personal/projects', icon: '📁' },
    { id: 'notes', name: '노트', path: '/personal/notes', icon: '📝' },
    { id: 'settings', name: '설정', path: '/personal/settings', icon: '⚙️' }
  ];

  // 워크스페이스 메뉴 데이터
  const workspaceMenus = [
    { id: 'home', name: '홈', path: `/workspace/${workspaceId}`, icon: '🏠' },
    { id: 'members', name: '멤버', path: `/workspace/${workspaceId}/members`, icon: '👥' },
    { id: 'settings', name: '설정', path: `/workspace/${workspaceId}/settings`, icon: '⚙️' },
    { id: 'analytics', name: '분석', path: `/workspace/${workspaceId}/analytics`, icon: '📊' }
  ];

  //스페이스 메뉴 데이터
  const spaceMenus = personalMenus; // 개인 메뉴와 동일하게 설정

  const tempMenus = [
    { id: 'kanban', name: '대시보드', path: '/temp/kanban', icon: '칸반' },
    { id: 'tasks', name: '대시보드', path: '/temp/tasks', icon: '테' },
    { id: 'my-tasks', name: '대시보드', path: '/temp/my-tasks-test', icon: ' 마' }
  ];

  return (
    <div className="frame-layout">
      {/* 통합 사이드바 */}
      <Sidebar
        personalMenus={personalMenus}
        workspaceMenus={workspaceMenus}
        spaceMenus={spaceMenus}
        tempMenus={tempMenus}
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="frame-content">
        <Outlet />
      </main>
    </div>
  );
}
