export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                {/* 아이콘 */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-2xl">⚠️</span>
                    </div>
                </div>

                {/* 제목 */}
                <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Task 삭제</h3>

                {/* 메시지 */}
                <p className="text-center text-gray-600 mb-2">정말로 이 Task를 삭제하시겠습니까?</p>
                {taskTitle && (
                    <p className="text-center text-sm text-gray-500 mb-6">"{taskTitle}"</p>
                )}

                {/* 버튼 */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        취소
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
