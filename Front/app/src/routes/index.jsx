import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { Main, About, Contact, Test, Frame } from '../pages';
import ProtectedRoute from './ProtectedRoute';
import { WorkspaceList, Personal } from '../pages';
import { Workspace } from '../pages/Workspace';
import SharedDrive from '../temp/temp-shareddrive/shareddrive';

export default function Router() {
    return (
        <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<App />}>
                <Route index element={<Main />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="test" element={<Test />} />
            </Route>

            {/* Frame을 통한 작업 공간 (사이드바 포함) */}
            <Route element={<Frame />}>
                {/* 디버깅용 Frame 확인 */}
                <Route path="frame" element={<h1>Frame 레이아웃 테스트용 페이지</h1>} />

                {/* 개인 공간 */}
                <Route path="personal">
                    <Route index element={<Personal />} />
                    <Route path="projects" element={<div>내 프로젝트</div>} />
                    <Route path="notes" element={<div>개인 노트</div>} />
                    <Route path="settings" element={<div>개인 설정</div>} />
                    <Route path="shareddrive" element={<SharedDrive/>} />
                </Route>

                {/* 워크스페이스 선택 */}
                <Route path="spaces" element={<WorkspaceList />} />

                {/* 워크스페이스 상세 */}
                <Route path="workspace/:workspaceId">
                    <Route index element={<Workspace />} />
                    <Route path="members" element={<div>멤버 관리</div>} />
                    <Route path="settings" element={<div>워크스페이스 설정</div>} />
                    <Route path="analytics" element={<div>분석</div>} />
                </Route>
            </Route>
        </Routes>
    );
}
