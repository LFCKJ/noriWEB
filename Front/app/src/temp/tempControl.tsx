import { Outlet } from 'react-router-dom';
import TaskData from './data/tasksData.json';
import { useState } from 'react';

export default function TempControl() {
  const [tasks, setTasks] = useState(TaskData);
  return (
    <>
      <Outlet context={[tasks, setTasks]} />
    </>
  );
}
