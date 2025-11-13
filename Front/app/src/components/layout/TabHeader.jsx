import PropTypes from 'prop-types';
import TabNavigation from '../features/dashboard/TabNavigation';
import './TabHeader.css';

/**
 * TabHeader - 대시보드 상단 탭 헤더 컴포넌트
 * 현재 선택된 그룹의 이름과 해당 그룹에서 사용 가능한 탭들을 표시합니다.
 * 좌측에는 그룹명, 우측에는 탭 네비게이션이 배치됩니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.selectedGroup - 현재 선택된 그룹 객체 (name 필드 필수)
 * @param {Array} props.tabs - 현재 그룹에서 사용 가능한 탭 목록
 * @param {Function} props.onTabClick - 탭 클릭 시 호출되는 함수
 * @param {Function} props.isActiveTab - 탭 활성 상태 판별 함수
 */
const TabHeader = ({ selectedGroup, tabs, onTabClick, isActiveTab }) => {
    // 선택된 그룹이 없으면 헤더를 표시하지 않음
    if (!selectedGroup) return null;

    return (
        <header className="dashboard-header">
            {/* 좌측: 현재 그룹명 표시 */}
            <div className="header-left">
                <h3 className="group-name">{selectedGroup.name}</h3>
            </div>
            {/* 우측: 탭 네비게이션 */}
            <div className="header-right">
                <TabNavigation tabs={tabs} onTabClick={onTabClick} isActiveTab={isActiveTab} />
            </div>
        </header>
    );
};

TabHeader.propTypes = {
    selectedGroup: PropTypes.object,
    tabs: PropTypes.array.isRequired,
    onTabClick: PropTypes.func.isRequired,
    isActiveTab: PropTypes.func.isRequired
};

export default TabHeader;
