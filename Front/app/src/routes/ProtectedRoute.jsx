import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // 로그인 안 했으면 로그인 페이지로 보내기
        return <Navigate to="/login" replace />;
    }

    return children; // 로그인 했으면 원래 페이지 보여주기
}
