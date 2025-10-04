import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import About from '../pages/About';
import Contact from '../pages/Contact';

export default function Router() {
    return (
        <Routes>
            {/* App 안에 Outlet → Main/About/Contact 렌더링 */}
            <Route path="/" element={<App />}>
                <Route index element={<Main />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                {/* 필요시 둘 중에 하나로 사용 */}
                {/* 잘못된 경로일 때 */}
                {/* <Route path="*" element={<NotFound />} /> */}
                {/* 그 외 경로는 메인으로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
