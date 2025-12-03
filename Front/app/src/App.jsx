import { Outlet, Link } from 'react-router-dom';

export default function App() {
    return (
        <div>
            {/* 테스트 네비게이션, 배포시 삭제할 것 */}
            {/* <header>
                <nav>
                    <Link to="/">홈</Link> | <Link to="/about">소개</Link> |{' '}
                    <Link to="/contact">연락처</Link> | <Link to="/test">테스트</Link> |{' '}
                    <Link to="/dashboard">대시보드</Link>
                </nav>
            </header> */}
            <main>
                <Outlet /> 
            </main>
        </div>
    );
}
