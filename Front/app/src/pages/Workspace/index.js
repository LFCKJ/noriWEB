/**
 * Workspace Pages Export
 *
 * 개별 워크스페이스 관련 페이지 컴포넌트들을 관리합니다.
 * 특정 워크스페이스(:workspaceId) 안에서 사용되는 페이지들입니다.
 */

// TODO: 워크스페이스 페이지 컴포넌트 구현 예정

// 워크스페이스 홈 페이지 - 선택한 워크스페이스의 대시보드 (/workspace/:id)
// export { default as WorkspaceHome } from './WorkspaceHome';

// 프로젝트 상세 페이지 - 워크스페이스 내 특정 프로젝트 (/workspace/:id/project/:projectId)
// export { default as ProjectDetail } from './ProjectDetail';

// 워크스페이스 설정 페이지 - 워크스페이스 관리 (/workspace/:id/settings)
// export { default as WorkspaceSettings } from './WorkspaceSettings';

// 멤버 관리 페이지 - 워크스페이스 멤버 초대/관리 (/workspace/:id/members)
// export { default as MemberManagement } from './MemberManagement';

export { default as Workspace } from './Workspace';
export { default as WorkspaceHome } from './WorkspaceHome';
