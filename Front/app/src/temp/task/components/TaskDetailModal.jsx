import { getStatusColor, getPriorityColor } from '../utils';

export default function TaskDetailModal({ task, isOpen, onClose, onUpdate, onDelete }) {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2 wrap-break-word">
                            {task.title}
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            {task.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded border border-gray-200 break-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4 shrink-0">
                        ×
                    </button>
                </div>

                {/* 상태 및 정보 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">상태</label>
                        <span
                            className={`inline-block px-4 py-2 rounded-full text-sm ${getStatusColor(
                                task.status
                            )}`}>
                            {task.status}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            우선순위
                        </label>
                        <span
                            className={`inline-block px-4 py-2 rounded-full text-sm ${getPriorityColor(
                                task.priority
                            )}`}>
                            {task.priority}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">유형</label>
                        <p className="text-gray-900">{task.type}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            담당자
                        </label>
                        <p className="text-gray-900">{task.assignee}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                            마감일
                        </label>
                        <p className="text-red-500">{task.dueDate}</p>
                    </div>
                </div>

                {/* 설명 (있을 경우) */}
                {task.description && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-500 mb-2">설명</label>
                        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                            <p className="text-gray-700 whitespace-pre-wrap break-all">
                                {task.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* 버튼 */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                    <button
                        onClick={() => onDelete(task)}
                        className="px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                        삭제
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            닫기
                        </button>
                        <button
                            onClick={onUpdate}
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
