import PropTypes from 'prop-types';
import './Avatar.css';

/**
 * Avatar - 사용자 프로필 아바타 컴포넌트
 * 이미지가 있으면 이미지를 표시하고, 없으면 이름의 첫 글자를 표시합니다.
 * 크기와 스타일 변형을 지원하며, 클릭 가능하게 만들 수도 있습니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.name - 사용자 이름 (이니셜 생성용)
 * @param {string} props.image - 프로필 이미지 URL
 * @param {string} props.size - 크기 ('small' | 'medium' | 'large' | 'xlarge')
 * @param {string} props.variant - 스타일 변형 ('default' | 'personal' | 'add')
 * @param {Function} props.onClick - 클릭 핸들러 (있으면 클릭 가능해짐)
 * @param {string} props.className - 추가 CSS 클래스
 */
const Avatar = ({
    name,
    image,
    size = 'medium',
    variant = 'default',
    onClick,
    className = '',
    ...props
}) => {
    /**
     * Avatar의 CSS 클래스를 조합하여 반환
     * 크기, 변형, 클릭 가능 여부에 따라 클래스 결정
     */
    const getAvatarClass = () => {
        const baseClass = 'avatar';
        const sizeClass = `avatar--${size}`;
        const variantClass = `avatar--${variant}`;
        const clickableClass = onClick ? 'avatar--clickable' : '';

        return [baseClass, sizeClass, variantClass, clickableClass, className]
            .filter(Boolean)
            .join(' ');
    };

    /**
     * 이름에서 첫 글자를 추출하여 이니셜 생성
     * 이름이 없으면 '?' 반환
     */
    const getInitials = name => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    /**
     * 아바타 크기에 따른 폰트 사이즈 결정
     * 이니셜이 아바타 크기에 맞게 표시되도록 조정
     */
    const getFontSize = () => {
        switch (size) {
            case 'small':
                return '12px';
            case 'large':
                return '20px';
            case 'xlarge':
                return '24px';
            default:
                return '16px';
        }
    };

    return (
        <div
            className={getAvatarClass()}
            onClick={onClick}
            style={{ fontSize: getFontSize() }}
            title={name}
            {...props}>
            {image ? (
                <img src={image} alt={name} className="avatar__image" />
            ) : (
                <span className="avatar__initials">{getInitials(name)}</span>
            )}
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    variant: PropTypes.oneOf(['default', 'personal', 'add']),
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Avatar;
