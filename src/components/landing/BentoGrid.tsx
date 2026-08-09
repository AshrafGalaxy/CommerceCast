'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Package, Zap, BarChart3, Globe, ShieldCheck,
  FileSpreadsheet, Webhook, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- ADVANCED CUSTOM SVG GRAPHICS ---

const DashboardGraphic = () => (
  <svg className="absolute -bottom-10 -right-10 w-72 h-72 text-blue-500/15 transition-colors duration-500 group-hover:text-blue-500/30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Dashboard Wireframe Frame */}
    <rect x="20" y="20" width="160" height="120" rx="6" strokeWidth="2" opacity="0.4" />
    <path d="M50 20 V140" strokeWidth="1" opacity="0.2" /> {/* Sidebar separator */}
    <path d="M50 40 H180" strokeWidth="1" opacity="0.2" /> {/* Header separator */}
    
    {/* Sidebar items */}
    <rect x="25" y="30" width="20" height="4" rx="2" opacity="0.3" />
    <rect x="25" y="45" width="15" height="4" rx="2" opacity="0.3" />
    <rect x="25" y="60" width="18" height="4" rx="2" opacity="0.3" />

    {/* Header items */}
    <circle cx="165" cy="30" r="4" opacity="0.3" />
    <rect x="135" y="28" width="20" height="4" rx="2" opacity="0.3" />

    {/* Sparkline Graph (Animates on hover) */}
    <motion.path 
      d="M 60 110 C 80 110, 90 70, 110 80 C 130 90, 140 50, 160 50" 
      stroke="#3B82F6" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      variants={{
        hover: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
      }}
    />

    {/* Data points (Fade in sequentially) */}
    {[
      { cx: 60, cy: 110, delay: 0.2 },
      { cx: 110, cy: 80, delay: 0.6 },
      { cx: 160, cy: 50, delay: 1.0 }
    ].map((point, i) => (
      <motion.circle 
        key={i} 
        cx={point.cx} 
        cy={point.cy} 
        r="4" 
        fill="#3B82F6"
        stroke="none"
        initial={{ opacity: 0, scale: 0 }}
        variants={{
          hover: { opacity: 1, scale: 1, transition: { delay: point.delay, duration: 0.3 } }
        }}
      />
    ))}
  </svg>
);

const AlertsGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-60 h-60 text-amber-500/15 transition-colors duration-500 group-hover:text-amber-500/30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Mobile/Card Wireframe */}
    <rect x="40" y="40" width="120" height="80" rx="12" strokeWidth="2" opacity="0.4" />
    <path d="M40 70 H160" strokeWidth="1" opacity="0.2" />
    <circle cx="60" cy="55" r="5" opacity="0.3" />
    <rect x="75" y="53" width="40" height="4" rx="2" opacity="0.3" />
    
    {/* Content lines */}
    <rect x="60" y="85" width="80" height="4" rx="2" opacity="0.2" />
    <rect x="60" y="100" width="60" height="4" rx="2" opacity="0.2" />

    {/* Animated Alert Badge */}
    <motion.g
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      variants={{
        hover: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
      }}
    >
      <circle cx="150" cy="40" r="14" fill="#F59E0B" opacity="0.2" stroke="none" />
      <circle cx="150" cy="40" r="14" stroke="#F59E0B" strokeWidth="2" />
      <path d="M148 35 V42 M148 45 V46" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </motion.g>

    {/* Ripples */}
    {[1, 2].map((i) => (
      <motion.circle
        key={i}
        cx="150" cy="40" r="14"
        stroke="#F59E0B"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 1 }}
        variants={{
          hover: { opacity: [0.8, 0], scale: [1, 2.5], transition: { duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" } }
        }}
      />
    ))}

    {/* Scanning Trace Outline */}
    <motion.rect 
      x="40" y="40" width="120" height="80" rx="12" 
      stroke="#F59E0B" 
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      variants={{
        hover: { pathLength: 1, opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: "linear" } }
      }}
    />
  </svg>
);

