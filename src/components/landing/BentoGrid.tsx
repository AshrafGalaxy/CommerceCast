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
  <svg className="absolute -bottom-10 -right-10 w-80 h-80 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
        <feBlend in="SourceGraphic" in2="glow" />
      </filter>
      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Continuous Background Grid */}
    <motion.g stroke="#3B82F6" strokeWidth="0.5" opacity="0.15" animate={{ x: [-20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
      {[...Array(12)].map((_, i) => (
        <path key={`v-${i}`} d={`M${i * 20} 0 V200`} />
      ))}
      {[...Array(12)].map((_, i) => (
        <path key={`h-${i}`} d={`M0 ${i * 20} H200`} />
      ))}
    </motion.g>

    {/* Hover: Levitating Dashboard */}
    <motion.g
      initial={{ y: 20, opacity: 0.3, scale: 0.95 }}
      variants={{ hover: { y: -10, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } } }}
    >
      {/* Glass Pane */}
      <rect x="20" y="30" width="160" height="110" rx="8" fill="rgba(15, 23, 42, 0.7)" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" filter="url(#glass-blur)" />
      
      {/* Header */}
      <rect x="30" y="40" width="40" height="6" rx="3" fill="#3B82F6" opacity="0.5" />
      <rect x="140" y="40" width="30" height="6" rx="3" fill="#94A3B8" opacity="0.3" />

      {/* Spiking Area Chart */}
      <motion.path 
        d="M 30 120 L 50 110 L 80 115 L 110 70 L 140 80 L 170 40 V 130 H 30 Z" 
        fill="url(#chart-grad)"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { delay: 0.2 } } }}
      />
      <motion.path 
        d="M 30 120 L 50 110 L 80 115 L 110 70 L 140 80 L 170 40" 
        stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        variants={{ hover: { pathLength: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
      />

      {/* Data stream dots */}
      <motion.circle cx="170" cy="40" r="4" fill="#fff" filter="url(#glass-blur)"
        initial={{ opacity: 0, scale: 0 }}
        variants={{ hover: { opacity: [0, 1, 0.5], scale: [0, 1.5, 1], transition: { delay: 0.8, duration: 0.5 } } }}
      />
      <motion.circle cx="110" cy="70" r="3" fill="#fff" filter="url(#glass-blur)"
        initial={{ opacity: 0, scale: 0 }}
        variants={{ hover: { opacity: [0, 1, 0.5], scale: [0, 1.5, 1], transition: { delay: 0.5, duration: 0.5 } } }}
      />
    </motion.g>
  </svg>
);

const AlertsGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <radialGradient id="alert-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Continuous breathing center */}
    <motion.circle cx="100" cy="100" r="30" fill="url(#alert-glow)" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Bell Icon in center */}
    <motion.g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
       animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }} style={{ transformOrigin: "100px 100px" }}>
      <path d="M100 85 C95 85 92 88 92 93 V105 C92 108 90 110 88 112 H112 C110 110 108 108 108 105 V93 C108 88 105 85 100 85 Z" />
      <path d="M97 115 C97 116.5 98.5 118 100 118 C101.5 118 103 116.5 103 115" />
    </motion.g>

    {/* Radar Grid */}
    <circle cx="100" cy="100" r="40" stroke="#F59E0B" strokeWidth="1" opacity="0.15" />
    <circle cx="100" cy="100" r="80" stroke="#F59E0B" strokeWidth="1" opacity="0.15" />
    <path d="M100 20 V180 M20 100 H180" stroke="#F59E0B" strokeWidth="1" opacity="0.1" />

    {/* Hover: Radar Sweep and Hidden Anomalies */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1, transition: { duration: 0.3 } } }}>
      {/* Radar Sweep Cone */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
        <path d="M100 100 L100 20 A80 80 0 0 1 180 100 Z" fill="url(#alert-glow)" opacity="0.6" />
      </motion.g>

      {/* Hidden Anomalies (Illuminated by sweep) with trailing pulse */}
      <motion.circle cx="130" cy="60" r="4" fill="#EF4444" animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.25 }} />
      <motion.circle cx="60" cy="120" r="5" fill="#EF4444" animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.25 }} />
      <motion.circle cx="150" cy="130" r="3" fill="#EF4444" animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.75 }} />
    </motion.g>
  </svg>
);

