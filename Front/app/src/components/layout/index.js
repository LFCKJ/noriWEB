/**
 * Layout 컴포넌트 Export
 *
 * 페이지의 구조와 네비게이션을 담당하는 레이아웃 컴포넌트들을 관리합니다.
 * 일부 컴포넌트는 내부 사용 전용으로 분리되어 있습니다.
 */

// 글로벌 네비게이션 - 상단 메뉴바
export { Navigation } from './Navigation';

// 푸터 - 페이지 하단
export { default as Footer } from './Footer';

// Frame 레이아웃용 통합 사이드바
export { default as Sidebar } from './Sidebar';
