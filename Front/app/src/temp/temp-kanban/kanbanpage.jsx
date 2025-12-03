import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useTaskContext } from '../context/TaskContext';
import CreateTaskDialog from './CreateTaskDialog';
import TaskFilters from './TaskFilters';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

export default function TaskBoardView() {
  const { tasks, updateTask } = useTaskContext();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAssignee = assigneeFilter === 'all' || task.assignee?.id === assigneeFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      return matchesSearch && matchesAssignee && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, assigneeFilter, priorityFilter, statusFilter]);

  const columns = [
    { status: 'todo', title: '할 일', color: 'bg-gray-100' },
    { status: 'in-progress', title: '진행 중', color: 'bg-blue-100' },
    { status: 'review', title: '검토', color: 'bg-purple-100' },
    { status: 'done', title: '완료', color: 'bg-green-100' },
  ];

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return '';
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1>칸반 보드</h1>
        <CreateTaskDialog />
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.status);

          return (
            <div key={column.status} className="flex flex-col">
              <div className={cn('rounded-t-lg p-3 mb-2', column.color)}>
                <div className="flex items-center justify-between">
                  <h3>{column.title}</h3>
                  <Badge variant="secondary">{columnTasks.length}</Badge>
                </div>
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
                className="flex-1 space-y-2 min-h-[500px] bg-gray-50 rounded-b-lg p-2"
              >
                {columnTasks.map(task => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onClick={() => navigate(`/task/${task.id}`)}
                    className={cn(
                      'p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4',
                      getPriorityColor(task.priority)
                    )}
                  >
                    <h4 className="mb-2">{task.title}</h4>

                    {task.tags && task.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-2">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{task.assignee?.name || '미할당'}</span>
                      {task.dueDate && (
                        <span
                          className={cn(
                            new Date(task.dueDate) < new Date() &&
                            task.status !== 'done'
                              ? 'text-red-600'
                              : ''
                          )}
                        >
                          {new Date(task.dueDate).toLocaleDateString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {task.subTasks && task.subTasks.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {task.subTasks.filter(st => st.completed).length}/{task.subTasks.length} 완료
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
