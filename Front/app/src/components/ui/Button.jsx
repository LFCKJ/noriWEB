import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button - 범용 버튼 컴포넌트
 * 다양한 스타일 변형(variant)과 크기(size)를 지원하는 재사용 가능한 버튼입니다.
 * 표준 HTML button 요소를 기반으로 하여 접근성과 확장성을 보장합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.variant - 버튼 스타일 ('default' | 'primary' | 'secondary' | 'danger' | 'ghost')
 * @param {string} props.size - 버튼 크기 ('small' | 'medium' | 'large')
 * @param {Function} props.onClick - 클릭 이벤트 핸들러
 * @param {React.ReactNode} props.children - 버튼에 표시될 내용 (텍스트, 아이콘 등)
 * @param {boolean} props.disabled - 버튼 비활성화 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
const Button = ({
    variant = 'default',
    size = 'medium',
    onClick,
    children,
    disabled = false,
    className = '',
    ...props
}) => {
    /**
     * 버튼의 CSS 클래스를 동적으로 생성
     * BEM 방식을 사용하여 스타일, 크기, 상태별 클래스 조합
     */
    const getButtonClass = () => {
        const baseClass = 'btn';
        const variantClass = `btn--${variant}`;
        const sizeClass = `btn--${size}`;
        const disabledClass = disabled ? 'btn--disabled' : '';

        return [baseClass, variantClass, sizeClass, disabledClass, className]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <button className={getButtonClass()} onClick={onClick} disabled={disabled} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger', 'ghost']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
