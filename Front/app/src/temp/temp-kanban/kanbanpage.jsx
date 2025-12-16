import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import CreateTaskDialog from './CreateTaskDialog';
import TaskFilters from './TaskFilters';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

export default function Kanbanpage() {
  // TempControl에서 내려준 데이터 받기
  const [tasks, setTasks] = useOutletContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('전체');
  const [priorityFilter, setPriorityFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  // 🔹 드래그 중인 카드 id
  const [draggingTaskId, setDraggingTaskId] = useState(null);

  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return tasks.filter((t) => {
      const title = (t.title || '').toLowerCase();
      const desc = (t.description || '').toLowerCase();

      const matchesSearch = title.includes(q) || desc.includes(q);
      const matchesAssignee =
        assigneeFilter === '전체' || t.assignee === assigneeFilter;
      const matchesPriority =
        priorityFilter === '전체' || t.priority === priorityFilter;
      const matchesStatus =
        statusFilter === '전체' || t.status === statusFilter;

      return (
        matchesSearch && matchesAssignee && matchesPriority && matchesStatus
      );
    });
  }, [tasks, searchQuery, assigneeFilter, priorityFilter, statusFilter]);

  const columns = [
    { status: '할 일', color: 'bg-slate-100' },
    { status: '진행 중', color: 'bg-blue-100' },
    { status: '검토', color: 'bg-purple-100' },
    { status: '완료', color: 'bg-green-100' },
    { status: '대기 중', color: 'bg-yellow-100' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '긴급':
        return 'border-l-red-500';
      case '높음':
        return 'border-l-orange-500';
      case '보통':
        return 'border-l-yellow-500';
      case '낮음':
        return 'border-l-green-500';
      default:
        return 'border-l-slate-300';
    }
  };

  // 🔹 드래그 시작
  const handleDragStart = (taskId) => {
    setDraggingTaskId(taskId);
  };

  // 🔹 드랍 영역 위에 있을 때 기본 동작 막기
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 🔹 드랍 시 컬럼 상태 변경
  const handleDrop = (newStatus) => {
    if (!draggingTaskId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggingTaskId ? { ...task, status: newStatus } : task
      )
    );

    setDraggingTaskId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">📋 칸반 보드</h1>
        <CreateTaskDialog tasks={tasks} setTasks={setTasks} />
      </div>

      <TaskFilters
        tasks={tasks} // 🔹 필터에서 담당자 목록 만들 때 사용
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        assigneeFilter={assigneeFilter}
        onAssigneeFilterChange={setAssigneeFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        {columns.map((col) => {
          const columnTasks = filteredTasks.filter(
            (t) => t.status === col.status
          );

          return (
            <div key={col.status}>
              <div
                className={`rounded-t-lg px-4 py-2 font-semibold text-sm flex justify-between items-center ${col.color}`}
              >
                <span>{col.status}</span>
                <Badge variant="secondary">{columnTasks.length}</Badge>
              </div>

              {/* 🔹 이 영역이 드랍 존 */}
              <div
                className="bg-gray-50 rounded-b-lg p-4 min-h-[400px] space-y-3"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(col.status)}
              >
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`p-4 border-l-4 ${getPriorityColor(
                      task.priority
                    )}`}
                    draggable // 🔹 카드 드래그 가능
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <h3 className="font-semibold text-sm mb-1">
                      {task.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {task.description}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{task.assignee || '미지정'}</span>
                      <span>{task.dueDate}</span>
                    </div>
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
