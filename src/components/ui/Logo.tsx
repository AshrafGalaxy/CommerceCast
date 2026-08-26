import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Main folded ribbon - expanded to fill viewBox with minimal dead margins */}
      <path 
        d="M 12 50 L 32 20 L 68 80 L 88 50 L 68 20 L 32 80 Z" 
        stroke="url(#logo-grad-1)" 
        strokeWidth="15" 
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#logo-shadow)"
      />
      
      {/* Inner highlight ribbon (for 3D bevel effect) */}
      <path 
        d="M 12 50 L 32 20 L 68 80 L 88 50 L 68 20 L 32 80 Z" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* The Core (Solid Diamond) */}
      <polygon 
        points="50,24 74,50 50,76 26,50" 
        fill="url(#logo-grad-2)" 
        filter="url(#logo-shadow)"
      />
      {/* Diamond inner highlight */}
      <polygon 
        points="50,24 74,50 50,76 26,50" 
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Data Nodes */}
      <circle cx="32" cy="20" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="68" cy="80" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="88" cy="50" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="12" cy="50" r="3.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
