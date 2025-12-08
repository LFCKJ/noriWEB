// ui/Popover.jsx
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export function Popover({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function PopoverTrigger({ children, onClick, ...props }) {
  return React.cloneElement(children, {
    ...props,
    onClick: (e) => {
      if (children.props.onClick) children.props.onClick(e);
      if (onClick) onClick(e);
    },
  });
}

export function PopoverContent({ className, open, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute right-0 mt-2 z-50 w-80 rounded-md border bg-white shadow-md p-4',
        className
      )}
    >
      {children}
    </div>
  );
}
