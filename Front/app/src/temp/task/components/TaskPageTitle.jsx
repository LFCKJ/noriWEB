export default function TaskPageTitle({ viewName, onAddTask }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-normal text-gray-700">{viewName} 뷰</h2>
            <button
                onClick={onAddTask}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <span className="text-lg">+</span>
                <span>새 Task</span>
            </button>
        </div>
    );
}
