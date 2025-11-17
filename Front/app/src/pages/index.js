/**
 * Pages Export
 *
 * 애플리케이션의 주요 페이지 컴포넌트들을 관리합니다.
 * 각 페이지는 라우터를 통해 접근 가능한 독립적인 뷰입니다.
 */

// 공개 페이지
export { default as Main } from './Main'; // 메인 랜딩 페이지
export { default as About } from './About'; // 서비스 소개 페이지
export { default as Contact } from './Contact'; // 연락처/문의 페이지
export { default as Test } from './Test'; // 테스트/실험 페이지

// 작업 공간 프레임
export { default as Frame } from './Frame'; // 사이드바 포함 레이아웃

// 개인 공간 페이지
export { Personal } from './Personal';

// 워크스페이스 페이지
export { default as WorkspaceList } from './WorkspaceList'; // 워크스페이스 목록
