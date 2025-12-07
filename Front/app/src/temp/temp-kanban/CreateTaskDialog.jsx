// CreateTaskDialog.jsx
import React, { useState } from 'react';
import { useTaskContext } from '../temp-kanban/context/TaskContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Button from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockUsers } from '../temp-kanban/utils/mockData';

const Textarea = (props) => (
  <textarea
    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-200"
    {...props}
  />
);

const CreateTaskDialog = () => {
  const { addTask } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    type: 'feature',
    dueDate: '',
    assigneeId: '',
    project: '',
    tags: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'todo',
      type: formData.type,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      assignee: formData.assigneeId
        ? mockUsers.find((u) => u.id === formData.assigneeId)
        : null,
      coAssignees: [],
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      project: formData.project,
      subTasks: [],
      attachments: [],
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTask(newTask);
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      type: 'feature',
      dueDate: '',
      assigneeId: '',
      project: '',
      tags: '',
    });
  };

  return (
    <>
      {/* 상단 “새 Task” 버튼 */}
      <Button
        variant="primary"
        size="medium"
        onClick={() => setOpen(true)}
      >
        ＋ 새 Task
      </Button>

      {/* 네가 만든 Dialog 컴포넌트 사용 */}
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
                <option value="low">낮음</option>
                <option value="medium">보통</option>
                <option value="high">높음</option>
                <option value="urgent">긴급</option>
              </select>
            </div>

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
                <option value="feature">기능</option>
                <option value="bug">버그</option>
                <option value="improvement">개선</option>
                <option value="documentation">문서화</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">마감일</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="assigneeId">담당자</Label>
              <select
                id="assigneeId"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                value={formData.assigneeId}
                onChange={(e) =>
                  setFormData({ ...formData, assigneeId: e.target.value })
                }
              >
                <option value="">담당자 선택</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="project">프로젝트/리스트 *</Label>
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

          <div>
            <Label htmlFor="tags">태그</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="태그를 쉼표로 구분하여 입력"
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
};

export default CreateTaskDialog;
