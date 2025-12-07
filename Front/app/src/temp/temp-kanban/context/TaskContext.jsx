// TaskContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { mockTasks, mockNotifications } from '../utils/mockData';

// types/task.ts 내용 없이, 필요한 필드만 JS로 사용
// Task, Notification 타입은 주석으로 참고만
// interface Task { id, title, description, priority, status, ... }

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(mockTasks);
  const [notifications, setNotifications] = useState(mockNotifications);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const value = {
    tasks,
    notifications,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    markNotificationAsRead,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
