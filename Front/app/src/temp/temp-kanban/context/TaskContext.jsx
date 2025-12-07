// src/context/TaskContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { mockTasks } from '../utils/mockData';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(mockTasks);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        String(task.id) === String(id) ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => String(task.id) !== String(id)));
  };

  const getTask = (id) => tasks.find((t) => String(t.id) === String(id));

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return ctx;
}
