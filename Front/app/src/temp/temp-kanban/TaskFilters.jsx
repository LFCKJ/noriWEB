// TaskFilters.jsx
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Button from '../../components/ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';
import { mockUsers } from '../temp-kanban/utils/mockData';

const TaskFilters = ({
  searchQuery,
  onSearchChange,
  assigneeFilter,
  onAssigneeFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const [open, setOpen] = useState(false);

  const hasActiveFilters =
    assigneeFilter !== 'all' ||
    priorityFilter !== 'all' ||
    statusFilter !== 'all';

  const clearFilters = () => {
    onAssigneeFilterChange('all');
    onPriorityFilterChange('all');
    onStatusFilterChange('all');
  };

  return (
    <div className="flex gap-3 items-center">
      {/* 검색 인풋 */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <Input
          placeholder="제목 또는 내용으로 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 필터 버튼 + 팝오버 */}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="secondary"
            className={`gap-2 ${hasActiveFilters ? 'btn--active' : ''}`}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>필터</span>
            {hasActiveFilters && (
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent open={open} onClose={() => setOpen(false)} className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">필터</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={clearFilters}
                >
                  초기화
                </Button>
              )}
            </div>

            {/* 담당자 */}
            <div>
              <Label>담당자</Label>
              <Select value={assigneeFilter} onValueChange={onAssigneeFilterChange}>
                <SelectTrigger>
                  {assigneeFilter === 'all'
                    ? '전체'
                    : (mockUsers.find((u) => u.id === assigneeFilter)?.name || '선택')}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 우선순위 */}
            <div>
              <Label>우선순위</Label>
              <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger>
                  {priorityFilter === 'all'
                    ? '전체'
                    : priorityFilter === 'urgent'
                    ? '긴급'
                    : priorityFilter === 'high'
                    ? '높음'
                    : priorityFilter === 'medium'
                    ? '보통'
                    : '낮음'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="urgent">긴급</SelectItem>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 상태 */}
            <div>
              <Label>상태</Label>
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger>
                  {statusFilter === 'all'
                    ? '전체'
                    : statusFilter === 'todo'
                    ? '할 일'
                    : statusFilter === 'in-progress'
                    ? '진행 중'
                    : statusFilter === 'review'
                    ? '검토'
                    : '완료'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="todo">할 일</SelectItem>
                  <SelectItem value="in-progress">진행 중</SelectItem>
                  <SelectItem value="review">검토</SelectItem>
                  <SelectItem value="done">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskFilters;
