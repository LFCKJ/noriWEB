import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './Navigation.css';

export const Navigation = ({ user = null, onLogin, onLogout, onCreateAccount }) => {
    const navigate = useNavigate();

    return (
        <div className="nav-wrapper">
            <div className="nav-logo-container">
                <a className="nav-logo" href="/" aria-label="Nori Logo">
                    <img src="https://placehold.co/32x32" alt="Nori Logo" />
                </a>
            </div>
            <nav className="nav-menu-container" aria-label="Main Navigation">
                <div className="nav-menu">
                    <Button label={'Home'} onClick={() => navigate('/')} />
                    <Button label={'About'} onClick={() => navigate('/about')} />
                    <Button label={'Contact'} onClick={() => navigate('/contact')} />
                    <Button label={'Test'} onClick={() => navigate('/test')} />
                </div>
            </nav>
            <div className="nav-actions-container">
                <div className="nav-actions" aria-label="User Actions">
                    {user ? (
                        <>
                            <span className="welcome">
                                Welcome, <b>{user.name}</b>!
                            </span>
                            <Button onClick={onLogout} label={'Log out'} />
                        </>
                    ) : (
                        <>
                            <Button onClick={onLogin} label={'Log in'} />
                            <Button onClick={onCreateAccount} label={'Sign up'} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
