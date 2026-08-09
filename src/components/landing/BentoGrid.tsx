'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Package, Zap, BarChart3, Globe, ShieldCheck,
  FileSpreadsheet, Webhook, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- CUSTOM SVG GRAPHICS (Merger Graphics) ---

const DashboardGraphic = () => (
  <svg className="absolute -bottom-8 -right-8 w-64 h-64 text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="currentColor">
    {/* Bars that grow on hover */}
    <motion.rect x="10" y="60" width="15" height="30" rx="2" className="origin-bottom group-hover:animate-[bounce_2s_infinite_ease-in-out]" style={{ transformBox: 'fill-box' }} />
    <motion.rect x="35" y="40" width="15" height="50" rx="2" className="origin-bottom group-hover:animate-[bounce_2.5s_infinite_ease-in-out]" style={{ transformBox: 'fill-box' }} />
    <motion.rect x="60" y="20" width="15" height="70" rx="2" className="origin-bottom group-hover:animate-[bounce_1.5s_infinite_ease-in-out]" style={{ transformBox: 'fill-box' }} />
    {/* Minimalist UI frame */}
    <rect x="0" y="0" width="90" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="18" cy="10" r="2" fill="currentColor" opacity="0.5" />
  </svg>
);

const AlertsGraphic = () => (
  <svg className="absolute -bottom-4 -right-4 w-40 h-40 text-amber-500/10 group-hover:text-amber-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    {/* Pulsing rings */}
    <motion.circle cx="50" cy="50" r="20" strokeWidth="2" className="group-hover:animate-[ping_3s_infinite]" />
    <motion.circle cx="50" cy="50" r="40" strokeWidth="1" opacity="0.5" className="group-hover:animate-[ping_4s_infinite]" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

const APIGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-48 h-48 text-violet-500/10 group-hover:text-violet-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    {/* Connecting lines that dash on hover */}
    <motion.path d="M20 80 L50 50 L80 20" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="group-hover:animate-[dash_2s_forwards]" />
    <motion.path d="M20 20 L50 50 L80 80" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="group-hover:animate-[dash_2.5s_forwards]" />
    {/* Nodes */}
    <circle cx="20" cy="20" r="6" fill="currentColor" />
    <circle cx="80" cy="20" r="6" fill="currentColor" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    <circle cx="20" cy="80" r="6" fill="currentColor" />
    <circle cx="80" cy="80" r="6" fill="currentColor" />
  </svg>
);

const MultiChannelGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-48 h-48 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="currentColor">
    {/* Central hub */}
    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="6" />
    {/* Orbiting nodes (channels) sliding in on hover */}
    <motion.g className="group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-700">
      <rect x="70" y="10" width="16" height="16" rx="4" />
      <path d="M 50 50 L 78 18" stroke="currentColor" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
    </motion.g>
    <motion.g className="group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700 delay-100">
      <circle cx="15" cy="20" r="8" />
      <path d="M 50 50 L 15 20" stroke="currentColor" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
    </motion.g>
    <motion.g className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-700 delay-200">
      <rect x="10" y="70" width="12" height="12" transform="rotate(45 16 76)" />
      <path d="M 50 50 L 16 76" stroke="currentColor" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
    </motion.g>
  </svg>
);

const SecurityGraphic = () => (
  <svg className="absolute -bottom-4 -right-4 w-40 h-40 text-slate-400/10 group-hover:text-slate-400/20 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    {/* Grid / Lock */}
    <path d="M20 20 H80 V80 H20 Z" strokeWidth="1" opacity="0.3" strokeDasharray="5" />
    <path d="M35 50 V35 A15 15 0 0 1 65 35 V50" strokeWidth="3" />
    <rect x="25" y="50" width="50" height="35" rx="4" strokeWidth="3" />
    <circle cx="50" cy="67" r="4" fill="currentColor" />
    {/* Laser scan line on hover */}
    <motion.line x1="10" y1="20" x2="90" y2="20" stroke="#3B82F6" strokeWidth="2" opacity="0" className="group-hover:animate-[scan_3s_ease-in-out_infinite]" />
  </svg>
);

const ExportsGraphic = () => (
  <svg className="absolute -bottom-6 -right-6 w-40 h-40 text-pink-500/10 group-hover:text-pink-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    {/* Spreadsheet Grid */}
    <rect x="10" y="20" width="80" height="60" rx="4" strokeWidth="2" opacity="0.5" />
    <path d="M10 40 H90 M10 60 H90 M40 20 V80 M70 20 V80" strokeWidth="1" opacity="0.3" />
    {/* Download Arrow sliding down on hover */}
    <motion.g className="group-hover:translate-y-3 transition-transform duration-500 ease-bounce">
      <path d="M50 0 V30 M40 20 L50 30 L60 20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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

function BentoCard({ card, index }: { card: typeof cards[0], index: number }) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
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
