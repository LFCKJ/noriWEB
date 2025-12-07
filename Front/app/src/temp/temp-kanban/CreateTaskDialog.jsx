// src/components/CreateTaskDialog.jsx
import React, { useState } from 'react';
import { useTaskContext } from '../temp-kanban/context/';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Button from '../../components/ui/Button';
import { Dialog } from '../../components/ui/dialog';

const Textarea = (props) => (
  <textarea
    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-200"
    {...props}
  />
);

export default function CreateTaskDialog() {
  const { addTask, tasks } = useTaskContext();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '보통',   // '낮음' | '보통' | '높음' | '긴급'
    status: '할 일',    // '할 일' | '진행 중' | '검토' | '완료'
    type: '기능',       // '기능' | '버그' | '개선' | '문서'
    assignee: '',
    dueDate: '',
    project: '',
    tags: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // id는 기존 mockData와 동일하게 문자열 사용
    const newId =
      (Math.max(...tasks.map((t) => Number(t.id || 0)), 0) + 1).toString();

    const newTask = {
      id: newId,
      title: formData.title,
      description: formData.description,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: formData.status,
      priority: formData.priority,
      type: formData.type,
      assignee: formData.assignee,
      // 날짜는 문자열로 그대로 저장 (예: '2025. 12. 31.' 또는 '2025-12-31')
      dueDate: formData.dueDate,
      project: formData.project,
    };

    addTask(newTask);
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      priority: '보통',
      status: '할 일',
      type: '기능',
      assignee: '',
      dueDate: '',
      project: '',
      tags: '',
    });
  };

  return (
    <>
      <Button
        variant="primary"
        size="medium"
        onClick={() => setOpen(true)}
      >
        ＋ 새 Task
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="새 Task 만들기"
        width="600px"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Task 제목을 입력하세요"
            />
          </div>

          <div>
            <Label htmlFor="description">설명 *</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Task에 대한 설명을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">우선순위 *</Label>
              <select
                id="priority"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="낮음">낮음</option>
                <option value="보통">보통</option>
                <option value="높음">높음</option>
                <option value="긴급">긴급</option>
              </select>
            </div>

            <div>
              <Label htmlFor="status">상태 *</Label>
              <select
                id="status"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="할 일">할 일</option>
                <option value="진행 중">진행 중</option>
                <option value="검토">검토</option>
                <option value="완료">완료</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">유형</Label>
              <select
                id="type"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="기능">기능</option>
                <option value="버그">버그</option>
                <option value="개선">개선</option>
                <option value="문서">문서</option>
              </select>
            </div>

            <div>
              <Label htmlFor="dueDate">마감일</Label>
              <Input
                id="dueDate"
                type="text"
                placeholder="예: 2025. 12. 31."
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignee">담당자</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                placeholder="담당자 이름"
              />
            </div>

            <div>
              <Label htmlFor="project">프로젝트 *</Label>
              <Input
                id="project"
                required
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                placeholder="프로젝트 이름"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">태그</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="태그를 쉼표로 구분하여 입력 (예: UI, Backend)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button type="submit" variant="primary">
              생성
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
