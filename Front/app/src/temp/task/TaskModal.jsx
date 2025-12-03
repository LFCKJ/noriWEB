import { useState } from 'react';

export default function TaskModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '보통',
        type: '기능',
        dueDate: '',
        assignee: '',
        project: '',
        tags: ''
    });

    if (!isOpen) return null;

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">새 Task 만들기</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                        ×
                    </button>
                </div>

                {/* 폼 */}
                <form onSubmit={handleSubmit}>
                    {/* 제목 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Task 제목을 입력하세요"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 설명 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            설명 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Task에 대한 설명을 입력하세요"
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* 우선순위 & 유형 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                우선순위 <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="보통">보통</option>
                                <option value="낮음">낮음</option>
                                <option value="높음">높음</option>
                                <option value="긴급">긴급</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                유형
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="기능">기능</option>
                                <option value="버그">버그</option>
                                <option value="개선">개선</option>
                                <option value="문서화">문서화</option>
                            </select>
                        </div>
                    </div>

                    {/* 마감일 & 담당자 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                마감일
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                placeholder="연도-월-일"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                담당자
                            </label>
                            <select
                                name="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="">담당자 선택</option>
                                <option value="정수진">정수진</option>
                                <option value="이영희">이영희</option>
                                <option value="김철수">김철수</option>
                                <option value="박민수">박민수</option>
                            </select>
                        </div>
                    </div>

                    {/* 프로젝트/리스트 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            프로젝트/리스트 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="project"
                            value={formData.project}
                            onChange={handleChange}
                            placeholder="프로젝트 이름"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 태그 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="태그를 쉼표로 구분하여 입력"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                            생성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
