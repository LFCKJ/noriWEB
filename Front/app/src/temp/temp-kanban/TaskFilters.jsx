// TaskFilters.jsx
import React, { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Button from '../../components/ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';

// ⛔ mockUsers, mockData 같은 건 이제 안 씀 (TempControl에서 실제 데이터를 받음)
// import { mockUsers } from '../temp-kanban/utils/mockData';

const TaskFilters = ({
  tasks = [], // 🔹 없으면 기본값을 []로 둬서 map 에러 방지
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
    assigneeFilter !== '전체' ||
    priorityFilter !== '전체' ||
    statusFilter !== '전체';

  const clearFilters = () => {
    onAssigneeFilterChange('전체');
    onPriorityFilterChange('전체');
    onStatusFilterChange('전체');
  };

  // 🔹 TempControl에서 받은 tasks로 담당자 목록 만들기
  const assignees = useMemo(() => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const names = safeTasks
      .map((t) => t.assignee)
      .filter((name) => name && name.trim() !== '');
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

        <PopoverContent className="w-80">
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
              <Select
                value={assigneeFilter}
                onValueChange={onAssigneeFilterChange}
              >
                <SelectTrigger>
                  {assigneeFilter === '전체' ? '전체' : assigneeFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  {assignees.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 우선순위 */}
            <div>
              <Label>우선순위</Label>
              <Select
                value={priorityFilter}
                onValueChange={onPriorityFilterChange}
              >
                <SelectTrigger>
                  {priorityFilter === '전체' ? '전체' : priorityFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                  <SelectItem value="높음">높음</SelectItem>
                  <SelectItem value="중간">중간</SelectItem>
                  <SelectItem value="낮음">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 상태 */}
            <div>
              <Label>상태</Label>
              <Select
                value={statusFilter}
                onValueChange={onStatusFilterChange}
              >
                <SelectTrigger>
                  {statusFilter === '전체' ? '전체' : statusFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="대기 중">대기 중</SelectItem>
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
};

export default TaskFilters;
