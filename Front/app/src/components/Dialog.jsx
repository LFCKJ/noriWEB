// components/Dialog.jsx
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`;

const DialogContainer = styled(motion.div)`
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: ${({ width }) => width || '400px'};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    &:hover {
        color: #000;
    }
`;

export const Dialog = ({ open, onClose, title, children, width }) => {
    useEffect(() => {
        const handleKey = e => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}>
                    <DialogContainer
                        width={width}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        onClick={e => e.stopPropagation()}>
                        {title && <h2>{title}</h2>}
                        <CloseButton onClick={onClose}>×</CloseButton>
                        <div>{children}</div>
                    </DialogContainer>
                </Overlay>
            )}
        </AnimatePresence>
    );
};
