export default function TaskHeader({
    activeViews,
    currentView,
    availableViews,
    onViewChange,
    onAddViewClick
}) {
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-semibold text-blue-600">경로 title</h1>
                    <nav className="flex items-center gap-4">
                        {activeViews.map(viewId => {
                            const view = availableViews.find(v => v.id === viewId);
                            return (
                                <button
                                    key={viewId}
                                    onClick={() => onViewChange(viewId)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                                        currentView === viewId
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}>
                                    <span>{view.icon}</span>
                                    <span className="text-sm">{view.name}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={onAddViewClick}
                            className="flex items-center justify-center w-8 h-8 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                            title="View 추가">
                            <span className="text-lg font-bold">+</span>
                        </button>
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
    );
}
