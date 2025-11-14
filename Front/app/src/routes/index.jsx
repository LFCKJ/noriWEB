import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { Main, About, Contact, Test } from '../pages';
import ProtectedRoute from './ProtectedRoute';
import { Dashboard, DashboardHome, DashboardTest } from '../pages/Dashboard';

export default function Router() {
    return (
        <Routes>
            {/* App 안에 Outlet → Main/About/Contact... 렌더링 */}
            <Route path="/" element={<App />}>
                <Route index element={<Main />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="test" element={<Test />} />

                {/* 보호된 페이지 */}
                <Route
                    path="dashboard"
                    element={
                        // <ProtectedRoute> 로그인 기능 구현시 사용
                        <Dashboard />
                        // </ProtectedRoute>
                    }>
                    {/* 그룹이 선택되지 않았을 때의 기본 페이지 */}
                    <Route
                        index
                        element={
                            <div className="welcome-message">
                                <h2>환영합니다!</h2>
                                <p>왼쪽에서 개인 공간이나 그룹을 선택해주세요.</p>
                            </div>
                        }
                    />

                    {/* 개인 공간 */}
                    <Route path="personal">
                        <Route index element={<DashboardHome />} />
                        <Route path="projects" element={<div>내 프로젝트</div>} />
                        <Route path="notes" element={<div>개인 노트</div>} />
                        <Route path="settings" element={<div>개인 설정</div>} />
                    </Route>

                    {/* 특정 그룹의 대시보드 */}
                    <Route path="groups/:groupId">
                        <Route index element={<DashboardHome />} />
                        <Route path="members" element={<div>멤버 관리</div>} />
                        <Route path="settings" element={<div>그룹 설정</div>} />
                        <Route path="analytics" element={<div>분석</div>} />
                        <Route path="test" element={<DashboardTest />} />
                    </Route>
                </Route>

                {/* 필요시 둘 중에 하나로 사용 */}
                {/* 잘못된 경로일 때 */}
                {/* <Route path="*" element={<NotFound />} /> */}
                {/* 그 외 경로는 메인으로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
