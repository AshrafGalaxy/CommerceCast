'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Package, Zap, BarChart3, Globe, ShieldCheck,
  FileSpreadsheet, Webhook, RefreshCw, BadgePercent
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MASTERCLASS SVG GRAPHICS ---

const DashboardGraphic = () => (
  <svg className="absolute -top-4 -right-4 w-[18rem] h-[18rem] pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Delicate Grid */}
    <motion.g stroke="#3B82F6" strokeWidth="0.5" opacity="0.15" animate={{ y: [0, 10] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
      {[...Array(15)].map((_, i) => <path key={`h-${i}`} d={`M0 ${i * 15} H200`} />)}
      {[...Array(15)].map((_, i) => <path key={`v-${i}`} d={`M${i * 15} 0 V200`} />)}
    </motion.g>

    {/* Hover: Levitating Dashboard */}
    <motion.g
      initial={{ y: 20, opacity: 0.3, scale: 0.95 }}
      variants={{ hover: { y: -10, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
    >
      <rect x="20" y="30" width="160" height="110" rx="12" className="fill-background/90" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.3" filter="url(#glass-blur)" />
      
      {/* UI Elements */}
      <rect x="35" y="45" width="40" height="6" rx="3" fill="#3B82F6" opacity="0.6" />
      <rect x="135" y="45" width="30" height="6" rx="3" className="fill-muted-foreground" opacity="0.3" />

      {/* Spiking Smooth Spline Area Chart */}
      <motion.path 
        d="M 30 120 C 50 120, 60 100, 80 105 C 100 110, 110 60, 140 70 C 155 75, 160 40, 170 40 V 130 H 30 Z" 
        fill="url(#chart-grad)"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { delay: 0.3 } } }}
      />
      <motion.path 
        d="M 30 120 C 50 120, 60 100, 80 105 C 100 110, 110 60, 140 70 C 155 75, 160 40, 170 40" 
        stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        variants={{ hover: { pathLength: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
      />

      {/* Floating Data Point tracking the curve */}
      <motion.circle cx="140" cy="70" r="4" fill="#fff" style={{ filter: "drop-shadow(0 0 6px #3B82F6)" }}
        initial={{ opacity: 0, scale: 0 }}
        variants={{ hover: { opacity: 1, scale: 1, transition: { delay: 1, duration: 0.5, type: "spring" } } }}
      />
      <motion.circle cx="170" cy="40" r="5" fill="#3B82F6" stroke="#fff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #3B82F6)" }}
        initial={{ opacity: 0, scale: 0 }}
        variants={{ hover: { opacity: 1, scale: 1, transition: { delay: 1.2, duration: 0.5, type: "spring" } } }}
      />
    </motion.g>
  </svg>
);

const AlertsGraphic = () => (
  <svg className="absolute -top-2 -right-2 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <radialGradient id="alert-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Concentric Radar Grid */}
    {[30, 60, 90, 120].map((r, i) => (
      <circle key={i} cx="100" cy="100" r={r} stroke="#F59E0B" strokeWidth="1" opacity="0.15" />
    ))}
    <path d="M100 0 V200 M0 100 H200" stroke="#F59E0B" strokeWidth="1" opacity="0.1" />

    {/* Central Core & Bell */}
    <motion.circle cx="100" cy="100" r="25" fill="url(#alert-glow)" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <motion.g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
       animate={{ rotate: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }} style={{ transformOrigin: "100px 100px" }}>
      <path d="M100 85 C95 85 92 88 92 93 V105 C92 108 90 110 88 112 H112 C110 110 108 108 108 105 V93 C108 88 105 85 100 85 Z" />
      <path d="M97 115 C97 116.5 98.5 118 100 118 C101.5 118 103 116.5 103 115" />
    </motion.g>

    {/* Hover: Radar Sweep and Ripple Anomalies */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1, transition: { duration: 0.5 } } }}>
      {/* Radar Sweep Cone */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
        <path d="M100 100 L100 0 A100 100 0 0 1 200 100 Z" fill="url(#alert-glow)" opacity="0.5" />
      </motion.g>

      {/* Anomalies (Ripples) */}
      <motion.circle cx="130" cy="50" r="1" stroke="#EF4444" strokeWidth="2" animate={{ r: [1, 15], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="130" cy="50" r="4" fill="#EF4444" />
      
      <motion.circle cx="60" cy="140" r="1" stroke="#EF4444" strokeWidth="2" animate={{ r: [1, 20], opacity: [1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }} />
      <motion.circle cx="60" cy="140" r="5" fill="#EF4444" />
      
      <motion.circle cx="160" cy="130" r="1" stroke="#EF4444" strokeWidth="2" animate={{ r: [1, 12], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />
      <motion.circle cx="160" cy="130" r="3" fill="#EF4444" />
    </motion.g>
  </svg>
);

const APIGraphic = () => (
  <svg className="absolute -top-4 -right-4 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <filter id="api-glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Cubic Bezier Paths */}
    <path d="M 100 100 C 100 50, 40 50, 20 40" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.2" fill="none" />
    <path d="M 100 100 C 100 50, 160 50, 180 40" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.2" fill="none" />
    <path d="M 100 100 C 100 150, 40 150, 20 170" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.2" fill="none" />
    <path d="M 100 100 C 100 150, 160 150, 180 170" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.2" fill="none" />

    {/* Outer Nodes */}
    {[
      { cx: 20, cy: 40, delay: 0 }, { cx: 180, cy: 40, delay: 0.4 },
      { cx: 20, cy: 170, delay: 0.8 }, { cx: 180, cy: 170, delay: 1.2 }
    ].map((n, i) => (
      <motion.circle key={i} cx={n.cx} cy={n.cy} r="6" fill="#8B5CF6" opacity="0.6" animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: n.delay, ease: "easeInOut" }} />
    ))}

    {/* Hover: Data Surge using exact paths */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1, transition: { duration: 0.5 } } }}>
      {/* Central Core flare */}
      <motion.circle cx="100" cy="100" r="16" fill="#8B5CF6" filter="url(#api-glow)" animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      
      {/* Packets */}
      <motion.path d="M 100 100 C 100 50, 40 50, 20 40" stroke="#D8B4FE" strokeWidth="4" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="10 150" variants={{ hover: { strokeDashoffset: [160, 0], transition: { duration: 1.2, repeat: Infinity, ease: "linear" } } }} />
      <motion.path d="M 100 100 C 100 50, 160 50, 180 40" stroke="#D8B4FE" strokeWidth="4" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="10 150" variants={{ hover: { strokeDashoffset: [160, 0], transition: { duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 } } }} />
      <motion.path d="M 100 100 C 100 150, 40 150, 20 170" stroke="#D8B4FE" strokeWidth="4" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="10 150" variants={{ hover: { strokeDashoffset: [160, 0], transition: { duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.6 } } }} />
      <motion.path d="M 100 100 C 100 150, 160 150, 180 170" stroke="#D8B4FE" strokeWidth="4" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="10 150" variants={{ hover: { strokeDashoffset: [160, 0], transition: { duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.9 } } }} />
    </motion.g>

    {/* Static Central Core */}
    <circle cx="100" cy="100" r="15" className="fill-background" stroke="#8B5CF6" strokeWidth="3" />
    <circle cx="100" cy="100" r="6" fill="#8B5CF6" />
  </svg>
);

const PromoGraphic = () => (
  <svg className="absolute -top-4 -right-4 w-64 h-64 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="promo-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
      <filter id="promo-glow">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Smooth Baseline */}
    <path d="M20 150 C 60 150, 80 145, 100 145 C 140 145, 160 150, 180 150" stroke="#10B981" strokeWidth="2" opacity="0.3" fill="none" />

    {/* Hover: Massive Spline Spike */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      
      {/* Floating Badge */}
      <motion.g variants={{ hover: { y: [-30, 0], opacity: [0, 1], transition: { type: "spring", stiffness: 120, damping: 14 } } }}>
        <rect x="85" y="30" width="50" height="20" rx="6" className="fill-background" stroke="#10B981" strokeWidth="1.5" style={{ filter: "drop-shadow(0 4px 6px rgba(16,185,129,0.2))" }} />
        <text x="110" y="44" fill="#10B981" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="1">PROMO</text>
        <line x1="110" y1="50" x2="110" y2="70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      </motion.g>

      {/* Area Graph */}
      <motion.path 
        d="M20 150 C 60 150, 70 140, 90 100 C 110 50, 130 50, 150 90 C 160 120, 170 145, 180 150 V 180 H 20 Z" 
        fill="url(#promo-grad)"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } }}
      />
      <motion.path 
        d="M20 150 C 60 150, 70 140, 90 100 C 110 50, 130 50, 150 90 C 160 120, 170 145, 180 150" 
        stroke="#10B981" strokeWidth="3" filter="url(#promo-glow)" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        variants={{ hover: { pathLength: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
      />

      {/* Floating Particles */}
      {[1, 2, 3].map((i) => (
        <motion.text key={i} x={95 + i*15} y="40" fill="#34D399" fontSize="12" fontWeight="bold" opacity="0" style={{ filter: "drop-shadow(0 2px 4px rgba(52,211,153,0.5))" }}
          variants={{ hover: { opacity: [0, 1, 0], y: -25, transition: { duration: 2, repeat: Infinity, delay: 0.6 + i*0.3, ease: "easeOut" } } }}
        >&#8593;</motion.text>
      ))}
    </motion.g>
  </svg>
);

const SecurityGraphic = () => (
  <svg className="absolute -top-2 -right-2 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    {/* Concentric Precision Rings */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
      <circle cx="100" cy="100" r="55" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.4" fill="none" />
      <circle cx="100" cy="100" r="55" stroke="#64748B" strokeWidth="3" strokeDasharray="1 30" opacity="0.6" fill="none" />
    </motion.g>
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
      <circle cx="100" cy="100" r="70" stroke="#64748B" strokeWidth="1" strokeDasharray="10 15" opacity="0.3" fill="none" />
      <circle cx="100" cy="100" r="70" stroke="#64748B" strokeWidth="4" strokeDasharray="2 80" opacity="0.5" fill="none" />
    </motion.g>

    {/* Perfect Shield Geometry */}
    <path d="M 100 40 L 140 55 V 100 C 140 130, 120 155, 100 170 C 80 155, 60 130, 60 100 V 55 Z" stroke="#64748B" strokeWidth="2" opacity="0.2" fill="none" />

    {/* Hover: Laser Sweep and Lock Assembly */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1, transition: { duration: 0.4 } } }}>
      <motion.path 
        d="M 100 40 L 140 55 V 100 C 140 130, 120 155, 100 170 C 80 155, 60 130, 60 100 V 55 Z" 
        stroke="#cbd5e1" strokeWidth="3" fill="rgba(100,116,139,0.1)"
        initial={{ pathLength: 0 }}
        variants={{ hover: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }}
      />
      
      {/* Laser Scanner */}
      <motion.rect x="50" y="40" width="100" height="2" fill="#3B82F6" style={{ filter: "drop-shadow(0 0 10px #3B82F6)" }}
        initial={{ y: 0, opacity: 0 }}
        variants={{ hover: { y: [0, 130, 0], opacity: [0, 1, 1, 0], transition: { duration: 2.5, repeat: Infinity, delay: 1, ease: "easeInOut" } } }}
      />

      {/* Lock Core */}
      <motion.g variants={{ hover: { scale: [0.5, 1], opacity: [0, 1], transition: { delay: 0.5, type: "spring", bounce: 0.6 } } }}>
        <rect x="85" y="90" width="30" height="24" rx="4" className="fill-background" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 90 90 V 80 A 10 10 0 0 1 110 80 V 90" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        <circle cx="100" cy="102" r="3" fill="#cbd5e1" />
      </motion.g>
    </motion.g>
  </svg>
);

