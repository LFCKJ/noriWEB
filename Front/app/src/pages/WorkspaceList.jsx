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
        { id: 'ws-1', name: '프론트엔드 팀', description: 'React 개발 팀', memberCount: 12 },
        { id: 'ws-2', name: '백엔드 팀', description: 'Node.js 개발 팀', memberCount: 8 },
        { id: 'ws-3', name: '디자인 팀', description: 'UI/UX 디자인 팀', memberCount: 5 },
        { id: 'ws-4', name: '프로젝트 관리', description: 'PM 및 기획 팀', memberCount: 3 }
    ];

    const handleWorkspaceSelect = workspaceId => navigate(`/workspace/${workspaceId}`);
    const handleCreateWorkspace = () => console.log('새 워크스페이스 생성');

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>워크스페이스 선택</h1>
            <p className="bg-red-500">테스트</p>

            <div style={styles.grid}>
                {workspaceList.map(ws => (
                    <div
                        key={ws.id}
                        style={styles.card}
                        onClick={() => handleWorkspaceSelect(ws.id)}>
                        <div style={styles.iconCircle}>{ws.name.charAt(0)}</div>

                        <div style={styles.textBox}>
                            <div style={styles.cardTitle}>{ws.name}</div>
                            <div style={styles.description}>{ws.description}</div>
                            <div style={styles.member}>멤버 {ws.memberCount}명</div>
                        </div>
                    </div>
                ))}

                {/* 새 워크스페이스 */}
                <div style={{ ...styles.card, ...styles.newCard }} onClick={handleCreateWorkspace}>
                    <div style={styles.plusCircle}>+</div>
                    <div style={styles.newTextBox}>
                        <div style={styles.newTitle}>새 워크스페이스 만들기</div>
                        <div style={styles.newDescription}>새 워크스페이스를 생성합니다</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* -----------------------------
   스타일 객체 
------------------------------ */
const styles = {
    page: {
        padding: '30px'
    },

    title: {
        fontSize: '32px',
        fontWeight: 700,
        marginBottom: '30px'
    },

    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px'
    },

    card: {
        width: '260px',
        height: '130px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '18px',
        padding: '20px',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: '0.2s'
    },

    cardHover: {
        transform: 'translateY(-4px)'
    },

    iconCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#3b82f6',
        color: '#fff',
        fontSize: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },

    textBox: {
        display: 'flex',
        flexDirection: 'column'
    },

    cardTitle: {
        fontSize: '18px',
        fontWeight: 700,
        marginBottom: '4px'
    },

    description: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '6px'
    },

    member: {
        fontSize: '14px',
        color: '#6366f1',
        fontWeight: 600
    },

    // 새 그룹 카드
    newCard: {
        background: '#f0fdf4',
        border: '2px dashed #86efac'
    },

    plusCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#22c55e',
        color: '#fff',
        fontSize: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },

    newTextBox: {
        display: 'flex',
        flexDirection: 'column'
    },

    newTitle: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#16a34a',
        marginBottom: '4px'
    },

    newDescription: {
        fontSize: '14px',
        color: '#4ade80'
    }
};
