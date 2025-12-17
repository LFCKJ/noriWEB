// temp/MyTasksPage.jsx
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   공통 유틸 함수: 날짜 관련 처리
   ───────────────────────────────────────────────────────────── */

/**
 * 문자열/값을 Date 객체로 바꾸고, 시/분/초는 0으로 맞춰주는 함수
 * - "YYYY. MM. DD" / "YYYY-MM-DD" 등 다양한 입력을 안정적으로 처리
 * - 잘못된 값이면 null 반환
 */
const parseDate = (value) => {
  if (!value) return null;

  const str = String(value).trim();

  // 숫자 3덩어리(연/월/일)만 뽑아 안전하게 Date 생성 (로컬 기준)
  const m = str.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  let d = null;

  if (m) {
    const yyyy = Number(m[1]);
    const mm = Number(m[2]);
    const dd = Number(m[3]);
    d = new Date(yyyy, mm - 1, dd);
  } else {
    // ISO 등 표준 포맷이면 fallback
    d = new Date(str);
  }

  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * 두 Date가 같은 날인지 비교하는 함수
 */
const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * 임시 MyTasksPage (API 연결 전 버전)
 * - 현재 워크스페이스에서 "나에게 배정된" Task를 모아서 보는 화면
 * - 뷰 모드 선택: 리스트 / 테이블 / 캘린더 / 칸반
 * - 상단 요약 + 시간 / 상태 / 우선순위 / 프로젝트 / 태그 필터 + 검색
 */

// 서버에서 받아온다고 가정하는 Task 리스트 (현재는 하드코딩)
// ✅ 사용자 데이터 스키마에 맞춘 형태:
// - project, assignee
// - status: "할 일" | "진행 중" | "검토" | "완료"
// - priority: "긴급" | "높음" | "보통" | "낮음"
// - dueDate: "YYYY. MM. DD"
const MOCK_TASKS = [
  {
    id: "1",
    title: "데이터베이스 성능 최적화",
    description: "데이터베이스 쿼리 속도를 개선하기 위한 인덱스 최적화 작업",
    tags: ["Database", "Performance"],
    status: "할 일",
    priority: "낮음",
    type: "개선",
    assignee: "정수진",
    dueDate: "2025. 11. 28",
    project: "Backend 최적화",
  },
  {
    id: "2",
    title: "프론트엔드 UI 리팩토링",
    description: "사용자 경험을 향상시키기 위한 UI 컴포넌트 리팩토링 작업",
    tags: ["Frontend", "UI/UX"],
    status: "진행 중",
    priority: "보통",
    type: "리팩토링",
    assignee: "이민호",
    dueDate: "2025. 12. 05",
    project: "UI 개선 프로젝트",
  },
  {
    id: "3",
    title: "API 보안 강화",
    description: "API 엔드포인트에 대한 인증 및 권한 부여 메커니즘 구현",
    tags: ["API", "Security"],
    status: "검토",
    priority: "높음",
    type: "보안",
    assignee: "김지훈",
    dueDate: "2025. 12. 15",
    project: "보안 강화 프로젝트",
  },
  {
    id: "4",
    title: "4444444",
    description: "44444444444444444",
    tags: ["4444", "4444"],
    status: "완료",
    priority: "긴급",
    type: "보안",
    assignee: "김지훈",
    dueDate: "2025. 12. 18",
    project: "5555555555",
  },
];

/**
 * 메인 페이지 컴포넌트
 * - props로 workspaceName을 받아서 "어느 워크스페이스의 My Tasks인지" 표시
 */
export default function MyTasksPage({ workspaceName = "팀 워크스페이스" }) {
  // 실제 Task 데이터 상태 (지금은 고정 MOCK_TASKS 사용)
  // const [tasks] = useState(MOCK_TASKS);
  const [tasks, _] = useOutletContext(); // 나중에 API 연동 시 사용

  // 여러 가지 필터 상태들
  const [statusFilter, setStatusFilter] = useState("all"); // all | 할 일 | 진행 중 | 검토 | 완료
  const [timeFilter, setTimeFilter] = useState("all"); // all | today | upcoming
  const [priorityFilter, setPriorityFilter] = useState("all"); // all | 긴급 | 높음 | 보통 | 낮음
  const [projectFilter, setProjectFilter] = useState("all"); // all | 프로젝트 이름
  const [tagFilter, setTagFilter] = useState("all"); // all | 태그 문자열
  const [search, setSearch] = useState(""); // 검색어
  const [viewMode, setViewMode] = useState("list"); // list | table | calendar | kanban

  // 오늘 날짜 기준 값 (00:00 으로 맞춘 상태)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ─────────────────────────────────────────────────────────────
     프로젝트 / 태그 옵션: 셀렉트 박스에서 쓸 목록 만들기
     ───────────────────────────────────────────────────────────── */

  // tasks 안에 있는 project들을 모아서 "중복 제거된 배열" 만들기
  const projectOptions = useMemo(() => {
    const set = new Set();
    tasks.forEach((t) => t.project && set.add(t.project));
    return Array.from(set);
  }, [tasks]);

  // tasks 안에 있는 tags들을 모아서 "중복 제거된 배열" 만들기
  const tagOptions = useMemo(() => {
    const set = new Set();
    tasks.forEach((t) =>
      (t.tags || []).forEach((tag) => {
        if (tag) set.add(tag);
      })
    );
    return Array.from(set);
  }, [tasks]);

  /* ─────────────────────────────────────────────────────────────
     지연 Task 개수 계산 (요약 카드용)
     ───────────────────────────────────────────────────────────── */

  const overdueCount = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false; // 마감일 없으면 제외
      if (task.status === "완료") return false; // 이미 완료된 건 제외
      const due = parseDate(task.dueDate);
      if (!due) return false;
      // 마감일이 오늘보다 이전이면 "지연"
      return due < today;
    }).length;
  }, [tasks, today]);

  /* ─────────────────────────────────────────────────────────────
     공통 필터 로직: 모든 뷰가 이 filtered를 기준으로 렌더링
     ───────────────────────────────────────────────────────────── */

  const filtered = useMemo(() => {
    return (
      tasks
        // 1차 필터: 상태 / 우선순위 / 프로젝트 / 태그 / 검색
        .filter((task) => {
          // 상태 필터
          if (statusFilter !== "all" && task.status !== statusFilter)
            return false;

          // 우선순위 필터
          if (priorityFilter !== "all" && task.priority !== priorityFilter)
            return false;

          // 프로젝트 필터
          if (projectFilter !== "all" && task.project !== projectFilter)
            return false;

          // 태그 필터
          if (tagFilter !== "all") {
            const tags = task.tags || [];
            if (!tags.includes(tagFilter)) return false;
          }

          // 검색어 필터 (제목 / 프로젝트 / 태그)
          if (search.trim()) {
            const keyword = search.toLowerCase();
            const titleMatch = task.title?.toLowerCase().includes(keyword);
            const projectMatch = task.project?.toLowerCase().includes(keyword);
            const tagMatch = (task.tags || [])
              .join(" ")
              .toLowerCase()
              .includes(keyword);
            return titleMatch || projectMatch || tagMatch;
          }

          return true;
        })
        // 2차 필터: 시간 기준 (전체 / 오늘 / 다가오는 일정)
        .filter((task) => {
          if (timeFilter === "all") return true;

          const due = parseDate(task.dueDate);
          if (!due) return false; // 시간 필터를 쓰는데 마감일 없다 → 제외

          if (timeFilter === "today") return isSameDay(due, today);
          if (timeFilter === "upcoming") return due > today;

          return true;
        })
    );
  }, [
    tasks,
    statusFilter,
    priorityFilter,
    projectFilter,
    tagFilter,
    search,
    timeFilter,
    today,
  ]);

  /* ─────────────────────────────────────────────────────────────
     마감일/우선순위 기준 정렬 함수
     ───────────────────────────────────────────────────────────── */

  const sortFn = (a, b) => {
    const aDate = a.dueDate ? parseDate(a.dueDate) : null;
    const bDate = b.dueDate ? parseDate(b.dueDate) : null;

    // 마감일 있는 Task를 위로
    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;

    // 둘 다 마감일 있으면 날짜 빠른 순
    if (aDate && bDate) {
      const diff = aDate.getTime() - bDate.getTime();
      if (diff !== 0) return diff;
    }

    // 마감일 같거나 둘 다 없으면 우선순위 기준 (긴급 > 높음 > 보통 > 낮음)
    const priorityOrder = { 긴급: 0, 높음: 1, 보통: 2, 낮음: 3 };
    const aP = priorityOrder[a.priority] ?? 99;
    const bP = priorityOrder[b.priority] ?? 99;
    return aP - bP;
  };

  /* ─────────────────────────────────────────────────────────────
     리스트 뷰용 데이터: 마감일 기준으로 버킷 나누기
     - overdue / today / soon / later / noDue
     ───────────────────────────────────────────────────────────── */

  const groupedForList = useMemo(() => {
    const buckets = {
      overdue: [],
      today: [],
      soon: [],
      later: [],
      noDue: [],
    };

    filtered.forEach((task) => {
      const due = task.dueDate ? parseDate(task.dueDate) : null;

      if (!due) {
        buckets.noDue.push(task);
        return;
      }

      const diffDays =
        (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays < 0) {
        buckets.overdue.push(task);
      } else if (diffDays === 0) {
        buckets.today.push(task);
      } else if (diffDays > 0 && diffDays <= 3) {
        buckets.soon.push(task);
      } else {
        buckets.later.push(task);
      }
    });

    Object.keys(buckets).forEach((k) => {
      buckets[k].sort(sortFn);
    });

    return buckets;
  }, [filtered, today]);

  // 정렬된 필터 결과 (테이블/캘린더/칸반에서 공통 사용)
  const sortedFiltered = useMemo(() => {
    return [...filtered].sort(sortFn);
  }, [filtered]);

  // 필터 결과가 하나라도 있는지 여부
  const hasAny = filtered.length > 0;

  return (
    <div className="min-h-screen bg-slate-950/5">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
        {/* 상단 헤더 영역: 워크스페이스 정보 + 요약 카드 */}
        <header className="mb-6 flex flex-col gap-3 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                {workspaceName?.[0] || "W"}
              </div>

              <span className="text-slate-900">{workspaceName}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">My Tasks</span>

              <button
                type="button"
                className="ml-1 rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              >
                워크스페이스 변경
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">
                My Tasks
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                현재{" "}
                <span className="font-semibold text-slate-900">
                  {workspaceName}
                </span>{" "}
                기준으로 나에게 배정된 Task를 한곳에서 관리합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <SummaryChip label="전체" value={tasks.length} tone="default" />
            <SummaryChip
              label="진행 중"
              value={tasks.filter((t) => t.status === "진행 중").length}
              tone="primary"
            />
            <SummaryChip
              label="완료"
              value={tasks.filter((t) => t.status === "완료").length}
              tone="muted"
            />
            <SummaryChip
              label="지연"
              value={overdueCount}
              tone={overdueCount > 0 ? "danger" : "muted"}
            />
          </div>
        </header>

        {/* 필터 바 */}
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* 시간 필터 */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium">
              <SegmentButton
                active={timeFilter === "all"}
                onClick={() => setTimeFilter("all")}
              >
                전체
              </SegmentButton>
              <SegmentButton
                active={timeFilter === "today"}
                onClick={() => setTimeFilter("today")}
              >
                오늘
              </SegmentButton>
              <SegmentButton
                active={timeFilter === "upcoming"}
                onClick={() => setTimeFilter("upcoming")}
              >
                다가오는 일정
              </SegmentButton>
            </div>

            {/* 상태/우선순위/프로젝트/태그/검색 */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
              <div className="flex flex-wrap gap-2">
                {/* 상태 */}
                <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1 text-[11px] font-medium">
                  <FilterPill
                    active={statusFilter === "all"}
                    onClick={() => setStatusFilter("all")}
                    label="상태 전체"
                  />
                  <FilterPill
                    active={statusFilter === "할 일"}
                    onClick={() => setStatusFilter("할 일")}
                    label="할 일"
                  />
                  <FilterPill
                    active={statusFilter === "진행 중"}
                    onClick={() => setStatusFilter("진행 중")}
                    label="진행 중"
                  />
                  <FilterPill
                    active={statusFilter === "검토"}
                    onClick={() => setStatusFilter("검토")}
                    label="검토"
                  />
                  <FilterPill
                    active={statusFilter === "완료"}
                    onClick={() => setStatusFilter("완료")}
                    label="완료"
                  />
                </div>

                {/* 우선순위 */}
                <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1 text-[11px] font-medium">
                  <FilterPill
                    active={priorityFilter === "all"}
                    onClick={() => setPriorityFilter("all")}
                    label="우선순위 전체"
                  />
                  <FilterPill
                    active={priorityFilter === "긴급"}
                    onClick={() => setPriorityFilter("긴급")}
                    label="긴급"
                  />
                  <FilterPill
                    active={priorityFilter === "높음"}
                    onClick={() => setPriorityFilter("높음")}
                    label="높음"
                  />
                  <FilterPill
                    active={priorityFilter === "보통"}
                    onClick={() => setPriorityFilter("보통")}
                    label="보통"
                  />
                  <FilterPill
                    active={priorityFilter === "낮음"}
                    onClick={() => setPriorityFilter("낮음")}
                    label="낮음"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                  {/* 프로젝트 */}
                  <div className="relative">
                    <select
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      className="w-[150px] appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option value="all">전체 프로젝트</option>
                      {projectOptions.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-2.5 text-[10px] text-slate-400">
                      ▼
                    </span>
                  </div>

                  {/* 태그 */}
                  <div className="relative">
                    <select
                      value={tagFilter}
                      onChange={(e) => setTagFilter(e.target.value)}
                      className="w-[130px] appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option value="all">태그 전체</option>
                      {tagOptions.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-2.5 text-[10px] text-slate-400">
                      ▼
                    </span>
                  </div>
                </div>

                {/* 검색 */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="제목, 프로젝트, 태그 검색"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-xs text-slate-400">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 뷰 모드 */}
        <main className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-500">
              총{" "}
              <span className="font-semibold text-slate-900">
                {filtered.length}
              </span>
              개의 Task가 필터 조건에 맞습니다.
            </p>
            <div className="inline-flex rounded-full bg-slate-100 p-1 text-[11px] font-medium">
              <ViewModeButton
                active={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                리스트
              </ViewModeButton>
              <ViewModeButton
                active={viewMode === "table"}
                onClick={() => setViewMode("table")}
              >
                테이블
              </ViewModeButton>
              <ViewModeButton
                active={viewMode === "calendar"}
                onClick={() => setViewMode("calendar")}
              >
                캘린더
              </ViewModeButton>
              <ViewModeButton
                active={viewMode === "kanban"}
                onClick={() => setViewMode("kanban")}
              >
                칸반
              </ViewModeButton>
            </div>
          </div>

          {!hasAny ? (
            <EmptyState />
          ) : (
            <>
              {viewMode === "list" && <ListView grouped={groupedForList} />}
              {viewMode === "table" && <TaskTableView tasks={sortedFiltered} />}
              {viewMode === "calendar" && (
                <TaskCalendarView tasks={sortedFiltered} />
              )}
              {viewMode === "kanban" && <KanbanBoard tasks={sortedFiltered} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   상단 요약/필터/뷰 버튼용 작은 컴포넌트들
   ───────────────────────────────────────────────────────────── */

function SummaryChip({ label, value, tone = "default" }) {
  const toneClass = {
    default:
      "border-slate-200 bg-white text-slate-800 shadow-sm shadow-slate-100",
    primary:
      "border-blue-100 bg-blue-50 text-blue-800 shadow-sm shadow-blue-100",
    muted:
      "border-slate-100 bg-slate-100 text-slate-600 shadow-sm shadow-slate-100",
    danger:
      "border-rose-100 bg-rose-50 text-rose-700 shadow-sm shadow-rose-100",
  }[tone];

  return (
    <div
      className={`flex flex-col rounded-2xl border px-3 py-2 text-xs ${toneClass}`}
    >
      <span className="mb-0.5 text-[11px] font-medium">{label}</span>
      <span className="text-lg font-semibold leading-none">{value}</span>
    </div>
  );
}

function SegmentButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 transition ${
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function FilterPill({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1 ${
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

function ViewModeButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   리스트 뷰
   ───────────────────────────────────────────────────────────── */

function ListView({ grouped }) {
  const { overdue, today, soon, later, noDue } = grouped;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            리스트 뷰 · 마감일 기준 정리
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            지연 / 오늘 / 곧 마감 / 그 이후 / 마감일 없음 순서로 정리됩니다.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <TaskGroup
          tone="danger"
          title="지연된 작업"
          description="마감일이 이미 지난 작업들입니다."
          tasks={overdue}
        />
        <TaskGroup
          tone="warning"
          title="오늘 해야 할 일"
          description="오늘 날짜에 마감되는 작업입니다."
          tasks={today}
        />
        <TaskGroup
          tone="accent"
          title="곧 마감 (3일 이내)"
          description="3일 안에 마감되는 작업들입니다."
          tasks={soon}
        />
        <TaskGroup
          tone="muted"
          title="그 이후에 할 일"
          description="3일 이후에 마감되는 작업들입니다."
          tasks={later}
        />
        <TaskGroup
          tone="neutral"
          title="마감일 없음"
          description="마감일이 지정되지 않은 작업입니다."
          tasks={noDue}
        />
      </div>
    </section>
  );
}

function TaskGroup({ title, description, tasks, tone = "neutral" }) {
  if (!tasks || tasks.length === 0) return null;

  const headerToneClass = {
    danger: "bg-rose-50 text-rose-700 border border-rose-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    accent: "bg-blue-50 text-blue-700 border border-blue-100",
    muted: "bg-slate-100 text-slate-700 border border-slate-100",
    neutral: "bg-slate-50 text-slate-700 border border-slate-100",
  }[tone];

  return (
    <section>
      <header className="mb-2 flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${headerToneClass}`}
          >
            {title}
          </span>
          {description && (
            <p className="text-[11px] text-slate-400 hidden sm:inline">
              {description}
            </p>
          )}
        </div>
        <span className="text-[11px] text-slate-400">{tasks.length}개</span>
      </header>
      <ul className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   공통: 한 줄 Task 카드
   ───────────────────────────────────────────────────────────── */

function TaskRow({ task }) {
  const due = task.dueDate ? parseDate(task.dueDate) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueTone = "bg-slate-100 text-slate-600";
  let dueText = "-";
  let dueLabel = "";

  if (due) {
    const formatted = due.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
    dueText = formatted;

    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      dueTone = "bg-rose-50 text-rose-700 border border-rose-100";
      dueLabel = "지남";
    } else if (diff === 0) {
      dueTone = "bg-amber-50 text-amber-700 border border-amber-100";
      dueLabel = "오늘";
    } else {
      const dLeft = Math.round(diff);
      if (dLeft <= 3) {
        dueTone = "bg-amber-50 text-amber-700 border border-amber-100";
      } else {
        dueTone = "bg-emerald-50 text-emerald-700 border border-emerald-100";
      }
      dueLabel = `D-${dLeft}`;
    }
  }

  // 상태 라벨/톤 (한글 그대로 사용)
  const statusToneMap = {
    "할 일": "bg-slate-100 text-slate-600",
    "진행 중": "bg-blue-50 text-blue-700",
    검토: "bg-amber-50 text-amber-700",
    완료: "bg-emerald-50 text-emerald-700",
  };

  const statusLabel = task.status || "기타";
  const statusTone =
    statusToneMap[task.status] || "bg-slate-100 text-slate-600";

  return (
    <li className="flex items-center gap-4 px-3 py-3 text-sm transition hover:bg-white/90 hover:shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13px] font-semibold text-slate-900">
            {task.title || "(제목 없음)"}
          </span>
        </div>

        {task.description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
            {task.description}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          {task.project && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
              <span className="text-[10px]">📁</span>
              <span className="truncate max-w-[140px]">{task.project}</span>
            </span>
          )}

          {task.assignee && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-medium text-white">
                {task.assignee[0]}
              </span>
              <span>{task.assignee}</span>
            </span>
          )}

          {Array.isArray(task.tags) &&
            task.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
              >
                #{tag}
              </span>
            ))}

          {Array.isArray(task.tags) && task.tags.length > 2 && (
            <span className="text-[10px] text-slate-400">
              +{task.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 text-[11px] shrink-0">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 ${statusTone}`}
        >
          {statusLabel}
        </span>

        {task.priority && <PriorityBadge priority={task.priority} />}

        <span
          className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${dueTone}`}
        >
          <span>📅</span>
          <span>{dueText}</span>
          {dueLabel && (
            <span className="text-[10px] opacity-80">· {dueLabel}</span>
          )}
        </span>
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   테이블 뷰
   ───────────────────────────────────────────────────────────── */

function TaskTableView({ tasks }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        테이블 뷰 · 표 형태로 보기
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-left text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 w-10"></th>
              <th className="px-3 py-2">제목</th>
              <th className="px-3 py-2">프로젝트</th>
              <th className="px-3 py-2">담당자</th>
              <th className="px-3 py-2">상태</th>
              <th className="px-3 py-2">우선순위</th>
              <th className="px-3 py-2">마감일</th>
              <th className="px-3 py-2">태그</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => {
              const due = task.dueDate ? parseDate(task.dueDate) : null;
              const dueText = due
                ? due.toLocaleDateString("ko-KR", {
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "-";

              return (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-3 py-2 align-middle">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                    />
                  </td>

                  <td className="px-3 py-2 align-top">
                    <div className="text-[13px] font-semibold text-slate-900">
                      {task.title || "(제목 없음)"}
                    </div>
                    {task.description && (
                      <div className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">
                        {task.description}
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-2 align-middle">
                    <span className="text-[11px] text-slate-600">
                      {task.project || "-"}
                    </span>
                  </td>

                  <td className="px-3 py-2 align-middle">
                    <span className="text-[11px] text-slate-600">
                      {task.assignee || "-"}
                    </span>
                  </td>

                  <td className="px-3 py-2 align-middle">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                      {task.status || "기타"}
                    </span>
                  </td>

                  <td className="px-3 py-2 align-middle">
                    {task.priority ? (
                      <PriorityBadge priority={task.priority} />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-3 py-2 align-middle text-[11px] text-slate-700">
                    {dueText}
                  </td>

                  <td className="px-3 py-2 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(task.tags) && task.tags.length > 0 ? (
                        task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   캘린더 뷰
   ───────────────────────────────────────────────────────────── */

function TaskCalendarView({ tasks }) {
  const groups = useMemo(() => {
    const map = new Map();
    const noDue = [];

    tasks.forEach((task) => {
      const due = task.dueDate ? parseDate(task.dueDate) : null;
      if (!due) {
        noDue.push(task);
        return;
      }
      const key = due.toISOString().slice(0, 10);
      if (!map.has(key)) {
        map.set(key, { date: due, tasks: [] });
      }
      map.get(key).tasks.push(task);
    });

    const datedGroups = Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return { datedGroups, noDue };
  }, [tasks]);

  const { datedGroups, noDue } = groups;

  const weekdayLabel = (date) => {
    const names = ["일", "월", "화", "수", "목", "금", "토"];
    return names[date.getDay()];
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        캘린더 뷰 · 날짜별 일정
      </h2>

      {datedGroups.length === 0 && noDue.length === 0 ? (
        <p className="text-xs text-slate-500">
          표시할 마감일이 있는 Task가 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {datedGroups.map((g) => {
            const date = g.date;
            const title = date.toLocaleDateString("ko-KR", {
              month: "2-digit",
              day: "2-digit",
            });
            const weekday = weekdayLabel(date);

            return (
              <section
                key={date.toISOString()}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
              >
                <header className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({weekday})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {g.tasks.length}개
                  </span>
                </header>
                <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white">
                  {g.tasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </ul>
              </section>
            );
          })}

          {noDue.length > 0 && (
            <section className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-3">
              <header className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  마감일 없음
                </span>
                <span className="text-[11px] text-slate-400">
                  {noDue.length}개
                </span>
              </header>
              <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white">
                {noDue.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   칸반 뷰
   ───────────────────────────────────────────────────────────── */

function KanbanBoard({ tasks }) {
  const columns = [
    {
      id: "할 일",
      title: "할 일",
      description: "곧 시작해야 하는 작업들",
      tone: "neutral",
    },
    {
      id: "진행 중",
      title: "진행 중",
      description: "현재 작업 중인 항목",
      tone: "primary",
    },
    {
      id: "검토",
      title: "검토",
      description: "리뷰/확인 대기",
      tone: "warning",
    },
    {
      id: "완료",
      title: "완료",
      description: "완료 처리된 Task",
      tone: "success",
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          칸반 뷰 · 상태별 보드
        </h2>
        <p className="text-[11px] text-slate-400">
          상태(할 일 / 진행 중 / 검토 / 완료) 기준으로 세로 컬럼에 배치됩니다.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4 lg:gap-6">
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.id);
          return (
            <KanbanColumn
              key={col.id}
              title={col.title}
              description={col.description}
              tone={col.tone}
              tasks={columnTasks}
            />
          );
        })}
      </div>
    </section>
  );
}

function KanbanColumn({ title, description, tone, tasks }) {
  const headerTone = {
    neutral: "bg-slate-100 text-slate-800",
    primary: "bg-blue-50 text-blue-800",
    warning: "bg-amber-50 text-amber-800",
    success: "bg-emerald-50 text-emerald-800",
  }[tone];

  return (
    <section className="flex min-h-[260px] flex-col rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${headerTone}`}
          >
            <span>{title}</span>
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-slate-500">
              {tasks.length}
            </span>
          </div>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 text-xs text-slate-400">
          이 상태의 작업이 없습니다.
        </div>
      ) : (
        <ul className="flex flex-1 flex-col gap-3 overflow-y-auto pb-1">
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

function KanbanCard({ task }) {
  const due = task.dueDate ? parseDate(task.dueDate) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueTone = "bg-slate-100 text-slate-600";
  let dueText = "-";
  let dueLabel = "";

  if (due) {
    const formatted = due.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
    dueText = formatted;

    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      dueTone = "bg-rose-50 text-rose-700 border border-rose-100";
      dueLabel = "지남";
    } else if (diff === 0) {
      dueTone = "bg-amber-50 text-amber-700 border border-amber-100";
      dueLabel = "오늘";
    } else {
      const dLeft = Math.round(diff);
      if (dLeft <= 3) {
        dueTone = "bg-amber-50 text-amber-700 border border-amber-100";
      } else {
        dueTone = "bg-emerald-50 text-emerald-700 border border-emerald-100";
      }
      dueLabel = `D-${dLeft}`;
    }
  }

  return (
    <li className="group rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-semibold text-slate-900">
            {task.title || "(제목 없음)"}
          </h3>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              {task.description}
            </p>
          )}
        </div>
        {task.priority && <PriorityBadge priority={task.priority} />}
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        {task.project && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
            <span className="text-[10px]">📁</span>
            <span className="truncate max-w-[120px]">{task.project}</span>
          </span>
        )}
        {task.type && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
            <span className="text-[10px]">⚙️</span>
            <span>{task.type}</span>
          </span>
        )}
        {task.assignee && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-medium text-white">
              {task.assignee[0]}
            </span>
            <span>{task.assignee}</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${dueTone}`}
        >
          <span>📅</span>
          <span>{dueText}</span>
          {dueLabel && (
            <span className="text-[10px] opacity-80">· {dueLabel}</span>
          )}
        </span>

        {Array.isArray(task.tags) && task.tags.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1">
            {task.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-[10px] text-slate-400">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   공통: 우선순위 배지 / Empty 상태
   ───────────────────────────────────────────────────────────── */

function PriorityBadge({ priority }) {
  const map = {
    긴급: {
      label: "긴급",
      className: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100",
    },
    높음: {
      label: "높음",
      className: "bg-rose-50 text-rose-700 border border-rose-100",
    },
    보통: {
      label: "보통",
      className: "bg-amber-50 text-amber-700 border border-amber-100",
    },
    낮음: {
      label: "낮음",
      className: "bg-slate-100 text-slate-600 border border-slate-200",
    },
  };

  const style = map[priority] || map.보통;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${style.className}`}
    >
      {style.label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/80 py-14 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        ✓
      </div>
      <h2 className="text-sm font-medium text-slate-900">
        현재 조건에 맞는 Task가 없습니다.
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        상태나 필터를 조정하거나, 새로운 Task를 생성해 보세요.
      </p>
    </div>
  );
}
