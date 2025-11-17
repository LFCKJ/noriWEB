import { useState } from 'react';
import Footer from '../components/layout/Footer';
import { Navigation } from '../components/layout/Navigation';
import Login from '../components/layout/Login';

export default function Main() {
    const [loginOpen, setLoginOpen] = useState(false);

    // 네비게이션에서 로그인 버튼 클릭 → 모달 열기
    const handleLogin = () => {
        setLoginOpen(true);
    };

    // 모달 닫기
    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    // 로그인 성공 시 처리 (선택)
    const handleLoginSuccess = (userData) => {
        console.log("로그인 성공:", userData);
        setLoginOpen(false);
    };

    return (
        <>
            <Navigation 
                onLogin={handleLogin}  // 여기서 Navigation에 onLogin 연결
            />

            메인 콘텐츠

            <Footer />

            {/* Login 모달 */}
            <Login
                open={loginOpen}
                onClose={handleLoginClose}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}
