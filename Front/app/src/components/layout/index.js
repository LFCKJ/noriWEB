/**
 * Layout 컴포넌트 Export
 *
 * 페이지의 구조와 네비게이션을 담당하는 레이아웃 컴포넌트들을 관리합니다.
 * 일부 컴포넌트는 내부 사용 전용으로 분리되어 있습니다.
 */

// 메인 대시보드 레이아웃 - Discord 스타일의 2단계 네비게이션 구조
export { default as DashboardLayout } from './DashboardLayout';

// 글로벌 네비게이션 - 상단 메뉴바
export { Navigation } from './Navigation';

// === 내부 사용 컴포넌트들 (DashboardLayout에서만 사용) ===
// 직접 사용하지 말고 DashboardLayout을 통해 간접 사용 권장

// 그룹 사이드바 - 좌측 그룹 선택 영역
export { default as GroupSidebar } from './GroupSidebar';

// 탭 헤더 - 상단 탭 네비게이션 영역
export { default as TabHeader } from './TabHeader';

// 푸터 - 페이지 하단
export { default as Footer } from './Footer';
