// ui/Card.jsx
import React from 'react';
import { cn } from '../lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border',
        className
      )}
      {...props}
    />
  );
}
