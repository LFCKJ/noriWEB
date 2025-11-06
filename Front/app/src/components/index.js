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
export { DashboardLayout, Navigation } from './layout';

// Feature Components - 특정 도메인 기능을 담당하는 복합 컴포넌트들
// 대시보드 관련 기능들을 구현한 컴포넌트들
export { default as GroupItem } from './features/dashboard/GroupItem';
export { default as TabNavigation } from './features/dashboard/TabNavigation';

/**
 * Note: 내부 레이아웃 컴포넌트들은 의도적으로 export하지 않음
 *
 * - GroupSidebar, TabHeader: DashboardLayout 내부에서만 사용되는 컴포넌트들
 * - 이들을 직접 사용하면 레이아웃 일관성이 깨질 수 있으므로 캡슐화
 * - 필요시 DashboardLayout을 통해 간접적으로 사용
 */
