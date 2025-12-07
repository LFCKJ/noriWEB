import { Outlet } from 'react-router-dom';
import TaskData from './data/tasksData.json';

export default function TempControl() {
  console.log(TaskData);
  return (
    <>
      <Outlet context={TaskData} />
    </>
  );
}
