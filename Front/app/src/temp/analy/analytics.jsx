import React, { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom'; // 라우팅 관련 필요 시 유지
import './Analytics.css'; // 기본 스타일
// import './AnalyticsDashboard.css'; // 대시보드 레이아웃 스타일

// Recharts 라이브러리에서 필요한 컴포넌트 임포트
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// --- 1. 더미 Task 데이터 정의 ---

 const { tasks, updateTask } = useTaskContext();
 
// --- 공통 컴포넌트 및 색상 정의 ---
const COLORS = {
  '할 일': '#A0A0A0', // 회색
  '진행 중': '#4F46E5', // 파란색
  완료: '#22C55E', // 초록색
  검토: '#7C3AED' // 보라색
};
const StatCard = ({ title, value, unit = '' }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">
      {value}
      {unit}
    </div>
  </div>
);
const ProjectProgressBar = ({ name, progress }) => (
  <div className="project-progress-item">
    <div className="project-name">{name}</div>
    <div className="progress-bar-wrapper">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
    <span className="progress-percent">{progress}%</span>
  </div>
);

// --- 핵심 데이터 분석 함수 ---
const analyzeTasks = tasks => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === '완료').length;
  const inProgress = tasks.filter(t => t.status === '진행 중').length;
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  const statusCounts = {};
  const priorityCounts = {};
  const projectTasks = {};

  tasks.forEach(task => {
    statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;

    if (!projectTasks[task.project]) {
      projectTasks[task.project] = { total: 0, completed: 0 };
    }
    projectTasks[task.project].total += 1;
    if (task.status === '완료') {
      projectTasks[task.project].completed += 1;
    }
  });

  const projectProgressData = Object.keys(projectTasks).map(name => {
    const data = projectTasks[name];
    const progress = (data.total > 0 ? (data.completed / data.total) * 100 : 0).toFixed(1);
    return { name, progress: parseFloat(progress) };
  });

  // 상태별 분포 (차트용 데이터) - Recharts는 count 값을 사용합니다.
  const statusDistributionData = Object.keys(statusCounts).map(status => ({
    name: status,
    count: statusCounts[status],
    // percentage 필드는 범례 커스텀을 위해 여전히 유용합니다.
    percentage: total > 0 ? ((statusCounts[status] / total) * 100).toFixed(0) : 0
  }));

  const priorityOrder = ['긴급', '높음', '보통', '낮음'];
  const priorityDistributionData = priorityOrder.map(priority => ({
    label: priority,
    count: priorityCounts[priority] || 0
  }));

  return {
    total,
    completed,
    inProgress,
    completionRate,
    statusDistributionData,
    priorityDistributionData,
    projectProgressData
  };
};

// --- Recharts 기반 StatusPieChart 컴포넌트 ---
const StatusPieChart = ({ data }) => {
  // 원 그래프 슬라이스 내부에 표시될 레이블 커스텀 함수
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // 커스텀 범례(Legend) 컴포넌트
  const renderLegend = props => {
    const { payload } = props;
    return (
      <ul className="chart-legend-list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="legend-item">
            <span className="legend-color-box" style={{ backgroundColor: entry.color }}></span>
            <span className="legend-name">
              {entry.payload.name} {entry.payload.percentage}% ({entry.payload.count}개)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="pie-chart-wrapper">
      <PieChart width={450} height={300}>
        <Pie
          data={data}
          dataKey="count" // 데이터 값 키
          nameKey="name" // 범례 및 툴팁 이름 키
          cx="30%" // 원의 중심 X 좌표 (범례를 오른쪽에 배치하기 위해 왼쪽으로 이동)
          cy="50%" // 원의 중심 Y 좌표
          innerRadius={60}
          outerRadius={100}
          labelLine={false}
          label={renderCustomizedLabel} // 커스텀 레이블 사용
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#CCCCCC'} />
          ))}
        </Pie>

        {/* 마우스를 올렸을 때 나타나는 툴팁 */}
        <Tooltip formatter={(value, name) => [`${value}개`, `Task ${name}`]} />

        {/* 범례 (Legend)를 커스텀 컴포넌트로 사용 */}
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ right: 10, top: 40 }} // 범례 위치 조정
          content={renderLegend}
        />
      </PieChart>
    </div>
  );
};

// --- 나머지 차트 컴포넌트 (변경 없음) ---
const PriorityBarChart = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count), 0);
  // Y축 레이블을 0부터 maxCount까지 5단계로 나눕니다.
  const yAxisLabels = [
    maxCount,
    (maxCount * 0.75).toFixed(1),
    (maxCount * 0.5).toFixed(1),
    (maxCount * 0.25).toFixed(1),
    0
  ];

  return (
    <div className="bar-chart-container">
      {/* Y축 레이블 */}
      <div className="y-axis-labels">
        {yAxisLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      <div className="chart-placeholder bar-chart">
        {data.map(item => (
          <div key={item.label} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${(item.count / (maxCount > 0 ? maxCount : 1)) * 100}%` }}
              title={`${item.label}: ${item.count}개`}></div>
            <div className="bar-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 대시보드 메인 컴포넌트 ---
export default function AnalyticsDashboard() {
  // useMemo를 사용하여 Task 데이터가 변경될 때만 분석을 다시 수행 (성능 최적화)
  const analyticsData = useMemo(() => analyzeTasks(DUMMY_TASKS), []);

  const {
    total,
    completed,
    inProgress,
    completionRate,
    statusDistributionData,
    priorityDistributionData,
    projectProgressData
  } = analyticsData;

  // 라우팅 관련 변수 사용 예시 (컴포넌트 내에서 필요 시)
  // const params = useParams();
  // const outlet = <Outlet />;

  return (
    <div className="analytics-dashboard">
      <h2>통계 및 분석</h2>
      <p className="subtitle">프로젝트의 전반적인 현황을 확인하세요 (총 Task: {total}개)</p>

      {/* 1. 요약 카드 섹션 */}
      <div className="summary-cards">
        <StatCard title="전체 Task" value={total} />
        <StatCard title="완료된 Task" value={completed} />
        <StatCard title="진행 중" value={inProgress} />
        <StatCard title="완료율" value={completionRate} unit="%" />
      </div>

      {/* 2. 차트 섹션 */}
      <div className="chart-row">
        {/* 상태별 Task 분포 (Recharts 파이 차트) */}
        <div className="chart-panel">
          <h3>상태별 Task 분포</h3>
          <StatusPieChart data={statusDistributionData} />
        </div>

        {/* 우선순위별 Task 수 (막대 차트) */}
        <div className="chart-panel">
          <h3>우선순위별 Task 수</h3>
          <PriorityBarChart data={priorityDistributionData} />
        </div>
      </div>

      {/* 3. 프로젝트별 진행률 (프로그레스 바) */}
      <div className="chart-panel full-width-panel">
        <h3>프로젝트별 진행률</h3>
        <div className="progress-bar-list">
          {projectProgressData.map(project => (
            <ProjectProgressBar
              key={project.name}
              name={project.name}
              progress={project.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
