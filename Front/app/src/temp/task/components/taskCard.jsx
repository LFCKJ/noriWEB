import { getStatusColor, getPriorityColor } from '../utils';

export default function TaskCard({ task, onDelete, onClick }) {
    const handleDeleteClick = e => {
        e.stopPropagation();
        onDelete(task);
    };

    return (
        <div
            onClick={() => onClick(task)}
            className="flex items-center hover:bg-gray-50 transition-colors group cursor-pointer px-6 py-4">
            {/* 제목 */}
            <div className="flex-1 min-w-[200px]">
                <div className="font-medium text-gray-900 mb-2 truncate" title={task.title}>
                    {task.title}
                </div>
                <div className="flex gap-2 overflow-hidden">
                    {task.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            title={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200 max-w-20 truncate inline-block whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                    {task.tags.length > 3 && (
                        <span
                            className="px-2 py-1 text-gray-500 text-xs whitespace-nowrap"
                            title={task.tags.slice(3).join(', ')}>
                            +{task.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* 상태 */}
            <div className="w-[120px] flex justify-center">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                        task.status
                    )}`}>
                    {task.status}
                </span>
            </div>

            {/* 우선순위 */}
            <div className="w-[120px] flex justify-center">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${getPriorityColor(
                        task.priority
                    )}`}>
                    {task.priority}
                </span>
            </div>

            {/* 유형 */}
            <div className="w-[100px] text-center text-gray-700">{task.type}</div>

            {/* 담당자 */}
            <div className="w-[100px] text-center text-gray-700">{task.assignee}</div>

            {/* 마감일 */}
            <div className="w-[120px] text-center text-red-500">{task.dueDate}</div>

            {/* 삭제 버튼 */}
            <div className="w-[60px] flex justify-center">
                <button
                    onClick={handleDeleteClick}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 cursor-pointer"
                    title="삭제">
                    🗑️
                </button>
            </div>
        </div>
    );
}