const APIGraphic = () => (
  <svg className="absolute -bottom-8 -right-8 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <filter id="api-glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Paths */}
    <path id="n1" d="M 20 50 C 60 50, 60 100, 100 100" stroke="#8B5CF6" strokeWidth="1" opacity="0.2" fill="none" />
    <path id="n2" d="M 180 40 C 140 40, 140 100, 100 100" stroke="#8B5CF6" strokeWidth="1" opacity="0.2" fill="none" />
    <path id="n3" d="M 40 170 C 60 130, 80 100, 100 100" stroke="#8B5CF6" strokeWidth="1" opacity="0.2" fill="none" />
    <path id="n4" d="M 170 160 C 130 160, 130 100, 100 100" stroke="#8B5CF6" strokeWidth="1" opacity="0.2" fill="none" />

    {/* Continuous Pulsing Outer Nodes */}
    {[
      { cx: 20, cy: 50, delay: 0 }, { cx: 180, cy: 40, delay: 0.5 },
      { cx: 40, cy: 170, delay: 1 }, { cx: 170, cy: 160, delay: 1.5 }
    ].map((n, i) => (
      <motion.circle key={i} cx={n.cx} cy={n.cy} r="4" fill="#8B5CF6" opacity="0.5" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: n.delay }} />
    ))}

    {/* Hover: Data Surge */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      {/* Central Core flare */}
      <motion.circle cx="100" cy="100" r="12" fill="#8B5CF6" filter="url(#api-glow)" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
      
      {/* Rapid Packets using dash trick */}
      <motion.path d="M 20 50 C 60 50, 60 100, 100 100" stroke="#D8B4FE" strokeWidth="3" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="5 150" variants={{ hover: { strokeDashoffset: [155, 0], transition: { duration: 1, repeat: Infinity, ease: "linear" } } }} />
      <motion.path d="M 180 40 C 140 40, 140 100, 100 100" stroke="#D8B4FE" strokeWidth="3" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="5 150" variants={{ hover: { strokeDashoffset: [155, 0], transition: { duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 } } }} />
      <motion.path d="M 40 170 C 60 130, 80 100, 100 100" stroke="#D8B4FE" strokeWidth="3" strokeLinecap="round" filter="url(#api-glow)" fill="none" strokeDasharray="5 150" variants={{ hover: { strokeDashoffset: [155, 0], transition: { duration: 0.9, repeat: Infinity, ease: "linear", delay: 0.6 } } }} />
    </motion.g>

    {/* Static Central Core */}
    <circle cx="100" cy="100" r="15" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" fill="none" />
  </svg>
);

const PromoGraphic = () => (
  <svg className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none" viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="promo-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
      <filter id="promo-glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Grid */}
    <path d="M30 140 H170 M30 100 H170 M30 60 H170" stroke="#10B981" strokeWidth="1" opacity="0.1" strokeDasharray="4 4" fill="none" />
    
    {/* Continuous Baseline */}
    <motion.path d="M30 130 L60 120 L90 125 L120 115 L150 120 L170 125" stroke="#10B981" strokeWidth="2" opacity="0.3" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} fill="none" />

    {/* Hover: Massive Spike */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      {/* Promo Badge dropping in */}
      <motion.g variants={{ hover: { y: [-20, 0], opacity: [0, 1], transition: { type: "spring", bounce: 0.5 } } }}>
        <rect x="90" y="30" width="40" height="16" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#10B981" strokeWidth="1" />
        <text x="110" y="41" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">PROMO</text>
        <line x1="110" y1="46" x2="110" y2="60" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
      </motion.g>

      {/* Spiking Graph Path */}
      <motion.path 
        d="M30 130 L60 120 L90 125 L110 50 L130 90 L150 70 L170 90" 
        stroke="#10B981" strokeWidth="3" filter="url(#promo-glow)" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        variants={{ hover: { pathLength: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } } }}
      />
      {/* Spiking Graph Area */}
      <motion.path 
        d="M30 130 L60 120 L90 125 L110 50 L130 90 L150 70 L170 90 V150 H30 Z" 
        fill="url(#promo-grad)"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { duration: 0.4, delay: 0.6 } } }}
      />

      {/* Floating Profit Particles */}
      {[1, 2, 3].map((i) => (
        <motion.text key={i} x={100 + i*15} y="40" fill="#34D399" fontSize="10" fontWeight="bold"
          initial={{ opacity: 0, y: 0 }}
          variants={{ hover: { opacity: [0, 1, 0], y: -20, transition: { duration: 1.5, repeat: Infinity, delay: 0.5 + i*0.2 } } }}
        >$</motion.text>
      ))}
    </motion.g>
  </svg>
);

const SecurityGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    {/* Continuous Rotating Rings */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
      <circle cx="100" cy="100" r="50" stroke="#64748B" strokeWidth="1" strokeDasharray="5 15" opacity="0.3" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="#64748B" strokeWidth="2" strokeDasharray="1 40" opacity="0.5" fill="none" />
    </motion.g>
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px" }}>
      <circle cx="100" cy="100" r="65" stroke="#64748B" strokeWidth="1" strokeDasharray="10 10" opacity="0.2" fill="none" />
      <circle cx="100" cy="100" r="65" stroke="#64748B" strokeWidth="3" strokeDasharray="2 60" opacity="0.4" fill="none" />
    </motion.g>

    {/* Hover: Padlock Assembly and Laser */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      {/* Assembling Padlock */}
      <motion.g variants={{ hover: { scale: [0.5, 1], opacity: [0, 1], transition: { type: "spring", bounce: 0.6 } } }}>
        <rect x="80" y="100" width="40" height="30" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M85 100 V85 A15 15 0 0 1 115 85 V100" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="115" r="4" fill="#cbd5e1" />
      </motion.g>

      {/* Aggressive Blue Laser */}
      <motion.rect x="70" y="75" width="60" height="2" fill="#3B82F6" style={{ filter: "drop-shadow(0 0 8px #3B82F6)" }}
        initial={{ y: 0, opacity: 0 }}
        variants={{ hover: { y: [0, 60, 0], opacity: [0, 1, 1, 0], transition: { duration: 1.5, repeat: Infinity, delay: 0.5, ease: "linear" } } }}
      />
    </motion.g>
  </svg>
);

const ExportsGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-60 h-60 pointer-events-none" viewBox="0 0 200 200" fill="none">
    {/* Continuous Drifting Chaos */}
    <motion.g initial={{ opacity: 1 }} variants={{ hover: { opacity: 0, transition: { duration: 0.2 } } }}>
      {[
        {x: 40, y: 50}, {x: 120, y: 70}, {x: 60, y: 130}, {x: 140, y: 110}, {x: 80, y: 80}
      ].map((p, i) => (
        <motion.rect key={i} x={p.x} y={p.y} width="20" height="10" rx="2" fill="#EC4899" opacity="0.3" animate={{ y: [p.y, p.y - 10, p.y], x: [p.x, p.x + 10, p.x] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </motion.g>

    {/* Hover: Organized Cascade */}
    <motion.g initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      <g stroke="#EC4899" strokeWidth="2" opacity="0.5" fill="none">
        <rect x="50" y="60" width="100" height="80" rx="4" />
        <path d="M50 80 H150 M50 100 H150 M50 120 H150" strokeWidth="1" />
        <path d="M83 60 V140 M116 60 V140" strokeWidth="1" />
      </g>
      
      {/* Snapping data blocks */}
      {[0, 1, 2, 3].map((row) => (
        <motion.g key={row} initial={{ x: -20, opacity: 0 }} variants={{ hover: { x: 0, opacity: 1, transition: { delay: 0.2 + row * 0.1, type: "spring" } } }}>
          <rect x="55" y={65 + row*20} width="20" height="10" fill="#EC4899" opacity="0.8" />
          <rect x="88" y={65 + row*20} width="20" height="10" fill="#EC4899" opacity="0.4" />
        </motion.g>
      ))}

      {/* Compressing Download Arrow */}
      <motion.g initial={{ y: -50, opacity: 0 }} variants={{ hover: { y: 0, opacity: 1, transition: { delay: 0.8, type: "spring", bounce: 0.6 } } }}>
        <circle cx="100" cy="100" r="25" fill="rgba(15, 23, 42, 0.9)" stroke="#EC4899" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px rgba(236,72,153,0.3))" }} />
        <path d="M100 85 V110 M90 100 L100 110 L110 100" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
        `group relative flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-gradient-to-br from-background to-muted/20 overflow-hidden cursor-default transition-shadow hover:shadow-lg hover:shadow-background/50`,
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

      {/* 3. Feature SVG Graphic (Merger Graphic) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Graphic && <Graphic />}
      </div>

      {/* 3.5 Text Backdrop Mask for high SVG contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none opacity-80" />

      {/* 4. Content */}
      <div className="relative z-20 pointer-events-none mt-auto">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background border border-border/40 mb-4 group-hover:scale-110 group-hover:bg-muted/50 transition-all duration-300 shadow-sm`}>
          <card.icon className={`w-5 h-5 ${card.iconColor} drop-shadow-sm`} />
        </div>
        <h3 className="text-base font-bold font-headline mb-2 text-foreground transition-colors drop-shadow-sm">{card.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%] drop-shadow-sm">{card.desc}</p>
      </div>
    </motion.div>
  );
}

// --- MAIN GRID COMPONENT ---

export function BentoGrid() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="container px-4">
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

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 auto-rows-[180px] relative z-10">
          {cards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
