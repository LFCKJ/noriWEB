import TaskCard from './TaskCard';

export default function ListView({ tasks, onTaskClick, onTaskDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto scrollbar-visible">
            <div className="min-w-[900px]">
                {/* 헤더 */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 px-6 py-3 text-sm font-medium text-gray-600">
                    <div className="flex-1 min-w-[200px]">제목</div>
                    <div className="w-[120px] text-center">상태</div>
                    <div className="w-[120px] text-center">우선순위</div>
                    <div className="w-[100px] text-center">유형</div>
                    <div className="w-[100px] text-center">담당자</div>
                    <div className="w-[120px] text-center">마감일</div>
                    <div className="w-[60px]"></div>
                </div>
                {/* 바디 */}
                <div className="divide-y divide-gray-200">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onTaskDelete}
                            onClick={onTaskClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
