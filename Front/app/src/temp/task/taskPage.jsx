import { useState } from 'react';
import {
    TaskModal,
    TaskDetailModal,
    DeleteConfirmModal,
    ViewSelectModal,
    TaskHeader,
    TaskPageTitle,
    SearchBar,
    ListView,
    CalendarView,
    TimelineView
} from './components';
import { formatDateToDisplay } from './utils';
import './taskPage.css';

export default function TaskPage() {
    // 뷰 상태
    const [activeViews, setActiveViews] = useState(['list']); // 활성화된 view 탭들
    const [currentView, setCurrentView] = useState('list'); // 현재 보고 있는 view
    const [searchQuery, setSearchQuery] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Task 데이터
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: '데이터베이스 성능 최적화',
            description: '데이터베이스 쿼리 속도를 개선하기 위한 인덱스 최적화 작업',
            tags: ['Database', 'Performance'],
            status: '완료',
            priority: '높음',
            type: '개선',
            assignee: '정수진',
            dueDate: '2025. 11. 28.',
            project: 'Backend 최적화'
        },
        {
            id: 2,
            title: '회원가입 폼 버그 수정',
            description: '회원가입 시 이메일 중복 검사 오류 수정',
            tags: ['Bug', 'Backend'],
            status: '할 일',
            priority: '긴급',
            type: '버그',
            assignee: '이영희',
            dueDate: '2025. 12. 1.',
            project: '사용자 관리'
        },
        {
            id: 3,
            title: '로그인 페이지 UI 개선',
            description: '로그인 페이지 디자인 개편 및 반응형 디자인 적용',
            tags: ['UI', 'Frontend'],
            status: '진행 중',
            priority: '높음',
            type: '기능',
            assignee: '김철수',
            dueDate: '2025. 12. 5.',
            project: 'Frontend 개편'
        },
        {
            id: 4,
            title: 'API 문서 작성',
            description: 'REST API 명세서 및 사용 가이드 작성',
            tags: ['Documentation'],
            status: '검토',
            priority: '보통',
            type: '문서화',
            assignee: '박민수',
            dueDate: '2025. 12. 10.',
            project: 'API 개발'
        },
        {
            id: 5,
            title: '모바일 반응형 개선',
            description: '모바일 화면에서의 UI/UX 개선 작업',
            tags: ['Mobile', 'UI'],
            status: '할 일',
            priority: '보통',
            type: '기능',
            assignee: '김철수',
            dueDate: '2025. 12. 15.',
            project: 'Frontend 개편'
        },
        {
            id: 6,
            title: '알림 기능 구현',
            description: '실시간 알림 기능 개발 (웹소켓 기반)',
            tags: ['Feature', 'Backend'],
            status: '진행 중',
            priority: '낮음',
            type: '기능',
            assignee: '이영희',
            dueDate: '2025. 12. 20.',
            project: '알림 시스템'
        }
    ]);

    // Task CRUD 핸들러
    const handleAddTask = formData => {
        const newTask = {
            id: Date.now(),
            title: formData.title,
            description: formData.description || '',
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
            status: '할 일',
            priority: formData.priority,
            type: formData.type,
            assignee: formData.assignee || '미정',
            dueDate: formatDateToDisplay(formData.dueDate),
            project: formData.project || ''
        };
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTask = formData => {
        const updatedTask = {
            ...selectedTask,
            title: formData.title,
            description: formData.description || '',
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
            status: formData.status,
            priority: formData.priority,
            type: formData.type,
            assignee: formData.assignee || '미정',
            dueDate: formatDateToDisplay(formData.dueDate),
            project: formData.project || ''
        };

        setTasks(tasks.map(task => (task.id === selectedTask.id ? updatedTask : task)));
        setSelectedTask(updatedTask); // 상세 모달에 표시될 task도 업데이트
        setIsEditModalOpen(false);
        setIsDetailModalOpen(true); // 상세 모달 다시 열기
    };

    const handleDeleteClick = task => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            setTasks(tasks.filter(task => task.id !== taskToDelete.id));
            setTaskToDelete(null);
            setIsDetailModalOpen(false);
        }
    };

    const handleTaskClick = task => {
        setSelectedTask(task);
        setIsDetailModalOpen(true);
    };

    const handleEditClick = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
    };

    // 사용 가능한 모든 뷰 목록
    const availableViews = [
        { id: 'list', icon: '☰', name: '리스트' },
        { id: 'calendar', icon: '📅', name: '캘린더' },
        { id: 'timeline', icon: '📊', name: '타임라인' }
    ];

    // View 토글 핸들러
    const handleToggleView = viewId => {
        if (activeViews.includes(viewId)) {
            // 최소 1개는 유지
            if (activeViews.length > 1) {
                const newActiveViews = activeViews.filter(id => id !== viewId);
                setActiveViews(newActiveViews);
                // 현재 보고 있던 view가 제거되면 첫 번째 view로 이동
                if (currentView === viewId) {
                    setCurrentView(newActiveViews[0]);
                }
            }
        } else {
            setActiveViews([...activeViews, viewId]);
        }
    };

    // View 렌더링
    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <ListView
                        tasks={tasks}
                        onTaskClick={handleTaskClick}
                        onTaskDelete={handleDeleteClick}
                    />
                );
            case 'calendar':
                return <CalendarView />;
            case 'timeline':
                return <TimelineView />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <TaskHeader
                activeViews={activeViews}
                currentView={currentView}
                availableViews={availableViews}
                onViewChange={setCurrentView}
                onAddViewClick={() => setIsViewModalOpen(true)}
            />

            {/* 메인 컨텐츠 */}
            <main className="px-8 py-6">
                {/* 페이지 타이틀 */}
                <TaskPageTitle
                    viewName={availableViews.find(v => v.id === currentView)?.name}
                    onAddTask={() => setIsModalOpen(true)}
                />

                {/* 검색 및 필터 - 리스트 뷰에서만 표시 */}
                {currentView === 'list' && (
                    <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                )}

                {/* View 컨텐츠 */}
                {renderView()}
            </main>

            {/* 새 Task 모달 */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />

            {/* Task 수정 모달 */}
            <TaskModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setIsDetailModalOpen(true);
                }}
                onSubmit={handleUpdateTask}
                initialData={selectedTask}
                isEditMode={true}
            />

            {/* Task 상세 모달 */}
            <TaskDetailModal
                task={selectedTask}
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedTask(null);
                }}
                onDelete={handleDeleteClick}
                onUpdate={handleEditClick}
            />

            {/* 삭제 확인 모달 */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setTaskToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                taskTitle={taskToDelete?.title}
            />

            {/* View 선택 모달 */}
            <ViewSelectModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                activeViews={activeViews}
                availableViews={availableViews}
                onToggleView={handleToggleView}
            />
        </div>
    );
}
