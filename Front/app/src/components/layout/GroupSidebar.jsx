import PropTypes from 'prop-types';
import GroupItem from '../features/dashboard/GroupItem';
import './GroupSidebar.css';

/**
 * GroupSidebar - 대시보드 좌측 그룹 선택 사이드바 컴포넌트
 * Discord 스타일의 그룹 네비게이션을 제공합니다.
 * 개인 공간, 사용자 그룹들, 새 그룹 추가 버튼을 세로로 배열합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.groups - 사용자가 속한 그룹 목록 배열
 * @param {Object} props.selectedGroup - 현재 선택된 그룹 객체 (id가 'personal'이면 개인 공간)
 * @param {Function} props.onPersonalSelect - 개인 공간 클릭 시 호출되는 함수
 * @param {Function} props.onGroupSelect - 그룹 클릭 시 호출되는 함수 (그룹 객체를 인자로 받음)
 * @param {Function} props.onCreateGroup - 새 그룹 추가 버튼 클릭 시 호출되는 함수
 */
const GroupSidebar = ({
    groups,
    selectedGroup,
    onPersonalSelect,
    onGroupSelect,
    onCreateGroup
}) => {
    return (
        <aside className="group-sidebar" role="navigation" aria-label="그룹 선택">
            <div className="group-list">
                {/* 개인 공간 - 사용자 개인 작업 공간 */}
                <GroupItem
                    variant="personal"
                    active={selectedGroup?.id === 'personal'}
                    onClick={onPersonalSelect}
                />

                {/* 구분선 - 개인 공간과 그룹 공간 시각적 분리 */}
                <div className="group-separator" role="separator"></div>

                {/* 그룹 목록 - 사용자가 속한 모든 그룹들 */}
                {groups.map(group => (
                    <GroupItem
                        key={group.id}
                        group={group}
                        active={selectedGroup?.id === group.id}
                        onClick={() => onGroupSelect(group)}
                    />
                ))}

                {/* 새 그룹 추가 버튼 - 그룹 생성 UI 트리거 */}
                <GroupItem variant="add" onClick={onCreateGroup} aria-label="새 그룹 만들기" />
            </div>
        </aside>
    );
};

GroupSidebar.propTypes = {
    groups: PropTypes.array.isRequired,
    selectedGroup: PropTypes.object,
    onPersonalSelect: PropTypes.func.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
    onCreateGroup: PropTypes.func.isRequired
};

export default GroupSidebar;
