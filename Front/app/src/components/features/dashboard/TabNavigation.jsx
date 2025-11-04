import PropTypes from 'prop-types';
import TabButton from '../../ui/TabButton';
import './TabNavigation.css';

/**
 * TabNavigation - 탭 목록을 표시하고 탭 전환 기능을 제공하는 네비게이션 컴포넌트
 * 그룹 내 다양한 기능(채팅, 파일, 멤버 등) 간 전환을 위한 탭 UI를 구성합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.tabs - 탭 목록 배열 (각 탭은 id, name 필드를 가져야 함)
 * @param {Function} props.onTabClick - 탭 클릭 시 호출되는 함수 (선택된 탭 객체를 인자로 받음)
 * @param {Function} props.isActiveTab - 탭이 활성화되었는지 판별하는 함수 (탭 객체를 받아 boolean 반환)
 */
const TabNavigation = ({ tabs, onTabClick, isActiveTab }) => {
    return (
        <nav className="tab-navigation" role="tablist" aria-label="그룹 기능 탭">
            {tabs.map(tab => (
                <TabButton
                    key={tab.id}
                    active={isActiveTab(tab)}
                    onClick={() => onTabClick(tab)}
                    role="tab"
                    aria-selected={isActiveTab(tab)}
                    aria-controls={`tabpanel-${tab.id}`}>
                    {tab.name}
                </TabButton>
            ))}
        </nav>
    );
};

TabNavigation.propTypes = {
    tabs: PropTypes.array.isRequired,
    onTabClick: PropTypes.func.isRequired,
    isActiveTab: PropTypes.func.isRequired
};

export default TabNavigation;
