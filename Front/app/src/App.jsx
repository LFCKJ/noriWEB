import { Outlet, Link } from 'react-router-dom';

export default function App() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/">홈</Link> | <Link to="/about">소개</Link> |{' '}
                    <Link to="/contact">연락처</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