const APIGraphic = () => (
  <svg className="absolute -bottom-8 -right-8 w-60 h-60 text-violet-500/15 transition-colors duration-500 group-hover:text-violet-500/30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Central Core */}
    <circle cx="100" cy="100" r="25" strokeWidth="2" opacity="0.4" />
    <circle cx="100" cy="100" r="10" strokeWidth="1" opacity="0.2" />

    {/* Paths */}
    <path id="path1" d="M 20 40 Q 60 40 100 75" strokeWidth="1.5" opacity="0.3" />
    <path id="path2" d="M 180 30 Q 140 60 115 85" strokeWidth="1.5" opacity="0.3" />
    <path id="path3" d="M 30 160 Q 70 140 85 115" strokeWidth="1.5" opacity="0.3" />
    <path id="path4" d="M 170 170 Q 140 140 120 115" strokeWidth="1.5" opacity="0.3" />

    {/* Outer Nodes */}
    <circle cx="20" cy="40" r="6" opacity="0.4" />
    <circle cx="180" cy="30" r="6" opacity="0.4" />
    <circle cx="30" cy="160" r="6" opacity="0.4" />
    <circle cx="170" cy="170" r="6" opacity="0.4" />

    {/* Traveling Packets */}
    <motion.circle r="4" fill="#8B5CF6" stroke="none" initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
        <mpath href="#path1" />
      </animateMotion>
    </motion.circle>
    <motion.circle r="4" fill="#8B5CF6" stroke="none" initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
        <mpath href="#path2" />
      </animateMotion>
    </motion.circle>
    <motion.circle r="4" fill="#8B5CF6" stroke="none" initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      <animateMotion dur="1.8s" repeatCount="indefinite" begin="1s">
        <mpath href="#path3" />
      </animateMotion>
    </motion.circle>
    <motion.circle r="4" fill="#8B5CF6" stroke="none" initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}>
      <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.2s">
        <mpath href="#path4" />
      </animateMotion>
    </motion.circle>
    
    {/* Central Core Pulse */}
    <motion.circle 
      cx="100" cy="100" r="25" 
      stroke="#8B5CF6" strokeWidth="2"
      initial={{ scale: 1, opacity: 0 }}
      variants={{
        hover: { scale: 1.2, opacity: [0, 0.5, 0], transition: { duration: 1, repeat: Infinity } }
      }}
    />
  </svg>
);

const MultiChannelGraphic = () => (
  <svg className="absolute -bottom-8 -right-8 w-60 h-60 text-emerald-500/15 transition-colors duration-500 group-hover:text-emerald-500/30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Isometric Grid Base */}
    <g transform="translate(100, 120) scale(1, 0.5) rotate(45)">
      <rect x="-40" y="-40" width="80" height="80" strokeWidth="2" opacity="0.3" />
      <path d="M-40 0 H40 M0 -40 V40" strokeWidth="1" opacity="0.2" />
      
      {/* Target Center */}
      <rect x="-10" y="-10" width="20" height="20" strokeWidth="2" opacity="0.5" fill="rgba(16, 185, 129, 0.1)" stroke="none" />
    </g>

    {/* Dropping Elements */}
    {/* Element 1 (Left) */}
    <motion.g
      initial={{ opacity: 0, y: 0, x: -30 }}
      variants={{
        hover: { opacity: 1, y: 30, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
    >
      <rect x="70" y="60" width="20" height="20" rx="4" strokeWidth="2" opacity="0.6" fill="rgba(16, 185, 129, 0.1)" />
    </motion.g>

    {/* Element 2 (Right) */}
    <motion.g
      initial={{ opacity: 0, y: -20, x: 40 }}
      variants={{
        hover: { opacity: 1, y: 15, x: -10, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
      }}
    >
      <circle cx="130" cy="50" r="10" strokeWidth="2" opacity="0.6" fill="rgba(16, 185, 129, 0.1)" />
    </motion.g>

    {/* Element 3 (Top) */}
    <motion.g
      initial={{ opacity: 0, y: -40 }}
      variants={{
        hover: { opacity: 1, y: -10, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } }
      }}
    >
      <polygon points="100,30 110,45 90,45" strokeWidth="2" opacity="0.6" fill="rgba(16, 185, 129, 0.1)" />
    </motion.g>

    {/* Unified Beam */}
    <motion.path 
      d="M100 120 V20" 
      stroke="url(#emerald-beam)" 
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ opacity: 0, pathLength: 0 }}
      variants={{
        hover: { opacity: 1, pathLength: 1, transition: { delay: 0.8, duration: 0.5 } }
      }}
    />
    
    <defs>
      <linearGradient id="emerald-beam" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const SecurityGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-60 h-60 text-slate-400/20 transition-colors duration-500 group-hover:text-slate-400/40 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Background Trace */}
    <path d="M70 120 Q100 70 130 120" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    <path d="M60 110 C80 50 120 50 140 110" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    <path d="M80 130 Q100 90 120 130" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    
    {/* Redrawing on hover */}
    <g stroke="#64748B" strokeWidth="2" strokeLinecap="round">
       <motion.path d="M70 120 Q100 70 130 120" initial={{ pathLength: 0, opacity: 0 }} variants={{ hover: { pathLength: 1, opacity: 1, transition: { duration: 1 } } }} />
       <motion.path d="M60 110 C80 50 120 50 140 110" initial={{ pathLength: 0, opacity: 0 }} variants={{ hover: { pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: 0.2 } } }} />
       <motion.path d="M80 130 Q100 90 120 130" initial={{ pathLength: 0, opacity: 0 }} variants={{ hover: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.4 } } }} />
    </g>

    {/* Verified Shield */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      variants={{ hover: { opacity: 1, scale: 1, transition: { delay: 1.5, type: "spring" } } }}
    >
      <path d="M140 140 L140 150 C140 160 130 170 120 175 C110 170 100 160 100 150 L100 140 L120 132 Z" fill="#0f172a" stroke="#10B981" strokeWidth="2" />
      <path d="M110 155 L116 161 L130 147" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
    
    {/* Laser Scan */}
    <motion.line 
      x1="50" y1="50" x2="150" y2="50" 
      stroke="#3B82F6" strokeWidth="2" opacity="0.8"
      initial={{ opacity: 0, y: 0 }}
      variants={{
        hover: { opacity: [0, 1, 1, 0], y: [0, 100], transition: { duration: 2, repeat: Infinity, ease: "linear" } }
      }}
    />
  </svg>
);

const ExportsGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-56 h-56 text-pink-500/15 transition-colors duration-500 group-hover:text-pink-500/30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
    {/* Spreadsheet Frame */}
    <rect x="30" y="40" width="140" height="100" rx="4" strokeWidth="2" opacity="0.4" />
    
    {/* Grid lines */}
    <path d="M30 60 H170 M30 80 H170 M30 100 H170 M30 120 H170" strokeWidth="1" opacity="0.2" />
    <path d="M70 40 V140 M110 40 V140 M150 40 V140" strokeWidth="1" opacity="0.2" />

    {/* Scanning Highlights (Sequential) */}
    {[60, 80, 100, 120].map((y, i) => (
      <motion.rect
        key={y}
        x="30" y={y - 20} width="140" height="20"
        fill="#EC4899"
        stroke="none"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: [0, 0.3, 0], transition: { duration: 0.6, delay: i * 0.2 } }
        }}
      />
    ))}

    {/* Download Icon overlaying */}
    <motion.g
      initial={{ opacity: 0, y: -20 }}
      variants={{
        hover: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.5, type: "spring" } }
      }}
    >
      <circle cx="100" cy="90" r="30" fill="#0f172a" stroke="#EC4899" strokeWidth="2" />
      <path d="M100 75 V100 M90 90 L100 100 L110 90" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M85 105 H115" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
  </svg>
);

const SVGs: Record<string, React.FC> = {
  dashboard: DashboardGraphic,
  alerts: AlertsGraphic,
  api: APIGraphic,
  multichannel: MultiChannelGraphic,
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
    gradient: 'from-blue-500/10 to-indigo-500/5',
    iconColor: 'text-blue-500',
    border: 'border-blue-500/15',
  },
  {
    id: 'alerts',
    icon: RefreshCw,
    title: 'Smart alerts',
    desc: 'Get notified before stockouts happen, not after.',
    size: 'small',
    gradient: 'from-amber-500/10 to-orange-500/5',
    iconColor: 'text-amber-500',
    border: 'border-amber-500/15',
  },
  {
    id: 'api',
    icon: Webhook,
    title: 'REST API & webhooks',
    desc: 'Plug CommerceCast into your stack via our OpenAPI-compliant REST API.',
    size: 'small',
    gradient: 'from-violet-500/10 to-purple-500/5',
    iconColor: 'text-violet-500',
    border: 'border-violet-500/15',
  },
  {
    id: 'multichannel',
    icon: Globe,
    title: 'Multi-channel aggregation',
    desc: 'Shopify, Amazon, WooCommerce, Flipkart — demand unified across every channel.',
    size: 'small',
    gradient: 'from-emerald-500/10 to-green-500/5',
    iconColor: 'text-emerald-500',
    border: 'border-emerald-500/15',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Bank-grade security',
    desc: 'SOC 2 Type II certified. Enterprise-grade encryption out of the box. Your data is yours.',
    size: 'small',
    gradient: 'from-slate-500/10 to-slate-600/5',
    iconColor: 'text-slate-400',
    border: 'border-slate-500/15',
  },
  {
    id: 'exports',
    icon: FileSpreadsheet,
    title: 'Custom exports',
    desc: 'Export your forecasts to CSV, Excel, or connect directly to your BI tools.',
    size: 'small',
    gradient: 'from-pink-500/10 to-rose-500/5',
    iconColor: 'text-pink-500',
    border: 'border-pink-500/15',
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
        `group relative flex flex-col justify-between p-6 rounded-2xl border bg-gradient-to-br ${card.gradient} ${card.border} overflow-hidden cursor-default transition-shadow hover:shadow-xl hover:shadow-${card.iconColor.split('-')[1]}-500/5`,
        sizeClasses[card.size as CardSize]
      )}
    >
      {/* 1. Mouse Spotlight Glow */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* 2. Glassmorphic Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* 3. Feature SVG Graphic (Merger Graphic) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Graphic && <Graphic />}
      </div>

      {/* 4. Content */}
      <div className="relative z-20 pointer-events-none">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background/50 border border-border/40 mb-4 group-hover:scale-110 group-hover:bg-background/80 transition-all duration-300 backdrop-blur-sm shadow-sm`}>
          <card.icon className={`w-5 h-5 ${card.iconColor}`} />
        </div>
        <h3 className="text-base font-bold font-headline mb-2 text-foreground group-hover:text-primary transition-colors">{card.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%]">{card.desc}</p>
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
