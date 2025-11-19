import { useParams } from 'react-router-dom';

/**
 * Workspace - 워크스페이스 홈 페이지
 *
 * 선택한 워크스페이스의 메인 대시보드입니다.
 * 워크스페이스 개요, 최근 활동, 프로젝트 목록 등을 보여줍니다.
 *
 * URL 구조:
 * - /
 * - /workspace/:workspaceId                        - 워크스페이스 홈 (이 페이지)
 * - /workspace/:workspaceId/projects               - 프로젝트 목록
 * - /workspace/:workspaceId/project/:projectId     - 프로젝트 상세
 * - /workspace/:workspaceId/members                - 멤버 관리
 * - /workspace/:workspaceId/settings               - 워크스페이스 설정
 */

export default function Workspace() {
    const { workspaceId } = useParams();

    return (
        <div className="workspace-home">
            <h1>워크스페이스</h1>
            <p>워크스페이스 ID: {workspaceId}</p>
        </div>
    );
}
