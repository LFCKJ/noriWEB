// ui/Select.jsx
import React, { useState } from 'react';
import { cn } from '../lib/utils';

export function Select({ value, onValueChange, children }) {
  // 그냥 children 안에서 쓰는 용도
  return <div>{React.Children.map(children, (child) =>
    React.cloneElement(child, { value, onValueChange })
  )}</div>;
}

export function SelectTrigger({ children, className, value, placeholder, onClick }) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-between rounded-md border bg-input-background px-3 py-2 text-sm',
        className
      )}
      onClick={onClick}
    >
      <span className="truncate">{value || placeholder}</span>
      <span className="ml-2 text-xs">▼</span>
    </button>
  );
}

export function SelectContent({ className, open, onClose, onValueChange, children }) {
  if (!open) return null;
  return (
    <div
      className={cn(
        'absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-md z-50',
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onClick: () => {
          if (child.props.value && onValueChange) onValueChange(child.props.value);
          onClose && onClose();
        }})
      )}
    </div>
  );
}

export function SelectItem({ value, children, onClick }) {
  return (
    <div
      className="cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-100"
      onClick={onClick}
      data-value={value}
    >
      {children}
    </div>
  );
}

export function SelectValue() {
  // Trigger에서 직접 value 표시해서 이 컴포넌트는 생략해도 됨
  return null;
}
