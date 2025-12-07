import { useOutletContext } from 'react-router-dom';

export default function TempControlTest() {
  const tasksData = useOutletContext();
  console.log(tasksData);
  return <div>Temp Control Test</div>;
}
