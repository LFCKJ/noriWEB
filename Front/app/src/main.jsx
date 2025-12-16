import { createRoot } from 'react-dom/client';
//import './reset.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { AuthProvider } from './hooks/useAuth';
import './style.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
        <Router />
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
);
