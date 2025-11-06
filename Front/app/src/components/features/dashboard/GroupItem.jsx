import PropTypes from 'prop-types';
import Avatar from '../../ui/Avatar';
import './GroupItem.css';

/**
 * GroupItem - 대시보드 사이드바에서 그룹을 표시하는 컴포넌트
 * 개인 공간, 일반 그룹, 새 그룹 추가 버튼의 세 가지 형태를 지원합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.group - 그룹 데이터 (name, image 포함)
 * @param {boolean} props.active - 현재 선택된 그룹인지 여부
 * @param {Function} props.onClick - 클릭 시 실행될 함수
 * @param {string} props.variant - 표시 형태 ('default' | 'personal' | 'add')
 */
const GroupItem = ({ group, active = false, onClick, variant = 'default' }) => {
    /**
     * CSS 클래스명을 생성하는 함수
     * BEM 방식을 사용하여 기본 클래스 + 상태별 클래스 조합
     */
    const getGroupItemClass = () => {
        const baseClass = 'group-item';
        const activeClass = active ? 'group-item--active' : '';
        const variantClass = `group-item--${variant}`;

        return [baseClass, activeClass, variantClass].filter(Boolean).join(' ');
    };

    /**
     * Avatar 컴포넌트에 전달할 variant 결정
     * GroupItem의 variant에 따라 Avatar 스타일 변경
     */
    const getAvatarVariant = () => {
        if (variant === 'personal') return 'personal';
        if (variant === 'add') return 'add';
        return 'default';
    };

    /**
     * Avatar에 표시할 내용 결정
     * - personal: 개인 공간 아이콘 (👤)
     * - add: 추가 버튼 (+)
     * - default: 그룹 이름의 첫 글자
     */
    const getAvatarContent = () => {
        if (variant === 'personal') return '👤';
        if (variant === 'add') return '+';
        return group?.name;
    };

    return (
        <div
            className={getGroupItemClass()}
            onClick={onClick}
            title={group?.name || (variant === 'personal' ? '개인 공간' : '새 그룹 만들기')}>
            <Avatar name={getAvatarContent()} image={group?.image} variant={getAvatarVariant()} />
        </div>
    );
};

GroupItem.propTypes = {
    group: PropTypes.object,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['default', 'personal', 'add'])
};

export default GroupItem;
