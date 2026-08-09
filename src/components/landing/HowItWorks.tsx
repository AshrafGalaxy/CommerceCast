'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, LineChart, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

// --- MINI PREVIEW: Station 1 — CSV Row Parsing ---
const IngestPreview = () => {
  const rows = [
    { label: 'order_id', value: '#44821', color: 'text-blue-400' },
    { label: 'product', value: 'SKU-9A3F', color: 'text-slate-400' },
    { label: 'qty', value: '128', color: 'text-emerald-400' },
    { label: 'store', value: 'Shopify', color: 'text-violet-400' },
    { label: 'timestamp', value: 'now', color: 'text-amber-400' },
  ];
  return (
    <div className="w-full rounded-lg bg-background/60 border border-border/60 p-3 font-mono text-[10px] space-y-1.5">
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          className="flex items-center gap-2 overflow-hidden"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: i * 0.15, ease: 'easeOut' }}
        >
          <span className="text-muted-foreground/60 w-16 shrink-0">{row.label}</span>
          <span className="text-border/60 shrink-0">→</span>
          <motion.span
            className={`${row.color} font-semibold`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            {row.value}
          </motion.span>
          <motion.span
            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// --- MINI PREVIEW: Station 2 — Neural Weight Matrix ---
const AIPreview = () => {
  const nodes = [
    [0.3, 0.8, 0.1, 0.6],
    [0.9, 0.2, 0.7, 0.4],
    [0.5, 0.6, 0.3, 0.9],
  ];
  return (
    <div className="w-full rounded-lg bg-background/60 border border-border/60 p-3 space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">Ensemble Model</span>
        <motion.span
          className="text-[9px] text-violet-400 font-mono font-bold"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ● TRAINING
        </motion.span>
      </div>
      {nodes.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 items-center">
          {row.map((val, ci) => (
            <motion.div
              key={ci}
              className="flex-1 h-5 rounded-sm"
              style={{ backgroundColor: `rgba(139, 92, 246, ${val})` }}
              animate={{ opacity: [val * 0.7, val, val * 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: (ri + ci) * 0.15 }}
            />
          ))}
          <span className="text-[8px] text-muted-foreground font-mono w-8 shrink-0">
            {(row.reduce((a, b) => a + b, 0) / row.length).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- MINI PREVIEW: Station 3 — Forecast Chart Ticking Up ---
const OutputPreview = () => {
  const bars = [40, 55, 48, 70, 62, 85, 78];
  const maxBar = 85;
  return (
    <div className="w-full rounded-lg bg-background/60 border border-border/60 p-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">7-Day Forecast</span>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <motion.span
            className="text-[9px] text-emerald-400 font-mono font-bold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +23.4%
          </motion.span>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-12">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${(h / maxBar) * 100}%`,
              transformOrigin: 'bottom',
              background: i === bars.length - 1
                ? 'linear-gradient(to top, #10b981, #34d399)'
                : 'rgba(16,185,129,0.35)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="text-[8px] text-muted-foreground font-mono flex-1 text-center">{d}</span>
        ))}
      </div>
    </div>
  );
};

// --- PIPELINE SVG ---
const PipelineSVG = ({ pathLength, opacity }: { pathLength: any, opacity: any }) => (
  <svg className="w-full h-full" viewBox="0 0 1100 280" preserveAspectRatio="xMidYMid meet" fill="none">
    <defs>
      <filter id="hw-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="hw-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Track gradient: blue → violet → emerald */}
      <linearGradient id="track-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
      </linearGradient>

      {/* Node glows */}
      <radialGradient id="n1g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="n2g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="n3g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Dead track (unlit) */}
    <path d="M 120 140 H 980" stroke="currentColor" className="text-border/40" strokeWidth="3" strokeLinecap="round" />

    {/* Scroll-driven illuminated track */}
    <motion.path
      d="M 120 140 H 980"
      stroke="url(#track-grad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
      filter="url(#hw-glow)"
    />

    {/* === DATA PACKETS === */}
    {/* Packet 1 → 2 (blue) */}
    <path d="M 120 140 H 550" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 600" filter="url(#hw-glow-sm)">
      <animate attributeName="stroke-dashoffset" from="614" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
    </path>
    {/* Packet 1 → 2 trailing (faint) */}
    <path d="M 120 140 H 550" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 600" opacity="0.3" filter="url(#hw-glow-sm)">
      <animate attributeName="stroke-dashoffset" from="614" to="0" dur="2s" begin="0.4s" repeatCount="indefinite" />
    </path>

    {/* Packet 2 → 3 (violet) */}
    <path d="M 550 140 H 980" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 600" filter="url(#hw-glow-sm)">
      <animate attributeName="stroke-dashoffset" from="614" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
    </path>
    <path d="M 550 140 H 980" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 600" opacity="0.3" filter="url(#hw-glow-sm)">
      <animate attributeName="stroke-dashoffset" from="614" to="0" dur="2s" begin="1.4s" repeatCount="indefinite" />
    </path>

    {/* === CONNECTOR VERTICALS (nodes up to cards) === */}
    <path d="M 120 140 V 80" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.4" />
    <path d="M 550 140 V 80" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.4" />
    <path d="M 980 140 V 80" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.4" />

    {/* === NODE 1: INGEST === */}
    <circle cx="120" cy="140" r="44" fill="url(#n1g)" />
    <circle cx="120" cy="140" r="22" className="fill-card" stroke="#3B82F6" strokeWidth="2.5" filter="url(#hw-glow-sm)" />
    <circle cx="120" cy="140" r="7" fill="#3B82F6" filter="url(#hw-glow-sm)" />
    {/* outer orbit ring */}
    <circle cx="120" cy="140" r="32" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />

    {/* === NODE 2: AI CORE === */}
    <circle cx="550" cy="140" r="54" fill="url(#n2g)" />
    {/* Square chip body */}
    <rect x="526" y="116" width="48" height="48" rx="10" className="fill-card" stroke="#8B5CF6" strokeWidth="2.5" filter="url(#hw-glow)" />
    {/* Chip pins */}
    {[-14, -4, 6, 16].map((offset, i) => (
      <g key={i}>
        <line x1={536 + offset * 0.7} y1="113" x2={536 + offset * 0.7} y2="116" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        <line x1={536 + offset * 0.7} y1="164" x2={536 + offset * 0.7} y2="167" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
      </g>
    ))}
    {[-14, -4, 6, 16].map((offset, i) => (
      <g key={i}>
        <line x1="523" y1={126 + offset * 0.7} x2="526" y2={126 + offset * 0.7} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        <line x1="574" y1={126 + offset * 0.7} x2="577" y2={126 + offset * 0.7} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
      </g>
    ))}
    {/* Inner pulsing core */}
    <motion.circle cx="550" cy="140" r="10" fill="#8B5CF6" filter="url(#hw-glow)"
      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* === NODE 3: OUTPUT === */}
    <circle cx="980" cy="140" r="44" fill="url(#n3g)" />
    {/* Expanding radial waves */}
    <motion.circle cx="980" cy="140" r="22" fill="none" stroke="#10B981" strokeWidth="1.5"
      animate={{ r: [22, 55], opacity: [0.7, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
    />
    <motion.circle cx="980" cy="140" r="22" fill="none" stroke="#10B981" strokeWidth="1"
      animate={{ r: [22, 55], opacity: [0.4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
    />
    <circle cx="980" cy="140" r="22" className="fill-card" stroke="#10B981" strokeWidth="2.5" filter="url(#hw-glow-sm)" />
    <circle cx="980" cy="140" r="7" fill="#10B981" filter="url(#hw-glow-sm)" />
  </svg>
);

// --- STATION CARD ---
const stations = [
  {
    step: '01',
    label: 'Ingest',
    title: 'Connect your store',
    desc: 'One-click sync with Shopify, Amazon & WooCommerce. Every order, SKU, and event — captured in real-time.',
    color: 'blue',
    icon: Database,
    preview: IngestPreview,
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/10',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    step: '02',
    label: 'Process',
    title: 'AI models learn',
    desc: 'An ensemble of forecasting models ingest your history and learn your business — seasonality, promotions, anomalies.',
    color: 'violet',
    icon: BrainCircuit,
    preview: AIPreview,
    borderColor: 'border-violet-500/30',
    glowColor: 'shadow-violet-500/10',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    step: '03',
    label: 'Decide',
    title: 'Act on intelligence',
    desc: 'Receive proactive alerts, precise restock recommendations, and promotional playbooks — delivered to your dashboard or API.',
    color: 'emerald',
    icon: LineChart,
    preview: OutputPreview,
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-emerald-500/10',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end center'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-32 bg-background overflow-hidden text-foreground">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:28px_28px]" />

      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] uppercase tracking-[0.3em] font-semibold mb-5 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5" />
            Live Processing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-headline text-foreground">
            From data to decisions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500">
              in minutes
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            A fully automated, end-to-end intelligence pipeline — from raw data ingestion to actionable forecasts.
          </p>
        </motion.div>

        {/* Pipeline Section */}
        <div ref={containerRef}>

          {/* SVG Pipeline Track */}
          <div className="w-full h-[140px] relative hidden md:block mb-2">
            <PipelineSVG pathLength={pathLength} opacity={opacity} />
          </div>

          {/* Station Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {stations.map((station, i) => {
              const Icon = station.icon;
              const Preview = station.preview;
              return (
                <motion.div
                  key={station.step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex flex-col rounded-2xl border ${station.borderColor} bg-card/80 backdrop-blur-xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl ${station.glowColor}`}
                >
                  {/* Step badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${station.badgeBg} border ${station.borderColor}`}>
                      <span className={`text-[9px] font-black tracking-[0.3em] uppercase ${station.badgeText} font-mono`}>
                        Step {station.step}
                      </span>
                    </div>
                    <div className={`p-2 rounded-xl ${station.iconBg} ${station.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">{station.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{station.desc}</p>

                  {/* Live Mini Preview */}
                  <Preview />

                  {/* Connector dot aligned to pipeline node above */}
                  <div className={`absolute -top-[22px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full hidden md:block`}
                    style={{ background: station.color === 'blue' ? '#3B82F6' : station.color === 'violet' ? '#8B5CF6' : '#10B981', boxShadow: `0 0 10px ${station.color === 'blue' ? '#3B82F6' : station.color === 'violet' ? '#8B5CF6' : '#10B981'}` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
