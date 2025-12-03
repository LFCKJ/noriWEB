export default function TaskCard({ task, onDelete }) {
    const getStatusColor = status => {
        const colors = {
            완료: 'bg-green-100 text-green-700',
            '활 일': 'bg-gray-100 text-gray-700',
            '진행 중': 'bg-blue-100 text-blue-700',
            검토: 'bg-purple-100 text-purple-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getPriorityColor = priority => {
        const colors = {
            긴급: 'bg-red-100 text-red-700',
            높음: 'bg-orange-100 text-orange-700',
            보통: 'bg-yellow-100 text-yellow-700',
            낮음: 'bg-green-100 text-green-700'
        };
        return colors[priority] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
            {/* 제목 */}
            <div>
                <div className="font-medium text-gray-900 mb-2">{task.title}</div>
                <div className="flex gap-2">
                    {task.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 상태 */}
            <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
            </div>

            {/* 우선순위 */}
            <div className="flex items-center">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
            </div>

            {/* 유형 */}
            <div className="flex items-center text-gray-700">{task.type}</div>

            {/* 담당자 */}
            <div className="flex items-center text-gray-700">{task.assignee}</div>

            {/* 마감일 */}
            <div className="flex items-center text-red-500">{task.dueDate}</div>

            {/* 삭제 버튼 */}
            <div className="flex items-center">
                <button
                    onClick={() => onDelete(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 px-2"
                    title="삭제">
                    🗑️
                </button>
            </div>
        </div>
    );
}
