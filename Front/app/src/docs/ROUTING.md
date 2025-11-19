---
title: 라우팅 가이드
created: 2025-11-14
modified: 2025-11-14
author: Hyeon
---

# 라우팅 가이드 (Routing Guide)

이 문서는 프로젝트의 라우팅 구조와 각 페이지에 대해 설명합니다.  
_**문서 수정 필요**_

## 목차

-   [라우트 구조](#라우트-구조)
-   [페이지 설명](#페이지-설명)
    -   [공개 페이지](#공개-페이지)
    -   [워크스페이스](#워크스페이스-보호된-페이지)
-   [보호된 라우트](#보호된-라우트)
-   [동적 라우트](#동적-라우트)
-   [사용 예시](#사용-예시)
-   [라우팅 파일 구조](#라우팅-파일-구조)
-   [TODO](#todo)
-   [새 페이지 추가하기](#새-페이지-추가하기)

---

## 라우트 구조

```
/ (App)
├── / (Main)                                    - 메인 랜딩 페이지
├── /about                                      - 소개 페이지
├── /contact                                    - 연락처 페이지
├── /login                                      - 로그인 페이지
│
└── /workspaces                                 - 워크스페이스 목록 (보호됨)
    └── /workspace/:workspaceId                 - 워크스페이스 홈
        ├── /workspace/:workspaceId/project/:projectId  - 프로젝트 상세
        ├── /workspace/:workspaceId/settings    - 워크스페이스 설정
        └── /workspace/:workspaceId/members     - 멤버 관리
```

---

## 페이지 설명

### 공개 페이지

#### `/` - Main

-   **컴포넌트**: `Main.jsx`
-   **설명**: 애플리케이션의 메인 랜딩 페이지
-   **접근**: 누구나 접근 가능

#### `/about` - About

-   **컴포넌트**: `About.jsx`
-   **설명**: 서비스 소개 페이지
-   **접근**: 누구나 접근 가능

#### `/contact` - Contact

-   **컴포넌트**: `Contact.jsx`
-   **설명**: 연락처 및 문의 페이지
-   **접근**: 누구나 접근 가능

#### `/login` - Login

-   **컴포넌트**: `Login.jsx`
-   **설명**: 사용자 로그인 페이지
-   **접근**: 누구나 접근 가능
-   **동작**: 로그인 성공 시 `/workspaces`로 이동

---

### 워크스페이스 (보호된 페이지)

#### `/workspaces` - Workspace List

-   **컴포넌트**: 구현 예정
-   **설명**: 사용자가 속한 워크스페이스 목록
-   **접근**: 로그인 필요
-   **기능**:
    -   워크스페이스 선택
    -   새 워크스페이스 생성
    -   초대받은 워크스페이스 확인

#### `/workspace/:workspaceId` - Workspace Home

-   **컴포넌트**: 구현 예정
-   **설명**: 선택한 워크스페이스의 홈
-   **동적 파라미터**: `workspaceId` - 워크스페이스 고유 식별자
-   **접근**: 로그인 + 워크스페이스 멤버 권한 필요
-   **기능**:
    -   워크스페이스 개요
    -   최근 활동
    -   프로젝트 목록
    -   멤버 현황

#### `/workspace/:workspaceId/project/:projectId` - Project Detail

-   **컴포넌트**: 구현 예정
-   **설명**: 특정 프로젝트의 상세 페이지
-   **동적 파라미터**:
    -   `workspaceId` - 워크스페이스 고유 식별자
    -   `projectId` - 프로젝트 고유 식별자
-   **접근**: 로그인 + 프로젝트 접근 권한 필요
-   **기능**:
    -   프로젝트 대시보드
    -   작업 내역 (향후 구체화 예정)
    -   프로젝트 설정

#### `/workspace/:workspaceId/settings` - Workspace Settings

-   **컴포넌트**: 구현 예정
-   **설명**: 워크스페이스 설정 페이지
-   **동적 파라미터**: `workspaceId`
-   **접근**: 로그인 + 관리자 권한 필요
-   **기능**:
    -   워크스페이스 이름 변경
    -   권한 관리
    -   워크스페이스 삭제

#### `/workspace/:workspaceId/members` - Member Management

-   **컴포넌트**: 구현 예정
-   **설명**: 워크스페이스 멤버 관리
-   **동적 파라미터**: `workspaceId`
-   **접근**: 로그인 + 관리자 권한 필요
-   **기능**:
    -   멤버 목록 조회
    -   멤버 초대
    -   권한 수정
    -   멤버 제거

---

## 보호된 라우트

### ProtectedRoute 컴포넌트

**파일 위치**: `src/routes/ProtectedRoute.jsx`

**보호 대상**:

-   `/workspaces` - 워크스페이스 목록
-   `/workspace/:workspaceId` - 모든 워크스페이스 관련 페이지

**사용 예시**:

```jsx
<Route
    path="workspaces"
    element={
        <ProtectedRoute>
            <WorkspaceList />
        </ProtectedRoute>
    }
/>
```

**동작**:

1. 로그인 상태 확인
2. 미로그인 시 → `/login`으로 리다이렉트
3. 로그인 완료 후 → 원래 접근하려던 페이지로 이동

**권한 레벨** (향후 구현 예정):

-   **Viewer**: 읽기 전용
-   **Member**: 편집 가능
-   **Admin**: 설정 및 멤버 관리 가능
-   **Owner**: 모든 권한 + 워크스페이스 삭제

---

## 동적 라우트

### `:workspaceId` 파라미터

워크스페이스 관련 모든 페이지에서 사용됩니다.

**예시**:

-   `/workspace/ws-123` - ws-123 워크스페이스
-   `/workspace/team-alpha` - team-alpha 워크스페이스

**컴포넌트에서 사용하기**:

```jsx
import { useParams } from 'react-router-dom';

function WorkspaceHome() {
    const { workspaceId } = useParams();

    useEffect(() => {
        // workspaceId로 워크스페이스 데이터 로드
        fetchWorkspaceData(workspaceId);
    }, [workspaceId]);

    return <div>워크스페이스: {workspaceId}</div>;
}
```

### `:projectId` 파라미터

프로젝트 페이지에서 사용됩니다.

**예시**:

-   `/workspace/ws-123/project/proj-456`

**컴포넌트에서 사용하기**:

```jsx
import { useParams } from 'react-router-dom';

function ProjectDetail() {
    const { workspaceId, projectId } = useParams();

    useEffect(() => {
        // 워크스페이스와 프로젝트 정보 모두 필요
        fetchProjectData(workspaceId, projectId);
    }, [workspaceId, projectId]);

    return (
        <div>
            <p>워크스페이스: {workspaceId}</p>
            <p>프로젝트: {projectId}</p>
        </div>
    );
}
```

---

## 사용 예시

### 페이지 간 이동

```jsx
import { Link, useNavigate } from 'react-router-dom';

// Link 컴포넌트 사용
<Link to="/about">소개 페이지로</Link>
<Link to="/dashboard/personal">내 대시보드</Link>
<Link to="/dashboard/groups/123">그룹 123</Link>

// useNavigate 훅 사용
function MyComponent() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard/personal');
    };

    const goToGroup = (groupId) => {
        navigate(`/dashboard/groups/${groupId}`);
    };
}
```

### URL 파라미터 접근

```jsx
import { useParams } from 'react-router-dom';

function GroupPage() {
    const { groupId } = useParams();

    useEffect(() => {
        // groupId를 사용해 데이터 가져오기
        fetchGroupData(groupId);
    }, [groupId]);
}
```

### 404 처리

현재는 잘못된 경로 접근 시 자동으로 메인 페이지(`/`)로 리다이렉트됩니다.

```jsx
// 404 페이지를 보여주려면 다음과 같이 수정:
<Route path="*" element={<NotFound />} />

// 현재 설정 (메인으로 리다이렉트):
<Route path="*" element={<Navigate to="/" replace />} />
```

---

## 라우팅 파일 구조

```
src/
├── routes/
│   ├── index.jsx           - 메인 라우터 설정
│   └── ProtectedRoute.jsx  - 보호된 라우트 컴포넌트
├── pages/
│   ├── Main.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Test.jsx
│   ├── Login.jsx
│   ├── Dashboard/
│   │   ├── Dashboard.jsx      - 대시보드 레이아웃
│   │   ├── DashboardHome.jsx
│   │   └── DashboardTest.jsx
│   └── Workspace/
└── App.jsx                 - 루트 레이아웃
```

---

## TODO

-   [ ] `ProtectedRoute` 활성화 (인증 시스템 연동)
-   [ ] 개인 공간 하위 페이지 구현 (projects, notes, settings)
-   [ ] 그룹 공간 하위 페이지 구현 (members, settings, analytics)
-   [ ] 404 페이지 구현 고려
-   [ ] 로딩 상태 처리
-   [ ] 에러 바운더리 추가

---

## 새 페이지 추가하기

1. **페이지 컴포넌트 생성**

    ```jsx
    // src/pages/NewPage.jsx
    export default function NewPage() {
        return <div>새 페이지</div>;
    }
    ```

2. **index.js에 export 추가**

    ```jsx
    // src/pages/index.js
    export { default as NewPage } from './NewPage';
    ```

3. **라우터에 추가**

    ```jsx
    // src/routes/index.jsx
    import { NewPage } from '../pages';

    <Route path="new-page" element={<NewPage />} />;
    ```
