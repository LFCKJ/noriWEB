// ui/Badge.jsx
import React from 'react';
import { cn } from '../lib/utils';

export function Badge({ className, variant = 'default', ...props }) {
  let variantClass = '';
  switch (variant) {
    case 'secondary':
      variantClass = 'bg-secondary text-secondary-foreground';
      break;
    case 'destructive':
      variantClass = 'bg-red-500 text-white';
      break;
    case 'outline':
      variantClass = 'border text-foreground';
      break;
    default:
      variantClass = 'bg-primary text-primary-foreground';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium',
        variantClass,
        className
      )}
      {...props}
    />
  );
}
