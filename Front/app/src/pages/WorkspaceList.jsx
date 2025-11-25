import { px } from 'framer-motion';
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
        { id: 'ws-1', name: '프론트엔드 팀', description: 'React 프로젝트', image: null, memberCount: 5 },
        { id: 'ws-2', name: '백엔드 팀', description: 'Node.js API 개발', image: null, memberCount: 4 },
        { id: 'ws-3', name: '디자인 팀', description: 'UI/UX 디자인', image: null, memberCount: 3 },
        { id: 'ws-4', name: '프로젝트 관리', description: '전체 프로젝트 관리', image: null, memberCount: 8 }
    ];

    // 워크스페이스 핸들러
    const handleWorkspaceSelect = workspaceId => {
        navigate(`/workspace/${workspaceId}`);
    };

    // 새 워크스페이스 생성 핸들러
    const handleCreateWorkspace = () => {
        // TODO: 워크스페이스 생성 모달/페이지
        console.log('새 워크스페이스 생성');
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>워크스페이스 선택</h1>

            <div style={styles.grid}>
                {workspaceList.map(ws => (
                    <div
                        key={ws.id}
                        style={styles.card}
                        onClick={() => handleWorkspaceSelect(ws.id)}
                    >
                        <div style={styles.imageBox}>
                            {ws.image || ws.name.charAt(0)}
                        </div>
                        <h3 style={styles.cardTitle}>{ws.name}</h3>
                        <p style={styles.description}>{ws.description}</p>
                        <span style={styles.member}>{ws.memberCount}명</span>
                    </div>
                ))}

                <div style={{ ...styles.card, ...styles.newCard }} onClick={handleCreateWorkspace}>
                    <span style={styles.newPlus}>+</span>
                    <p style={styles.newText}>새 워크스페이스</p>
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
        marginBottom: '24px',
        fontSize: '36px',
        fontWeight: 700,
    },

    // 그리드
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        padding: '10px'
    },

    // 카드
    card: {
        background: '#fff',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: '0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },

    // 카드 hover (JSX에서 별도로 적용 못해도 react로 가능)
    cardHover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 5px 16px rgba(0,0,0,0.12)'
    },

    imageBox: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        background: '#e8f0fe',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '26px',
        marginBottom: '15px',
        color: '#5a6fdf',
        fontWeight: 'bold'
    },

    cardTitle: {
        margin: '5px 0 8px',
        fontSize: '18px',
        fontWeight: '600'
    },

    description: {
        fontSize: '14px',
        color: '#666',
        margin: 0
    },

    member: {
        marginTop: '10px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#333'
    },
    scrollArea: {
        flex: 1,
        overflowY: 'auto',
        padding: '0 40px 40px 40px',
    },

    // 새 워크스페이스 카드
    newCard: {
        background: '#f5f7ff',
        border: '2px dashed #9da9ff',
        color: '#6370ff'
    },
    newPlus: {
        fontSize: '36px',
        fontWeight: 'bold'
    },
    newText: {
        marginTop: '10px',
        fontSize: '14px'
    }
};
