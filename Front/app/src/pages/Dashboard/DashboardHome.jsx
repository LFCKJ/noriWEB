import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './DashboardHome.css';

/**
 * DashboardHome - 그룹 또는 개인 공간의 메인 대시보드 페이지
 *
 * 선택된 그룹이나 개인 공간의 개요 정보를 표시합니다:
 * - 그룹 정보 (프로젝트 수, 멤버 수, 작업 현황)
 * - 최근 활동 목록
 * - 빠른 액션 버튼들
 */
export default function DashboardHome() {
    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // 그룹별 임시 데이터 (추후 API로 대체)
        const mockGroupData = {
            1: {
                name: '프론트엔드 팀',
                projectCount: 8,
                memberCount: 12,
                completedTasks: 34,
                pendingTasks: 7
            },
            2: {
                name: '백엔드 팀',
                projectCount: 5,
                memberCount: 8,
                completedTasks: 28,
                pendingTasks: 12
            },
            3: {
                name: '디자인 팀',
                projectCount: 6,
                memberCount: 5,
                completedTasks: 19,
                pendingTasks: 4
            },
            4: {
                name: '프로젝트 관리',
                projectCount: 3,
                memberCount: 3,
                completedTasks: 15,
                pendingTasks: 8
            }
        };

        // 임시 활동 데이터
        const mockActivities = [
            { id: 1, user: '김개발', action: '새로운 컴포넌트를 추가했습니다', time: '2분 전' },
            {
                id: 2,
                user: '이디자인',
                action: 'UI 프로토타입을 업데이트했습니다',
                time: '15분 전'
            },
            { id: 3, user: '박매니저', action: '새로운 태스크를 생성했습니다', time: '1시간 전' },
            { id: 4, user: '최개발자', action: '버그를 수정했습니다', time: '3시간 전' }
        ];

        setGroupData(mockGroupData[groupId]);
        setRecentActivities(mockActivities);
    }, [groupId]);

    if (!groupData) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        <div className="dashboard-home">
            <div className="welcome-section">
                <h2>{groupData.name} 대시보드</h2>
                <p>팀의 현재 상황과 최근 활동을 확인하세요</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <h3>{groupData.projectCount}</h3>
                        <p>진행 중인 프로젝트</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>{groupData.memberCount}</h3>
                        <p>팀 멤버</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <h3>{groupData.completedTasks}</h3>
                        <p>완료된 작업</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <h3>{groupData.pendingTasks}</h3>
                        <p>대기 중인 작업</p>
                    </div>
                </div>
            </div>

            <div className="content-grid">
                <div className="activity-section">
                    <h3>최근 활동</h3>
                    <div className="activity-list">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className="activity-avatar">{activity.user.charAt(0)}</div>
                                <div className="activity-content">
                                    <p>
                                        <strong>{activity.user}</strong> {activity.action}
                                    </p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="quick-actions">
                    <h3>빠른 작업</h3>
                    <div className="action-buttons">
                        <button className="quick-btn">
                            <span>📝</span>새 태스크 생성
                        </button>
                        <button className="quick-btn">
                            <span>📁</span>
                            프로젝트 추가
                        </button>
                        <button className="quick-btn">
                            <span>👤</span>
                            멤버 초대
                        </button>
                        <button className="quick-btn">
                            <span>📊</span>
                            보고서 보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
