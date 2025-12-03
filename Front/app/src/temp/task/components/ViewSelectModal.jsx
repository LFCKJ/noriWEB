export default function ViewSelectModal({
    isOpen,
    onClose,
    activeViews,
    availableViews,
    onToggleView
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">View 선택</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                        ×
                    </button>
                </div>

                {/* 컨텐츠 */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">헤더에 표시할 View를 선택하세요</p>
                    <div className="space-y-3">
                        {availableViews.map(view => (
                            <label
                                key={view.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={activeViews.includes(view.id)}
                                    onChange={() => onToggleView(view.id)}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-xl">{view.icon}</span>
                                <span className="text-gray-700">{view.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}
