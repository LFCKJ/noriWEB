/**
 * 컴포넌트 통합 Export
 *
 * 이 파일은 모든 컴포넌트의 중앙 집중식 export 지점입니다.
 * Tree-shaking을 고려하여 카테고리별로 분리하고, 필요한 것만 import할 수 있도록 구성했습니다.
 *
 * 사용법:
 * import { Button, Avatar, DashboardLayout } from './components';
 */

// UI Components - 재사용 가능한 기본 UI 요소들
// 프로젝트 전반에서 사용되는 범용 컴포넌트들
export { default as Button } from './ui/Button';
export { default as Avatar } from './ui/Avatar';
export { default as TabButton } from './ui/TabButton';
export { Dialog } from './ui/Dialog';

// Layout Components - 페이지 구조를 담당하는 레이아웃 컴포넌트들
// 페이지의 전체적인 구조와 네비게이션을 제공
export { Navigation, Sidebar } from './layout';
