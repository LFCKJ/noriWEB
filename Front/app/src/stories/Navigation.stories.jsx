import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '../components';

export default {
    title: 'Layout/Navigation',
    component: Navigation,
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        user: null
    },
    argTypes: {
        user: {
            description: '로그인된 사용자 정보 (null이면 로그아웃 상태)'
        },
        onLogin: {
            action: 'login-clicked',
            description: '로그인 버튼 클릭 핸들러'
        },
        onLogout: {
            action: 'logout-clicked',
            description: '로그아웃 버튼 클릭 핸들러'
        },
        onCreateAccount: {
            action: 'create-account-clicked',
            description: '회원가입 버튼 클릭 핸들러'
        }
    }
};

// 로그아웃 상태 (기본)
export const LoggedOut = {};

// 로그인 상태
export const LoggedIn = {
    args: {
        user: {
            name: 'John Doe'
        }
    }
};

// 긴 이름을 가진 사용자
export const LongUserName = {
    args: {
        user: {
            name: 'Very Long User Name Example'
        }
    }
};

// 인터랙티브 네비게이션
export const Interactive = () => {
    const [user, setUser] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('Home');

    const handleLogin = () => {
        setUser({ name: 'Demo User' });
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleCreateAccount = () => {
        alert('회원가입 페이지로 이동');
    };

    return (
        <div>
            <Navigation
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onCreateAccount={handleCreateAccount}
            />

            <div
                style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    minHeight: '200px',
                    textAlign: 'center'
                }}>
                <h2>현재 페이지: {currentPage}</h2>
                <p>{user ? `${user.name}님, 안녕하세요!` : '로그인하세요'}</p>
                <p style={{ fontSize: '14px', color: '#666' }}>네비게이션 버튼들을 클릭해보세요</p>
            </div>
        </div>
    );
};

// 다크 테마 시뮬레이션
export const DarkTheme = {
    args: {
        user: {
            name: 'Dark Theme User'
        }
    },
    render: args => (
        <div style={{ background: '#333', minHeight: '100vh' }}>
            <Navigation {...args} />
            <div
                style={{
                    padding: '20px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                <h2>다크 테마 예시</h2>
                <p>다크 배경에서의 네비게이션 표시</p>
            </div>
        </div>
    )
};

// 모바일 뷰 시뮬레이션
export const MobileView = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: args => (
        <div style={{ maxWidth: '375px', margin: '0 auto' }}>
            <Navigation {...args} />
            <div
                style={{
                    padding: '16px',
                    background: '#f8f9fa',
                    textAlign: 'center'
                }}>
                <h3>모바일 뷰</h3>
                <p>작은 화면에서의 네비게이션</p>
            </div>
        </div>
    )
};
