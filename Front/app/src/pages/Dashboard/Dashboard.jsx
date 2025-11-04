import { Outlet } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div id="wrap_dashboard">
            <h2>대시보드</h2>
            <p>여기는 대시보드 페이지입니다.</p>
            <Outlet />
        </div>
    );
}
