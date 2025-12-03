export default function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    type="text"
                    placeholder="제목 또는 내용으로 검색..."
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <span>🔽</span>
                <span>필터</span>
            </button>
        </div>
    );
}