const ExportsGraphic = () => (
  <svg className="absolute -top-2 -right-2 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    {/* Chaos sorting */}
    <motion.g initial={{ opacity: 1 }} variants={{ hover: { opacity: 0, transition: { duration: 0.3 } } }}>
      {[
        {x: 40, y: 60, r: 15}, {x: 130, y: 50, r: -20}, {x: 50, y: 140, r: 45}, {x: 150, y: 120, r: -10}, {x: 90, y: 80, r: 30}
      ].map((p, i) => (
        <motion.rect key={i} x={p.x} y={p.y} width="24" height="12" rx="3" fill="#EC4899" opacity="0.3" 
          animate={{ y: [p.y, p.y - 15, p.y], x: [p.x, p.x + 10, p.x], rotate: [p.r, p.r + 10, p.r] }} 
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} 
        />
      ))}
    </motion.g>

    {/* Hover: Pristine Matrix and Download */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      {/* Spreadsheet Grid */}
      <g stroke="#EC4899" strokeWidth="1.5" opacity="0.3" fill="none">
        <rect x="50" y="50" width="100" height="90" rx="6" />
        <path d="M50 75 H150 M50 100 H150 M50 125 H150" strokeWidth="1" />
        <path d="M83 50 V140 M116 50 V140" strokeWidth="1" />
      </g>
      
      {/* Graceful Snapping Data Blocks */}
      {[0, 1, 2].map((row) => (
        <motion.g key={row} initial={{ y: -30, opacity: 0 }} variants={{ hover: { y: 0, opacity: 1, transition: { delay: 0.2 + row * 0.15, type: "spring", stiffness: 100 } } }}>
          <rect x="54" y={54 + row*25} width="25" height="17" rx="3" fill="#EC4899" opacity="0.8" />
          <rect x="87" y={54 + row*25} width="25" height="17" rx="3" fill="#EC4899" opacity="0.5" />
          <rect x="120" y={54 + row*25} width="26" height="17" rx="3" fill="#EC4899" opacity="0.3" />
        </motion.g>
      ))}

      {/* Floating Download Icon */}
      <motion.g initial={{ y: -40, opacity: 0 }} variants={{ hover: { y: 0, opacity: 1, transition: { delay: 0.8, type: "spring", bounce: 0.5 } } }}>
        <circle cx="100" cy="95" r="28" className="fill-background" stroke="#EC4899" strokeWidth="2" style={{ filter: "drop-shadow(0 4px 12px rgba(236,72,153,0.4))" }} />
        <path d="M100 80 V105 M88 95 L100 105 L112 95" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M88 112 H112" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </motion.g>
  </svg>
);

