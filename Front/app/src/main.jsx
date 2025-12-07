import { createRoot } from 'react-dom/client';
import './reset.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { AuthProvider } from './hooks/useAuth';
import { TaskProvider } from './temp/temp-kanban/context/TaskContext';
createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <TaskProvider>
            <Router />
            </TaskProvider>
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
