import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import GroupSidebar from './GroupSidebar';
import TabHeader from './TabHeader';
import './DashboardLayout.css';

/**
 * DashboardLayout - 대시보드 메인 레이아웃 컴포넌트 - 디스코드 레이아웃 참조
 * 좌측 그룹 사이드바와 상단 탭 헤더로 구성된 2단계 네비게이션 구조를 제공합니다.
 * React Router의 Outlet을 통해 하위 라우트 콘텐츠를 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.groups - 사용자가 속한 그룹 목록
 * @param {Object|string} props.selectedGroup - 현재 선택된 그룹 ('personal' 또는 그룹 객체)
 * @param {Array} props.tabs - 현재 그룹에서 사용 가능한 탭 목록
 * @param {Function} props.onPersonalSelect - 개인 공간 선택 시 호출되는 함수
 * @param {Function} props.onGroupSelect - 그룹 선택 시 호출되는 함수 (그룹 객체를 인자로 받음)
 * @param {Function} props.onCreateGroup - 새 그룹 생성 버튼 클릭 시 호출되는 함수
 * @param {Function} props.onTabClick - 탭 클릭 시 호출되는 함수 (탭 객체를 인자로 받음)
 * @param {Function} props.isActiveTab - 탭 활성 상태 판별 함수 (탭 객체를 받아 boolean 반환)
 */
const DashboardLayout = ({
    groups,
    selectedGroup,
    tabs,
    onPersonalSelect,
    onGroupSelect,
    onCreateGroup,
    onTabClick,
    isActiveTab
}) => {
    return (
        <div className="dashboard-container">
            <GroupSidebar
                groups={groups}
                selectedGroup={selectedGroup}
                onPersonalSelect={onPersonalSelect}
                onGroupSelect={onGroupSelect}
                onCreateGroup={onCreateGroup}
            />

            <main className="dashboard-main">
                {selectedGroup ? (
                    <>
                        <TabHeader
                            selectedGroup={selectedGroup}
                            tabs={tabs}
                            onTabClick={onTabClick}
                            isActiveTab={isActiveTab}
                        />
                        <section className="dashboard-content">
                            <Outlet />
                        </section>
                    </>
                ) : (
                    <div className="no-group-selected">
                        <Outlet />
                    </div>
                )}
            </main>
        </div>
    );
};

DashboardLayout.propTypes = {
    groups: PropTypes.array.isRequired,
    selectedGroup: PropTypes.object,
    tabs: PropTypes.array.isRequired,
    onPersonalSelect: PropTypes.func.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
    onCreateGroup: PropTypes.func.isRequired,
    onTabClick: PropTypes.func.isRequired,
    isActiveTab: PropTypes.func.isRequired
};

export default DashboardLayout;
