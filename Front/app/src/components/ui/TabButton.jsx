import PropTypes from 'prop-types';
import './TabButton.css';

/**
 * TabButton - 탭 네비게이션에서 사용되는 버튼 컴포넌트
 * 활성/비활성 상태를 시각적으로 표현하며, 탭 전환 기능을 제공합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.active - 현재 활성화된 탭인지 여부
 * @param {Function} props.onClick - 클릭 이벤트 핸들러
 * @param {React.ReactNode} props.children - 버튼에 표시될 내용 (탭 이름)
 * @param {boolean} props.disabled - 비활성화 상태 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
const TabButton = ({
    active = false,
    onClick,
    children,
    disabled = false,
    className = '',
    ...props
}) => {
    /**
     * 탭 버튼의 CSS 클래스를 상태에 따라 동적으로 생성
     * 활성/비활성/비활성화 상태를 클래스로 구분
     */
    const getTabClass = () => {
        const baseClass = 'tab-button';
        const activeClass = active ? 'tab-button--active' : '';
        const disabledClass = disabled ? 'tab-button--disabled' : '';

        return [baseClass, activeClass, disabledClass, className].filter(Boolean).join(' ');
    };

    return (
        <button className={getTabClass()} onClick={onClick} disabled={disabled} {...props}>
            {children}
        </button>
    );
};

TabButton.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

export default TabButton;