const SVGs: Record<string, React.FC> = {
  dashboard: DashboardGraphic,
  alerts: AlertsGraphic,
  api: APIGraphic,
  promo: PromoGraphic,
  compliance: SecurityGraphic,
  exports: ExportsGraphic,
};

// --- DATA ---

const cards = [
  {
    id: 'dashboard',
    icon: BarChart3,
    title: 'Unified dashboard',
    desc: 'Every KPI your ops team needs — forecasts, inventory health, and promo performance — in one clean view.',
    size: 'large',
    iconColor: 'text-blue-500',
  },
  {
    id: 'alerts',
    icon: RefreshCw,
    title: 'Smart alerts',
    desc: 'Get notified before stockouts happen, not after.',
    size: 'small',
    iconColor: 'text-amber-500',
  },
  {
    id: 'api',
    icon: Webhook,
    title: 'REST API & webhooks',
    desc: 'Plug CommerceCast into your stack via our OpenAPI-compliant REST API.',
    size: 'small',
    iconColor: 'text-violet-500',
  },
  {
    id: 'promo',
    icon: BadgePercent,
    title: 'Promotion intelligence',
    desc: 'Plan margin-safe promotions. See exactly how discounts impact your bottom line before you launch.',
    size: 'small',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Bank-grade security',
    desc: 'SOC 2 Type II certified. Enterprise-grade encryption out of the box. Your data is yours.',
    size: 'small',
    iconColor: 'text-slate-400',
  },
  {
    id: 'exports',
    icon: FileSpreadsheet,
    title: 'Custom exports',
    desc: 'Export your forecasts to CSV, Excel, or connect directly to your BI tools.',
    size: 'small',
    iconColor: 'text-pink-500',
  },
] as const;

