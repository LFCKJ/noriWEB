// src/components/TaskFilters.jsx
import React, { useMemo, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Button from '../../components/ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';

// tasks를 받아서 거기서 담당자 목록 뽑아 쓸 거라 props에 tasks 추가함
export default function TaskFilters({
  searchQuery,
  onSearchChange,
  assigneeFilter,
  onAssigneeFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  tasks,
}) {
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

  // tasks에서 담당자 목록 추출 (문자열 assignee 기준, 중복 제거)
  const assigneeOptions = useMemo(() => {
    const names = tasks
      .map((t) => t.assignee)
      .filter(Boolean);
    return Array.from(new Set(names));
  }, [tasks]);

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

            {/* 담당자 필터 */}
            <div>
              <Label>담당자</Label>
              <Select
                value={assigneeFilter}
                onValueChange={onAssigneeFilterChange}
              >
                <SelectTrigger>
                  {assigneeFilter === 'all'
                    ? '전체'
                    : assigneeFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {assigneeOptions.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 우선순위 필터 (mockData의 한글 priority 값 기준) */}
            <div>
              <Label>우선순위</Label>
              <Select
                value={priorityFilter}
                onValueChange={onPriorityFilterChange}
              >
                <SelectTrigger>
                  {priorityFilter === 'all' ? '전체' : priorityFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="낮음">낮음</SelectItem>
                  <SelectItem value="보통">보통</SelectItem>
                  <SelectItem value="높음">높음</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 상태 필터 (mockData의 한글 status 값 기준) */}
            <div>
              <Label>상태</Label>
              <Select
                value={statusFilter}
                onValueChange={onStatusFilterChange}
              >
                <SelectTrigger>
                  {statusFilter === 'all' ? '전체' : statusFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="할 일">할 일</SelectItem>
                  <SelectItem value="진행 중">진행 중</SelectItem>
                  <SelectItem value="검토">검토</SelectItem>
                  <SelectItem value="완료">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
