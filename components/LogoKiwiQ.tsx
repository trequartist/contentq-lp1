import React from 'react';

export interface LogoKiwiQProps {
  className?: string;
  title?: string;
}

export default function LogoKiwiQ({ className, title = 'KiwiQ.AI' }: LogoKiwiQProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diamond frame composed of four rounded stroke segments */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Top-right (white) */}
        <path d="M70 10 L130 70" stroke="#FFFFFF" strokeWidth="22" />
        {/* Bottom-left (white) */}
        <path d="M70 130 L10 70" stroke="#FFFFFF" strokeWidth="22" />
        {/* Top-left (kiwi) */}
        <path d="M10 70 L70 10" stroke="#94D82D" strokeWidth="22" />
        {/* Bottom-right (kiwi) */}
        <path d="M70 130 L130 70" stroke="#94D82D" strokeWidth="22" />
      </g>

      {/* Inner Q mark */}
      <g stroke="#94D82D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="70" cy="70" r="18" fill="none" />
        <path d="M84 84 L92 92" />
      </g>
    </svg>
  );
} 