type CardSize = 'large' | 'medium' | 'small';

const sizeClasses: Record<CardSize, string> = {
  large: 'md:col-span-2 md:row-span-2',
  medium: 'md:col-span-2',
  small: 'md:col-span-1',
};

// --- BENTO CARD COMPONENT (With Mouse Spotlight) ---

function BentoCard({ card, index }: { card: (typeof cards)[number], index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Graphic = SVGs[card.id];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      whileHover="hover"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay: index * 0.07 } },
        hover: { y: -3, transition: { duration: 0.2 } }
      }}
      className={cn(
        `group relative flex flex-col justify-start p-8 rounded-2xl border border-border/80 bg-card text-card-foreground overflow-hidden cursor-default transition-shadow hover:shadow-lg hover:border-border`,
        sizeClasses[card.size as CardSize]
      )}
    >
      {/* 1. Mouse Spotlight Glow */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04), transparent 40%)`
        }}
      />

      {/* 2. Glassmorphic Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* 3. Feature SVG Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Graphic && <Graphic />}
      </div>

      {/* 4. Content (Top Left aligned, limited width to not overlap SVGs) */}
      <div className="relative z-20 pointer-events-none max-w-[60%]">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background border border-border/40 mb-4 group-hover:scale-110 group-hover:bg-muted/50 transition-all duration-300 shadow-sm`}>
          <card.icon className={`w-5 h-5 ${card.iconColor} drop-shadow-sm`} />
        </div>
        <h3 className="text-lg font-bold font-headline mb-2 text-foreground transition-colors drop-shadow-sm">{card.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed drop-shadow-sm">{card.desc}</p>
      </div>
    </motion.div>
  );
}

// --- MAIN GRID COMPONENT ---

export function BentoGrid() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-10"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-5">
            Everything included
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-headline leading-[1.06]">
            The full picture, in one place
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[320px] relative z-10">
          {cards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
