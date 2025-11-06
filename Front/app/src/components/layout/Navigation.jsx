import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './Navigation.css';

/**
 * Navigation - 전역 상단 네비게이션 바 컴포넌트
 *
 * 애플리케이션의 메인 네비게이션을 제공합니다:
 * - 로고 (홈으로 이동)
 * - 메인 메뉴 (Home, About, Contact, Test)
 * - 사용자 인증 영역 (로그인/로그아웃 상태에 따라 다른 버튼 표시)
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.user - 현재 로그인된 사용자 정보 (null이면 로그아웃 상태)
 * @param {Function} props.onLogin - 로그인 버튼 클릭 핸들러
 * @param {Function} props.onLogout - 로그아웃 버튼 클릭 핸들러
 * @param {Function} props.onCreateAccount - 회원가입 버튼 클릭 핸들러
 */
export const Navigation = ({ user = null, onLogin, onLogout, onCreateAccount }) => {
    const navigate = useNavigate();

    return (
        <div className="nav-wrapper">
            {/* 로고 영역 */}
            <div className="nav-logo-container">
                <a className="nav-logo" href="/" aria-label="Nori Logo">
                    <img src="https://placehold.co/32x32" alt="Nori Logo" />
                </a>
            </div>
            {/* 메인 메뉴 */}
            <nav className="nav-menu-container" aria-label="Main Navigation">
                <div className="nav-menu">
                    <Button onClick={() => navigate('/')}>Home</Button>
                    <Button onClick={() => navigate('/about')}>About</Button>
                    <Button onClick={() => navigate('/contact')}>Contact</Button>
                    <Button onClick={() => navigate('/test')}>Test</Button>
                </div>
            </nav>
            <div className="nav-actions-container">
                <div className="nav-actions" aria-label="User Actions">
                    {user ? (
                        <>
                            <span className="welcome">
                                Welcome, <b>{user.name}</b>!
                            </span>
                            <Button onClick={onLogout}>Log out</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={onLogin}>Log in</Button>
                            <Button onClick={onCreateAccount}>Sign up</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
