import { useState } from 'react';
import TaskCard from './taskCard';
import TaskModal from './TaskModal';

export default function TaskPage() {
    const [activeView, setActiveView] = useState('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 샘플 데이터 - useState로 관리
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: '데이터베이스 성능 최적화',
            tags: ['Database', 'Performance'],
            status: '완료',
            priority: '높음',
            type: '개선',
            assignee: '정수진',
            dueDate: '2025. 11. 28.'
        },
        {
            id: 2,
            title: '회원가입 폼 버그 수정',
            tags: ['Bug', 'Backend'],
            status: '활 일',
            priority: '긴급',
            type: '버그',
            assignee: '이영희',
            dueDate: '2025. 12. 1.'
        },
        {
            id: 3,
            title: '로그인 페이지 UI 개선',
            tags: ['UI', 'Frontend'],
            status: '진행 중',
            priority: '높음',
            type: '기능',
            assignee: '김철수',
            dueDate: '2025. 12. 5.'
        },
        {
            id: 4,
            title: 'API 문서 작성',
            tags: ['Documentation'],
            status: '검토',
            priority: '보통',
            type: '문서화',
            assignee: '박민수',
            dueDate: '2025. 12. 10.'
        },
        {
            id: 5,
            title: '모바일 반응형 개선',
            tags: ['Mobile', 'UI'],
            status: '활 일',
            priority: '보통',
            type: '기능',
            assignee: '김철수',
            dueDate: '2025. 12. 15.'
        },
        {
            id: 6,
            title: '알림 기능 구현',
            tags: ['Feature', 'Backend'],
            status: '진행 중',
            priority: '낮음',
            type: '기능',
            assignee: '이영희',
            dueDate: '2025. 12. 20.'
        }
    ]);

    // Task 추가 함수
    const handleAddTask = formData => {
        const newTask = {
            id: Date.now(),
            title: formData.title,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
            status: '활 일',
            priority: formData.priority,
            type: formData.type,
            assignee: formData.assignee || '미정',
            dueDate: formData.dueDate
                ? new Date(formData.dueDate)
                      .toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                      })
                      .replace(/\. /g, '. ')
                : '미정'
        };
        setTasks([...tasks, newTask]);
    };

    // Task 삭제 함수
    const handleDeleteTask = taskId => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const viewTabs = [
        { id: 'dashboard', icon: '⊞', label: '대시보드' },
        { id: 'list', icon: '☰', label: '리스트' },
        { id: 'kanban', icon: '⊟', label: '칸반' },
        { id: 'calendar', icon: '📅', label: '캘린더' },
        { id: 'timeline', icon: '📊', label: '타임라인' },
        { id: 'stream', icon: '⋮⋮', label: '스트림' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <header className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-semibold text-blue-600">Task Manager</h1>
                        <nav className="flex gap-6">
                            {viewTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveView(tab.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                                        activeView === tab.id
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}>
                                    <span>{tab.icon}</span>
                                    <span className="text-sm">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                    <button className="relative">
                        <span className="text-2xl">🔔</span>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            2
                        </span>
                    </button>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="px-8 py-6">
                {/* 페이지 타이틀 */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-normal text-gray-700">리스트 뷰</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <span className="text-lg">+</span>
                        <span>새 Task</span>
                    </button>
                </div>

                {/* 검색 및 필터 */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="제목 또는 내용으로 검색..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                        <span>🔽</span>
                        <span>필터</span>
                    </button>
                </div>

                {/* 테이블 헤더 */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div>제목</div>
                        <div>상태</div>
                        <div>우선순위</div>
                        <div>유형</div>
                        <div>담당자</div>
                        <div>마감일</div>
                    </div>

                    {/* 태스크 리스트 */}
                    <div className="divide-y divide-gray-200">
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                        ))}
                    </div>
                </div>
            </main>

            {/* 모달 */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />
        </div>
    );
}
