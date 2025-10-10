// Button.jsx
import styled from '@emotion/styled';

const Btn = styled.button`
    background-color: ${({ bgColor }) => bgColor || '#007bff'};
    color: ${({ color }) => (color ? color : '#fff')};
    border: none;
    border-radius: 4px;
    padding: ${({ size }) =>
        size === 'large' ? '12px 16px' : size === 'small' ? '6px 8px' : '8px 12px'};
    font-size: ${({ size }) => (size === 'large' ? '18px' : size === 'small' ? '12px' : '14px')};
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export const Button = ({ onClick, bgColor, color, size, label, ...props }) => (
    <Btn onClick={onClick} bgColor={bgColor} color={color} size={size} {...props}>
        {label}
    </Btn>
);
