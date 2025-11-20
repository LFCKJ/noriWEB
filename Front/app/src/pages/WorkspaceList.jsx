import { useNavigate } from 'react-router-dom';

/**
 * WorkspaceList - 워크스페이스 목록 페이지
 *
 * 사용자가 속한 모든 워크스페이스를 보여주고 선택할 수 있는 페이지입니다.
 * 로그인 후 가장 먼저 보이는 화면으로, 워크스페이스를 선택하면 해당 워크스페이스로 이동합니다.
 *
 * URL: /workspaces
 */
export default function WorkspaceList() {
    const navigate = useNavigate();

    // 사용자가 속한 워크스페이스 목록 (임시 데이터)
    // TODO: API로 실제 데이터 가져오기
    const workspaceList = [
        {
            id: 'ws-1',
            name: '프론트엔드 팀',
            description: 'React 프로젝트',
            image: null,
            memberCount: 5
        },
        {
            id: 'ws-2',
            name: '백엔드 팀',
            description: 'Node.js API 개발',
            image: null,
            memberCount: 4
        },
        { id: 'ws-3', name: '디자인 팀', description: 'UI/UX 디자인', image: null, memberCount: 3 },
        {
            id: 'ws-4',
            name: '프로젝트 관리',
            description: '전체 프로젝트 관리',
            image: null,
            memberCount: 8
        }
    ];

    // 워크스페이스 선택 핸들러
    const handleWorkspaceSelect = workspaceId => {
        navigate(`/workspace/${workspaceId}`);
    };

    // 새 워크스페이스 생성 핸들러
    const handleCreateWorkspace = () => {
        // TODO: 워크스페이스 생성 모달/페이지
        console.log('새 워크스페이스 생성');
    };

    return (
        <div className="workspace-list-page">
            <h1>워크스페이스 선택</h1>

            <div className="workspace-grid">
                {workspaceList.map(workspace => (
                    <div
                        key={workspace.id}
                        className="workspace-card"
                        onClick={() => handleWorkspaceSelect(workspace.id)}>
                        <div className="workspace-image">
                            {workspace.image || workspace.name.charAt(0)}
                        </div>
                        <h3>{workspace.name}</h3>
                        <p>{workspace.description}</p>
                        <span>{workspace.memberCount}명</span>
                    </div>
                ))}

                <div className="workspace-card create-new" onClick={handleCreateWorkspace}>
                    <span>+</span>
                    <p>새 워크스페이스</p>
                </div>
            </div>
        </div>
    );
}
