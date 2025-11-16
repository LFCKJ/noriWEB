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
        <div className="personal-home">
            <header>
                <h1>내 개인 공간</h1>
                <p>나만의 프로젝트와 작업을 관리하세요</p>
            </header>

            <section>
                <h2>최근 프로젝트</h2>
                {/* <button onClick={() => navigate('/personal/projects')}>모든 프로젝트 보기</button> */}
            </section>

            <section>
                <h2>오늘 할 일</h2>
                {/* TODO: 할 일 목록 */}
            </section>
        </div>
    );
}
