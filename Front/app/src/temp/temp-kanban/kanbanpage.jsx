// routes/kanbanpage.jsx (현재 파일에 덮어쓰기)
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../temp-kanban/context/TaskContext';
import CreateTaskDialog from '../temp-kanban/CreateTaskDialog';
import TaskFilters from './TaskFilters';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { cn } from '../temp-kanban/lib/utils';

export default function Kanbanpage() {
  const { tasks, updateTask } = useTaskContext();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // 검색 + 필터
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = (task.title || '').toLowerCase();
      const desc = (task.description || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = title.includes(q) || desc.includes(q);
      const matchesAssignee =
        assigneeFilter === 'all' || task.assignee?.id === assigneeFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;

      return (
        matchesSearch &&
        matchesAssignee &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [tasks, searchQuery, assigneeFilter, priorityFilter, statusFilter]);

  // 컬럼 정보 (헤더 색상)
  const columns = [
    { status: 'todo',        title: '할 일',   color: 'bg-slate-100' },
    { status: 'in-progress', title: '진행 중', color: 'bg-blue-100' },
    { status: 'review',      title: '검토',    color: 'bg-purple-100' },
    { status: 'done',        title: '완료',    color: 'bg-green-100' },
  ];

  const getTasksByStatus = (status) =>
    filteredTasks.filter((task) => task.status === status);

  // 카드 왼쪽 컬러 바 (우선순위)
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-slate-300';
    }
  };

  // 드래그 앤 드롭
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', String(taskId));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    // TaskContext에서 쓰는 시그니처에 맞게 (id, partial) 형식 유지
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="w-full h-full px-6 py-8 bg-slate-50">
      {/* 상단 타이틀 + 새 Task 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">칸반 보드</h1>
        <CreateTaskDialog />
      </div>

      {/* 검색/필터 영역 */}
      <div className="mb-6">
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={setAssigneeFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

            {/* 컬럼들 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);

          return (
            <div key={column.status} className="flex flex-col">
              {/* 컬럼 헤더 */}
              <div
                className={cn(
                  'rounded-t-2xl px-4 py-3 mb-2 flex items-center justify-between text-sm font-semibold shadow-sm',
                  column.color
                )}
              >
                <span>{column.title}</span>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5"
                >
                  {columnTasks.length}
                </Badge>
              </div>

              {/* 드롭 영역 */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
                className="flex-1 min-h-[520px] bg-slate-100/80 rounded-b-2xl p-4 space-y-4"
              >
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onClick={() => navigate(`/task/${task.id}`)}
                    className={cn(
                      'w-full p-4 cursor-pointer bg-white rounded-2xl border border-slate-200 border-l-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all',
                      getPriorityColor(task.priority)
                    )}
                  >
                    {/* 제목 */}
                    <h4 className="mb-2 text-sm font-semibold">{task.title}</h4>

                    {/* 태그 배지들 */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {task.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[11px] px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 담당자 + 마감일 */}
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>{task.assignee?.name ?? '미할당'}</span>
                      {task.dueDate && (
                        <span
                          className={
                            new Date(task.dueDate) < new Date() &&
                            task.status !== 'done'
                              ? 'text-red-500'
                              : 'text-slate-500'
                          }
                        >
                          {new Date(task.dueDate).toLocaleDateString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {/* 서브태스크 진행률 */}
                    {task.subTasks && task.subTasks.length > 0 && (
                      <div className="mt-1 text-[11px] text-slate-400">
                        {
                          task.subTasks.filter((sub) => sub.completed).length
                        }
                        /{task.subTasks.length} 완료
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 

