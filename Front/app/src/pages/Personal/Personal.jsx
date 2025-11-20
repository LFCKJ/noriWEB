/**
 * Personal - 개인 공간 홈 페이지
 *
 * 개인 공간의 메인 대시보드입니다.
 * 개인 프로젝트, 작업, 노트 등의 요약을 보여줍니다.
 *
 * URL: /personal
 */
export default function Personal() {
    return (
        <div style={styles.wrap}>

            {/* 헤더 */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>내 개인 공간</h1>
                <p style={styles.headerSub}>나만의 프로젝트와 작업을 관리하세요</p>
            </header>

            {/* 헤더를 고정하고 내부 위젯(?)만 스크롤 */}
            <div style={styles.scrollArea}>

                <div style={styles.grid}>

                    {/* 최근 프로젝트 */}
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>최근 프로젝트</h2>
                        <p style={styles.item}>프로젝트 A</p>
                        <p style={styles.item}>프로젝트 B</p>
                        <p style={styles.item}>프로젝트 C</p>
                    </div>

                    {/* 내 일정 */}
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>내 일정</h2>
                        <p style={styles.empty}>일정이 없습니다.</p>
                    </div>

                    {/* 오늘 할 일 */}
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>오늘 할 일</h2>
                        <p style={styles.item}>UI 디자인 수정</p>
                        <p style={styles.item}>API 연결 테스트</p>
                    </div>

                    {/* 내 작업 */}
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>내 작업</h2>
                        <p style={styles.empty}>배정된 작업이 없습니다.</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>우선순위</h2>
                        <p style={styles.empty}>우선순위가 없습니다.</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>알림</h2>
                        <p style={styles.empty}></p>
                    </div>

                </div>
            </div>
        </div>
    );
}

const styles = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#f9f9fb',
    },

    header: {
        padding: '40px 40px 20px 40px',
    },
    headerTitle: {
        margin: 0,
        fontSize: '36px',
        fontWeight: 700,
    },
    headerSub: {
        marginTop: '8px',
        fontSize: '16px',
        color: '#555',
    },

    /* 스크롤 영역 */
    scrollArea: {
        flex: 1,
        overflowY: 'auto',
        padding: '0 40px 40px 40px',
    },

    /* 2x2 Grid */
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
    },

    /* 카드 스타일 */
    card: {
        background: '#fff',
        borderRadius: '14px',
        padding: '25px',
        minHeight: '180px',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: 700,
        margin: '0 0 16px 0',
    },

    item: {
        margin: '6px 0',
        fontSize: '15px',
        color: '#333',
    },
    /* 카드안에 들어가는 내용 */
    empty: {
        marginTop: '10px',
        fontSize: '15px',
        color: '#999',
    },
};


