'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, LineChart, Zap, FileSpreadsheet, Cpu, TrendingUp } from 'lucide-react';

// --- MINI PREVIEW: Station 1 — CSV Row Parsing ---
const IngestPreview = () => {
  const rows = [
    { label: 'order_id', value: '#44821', color: 'text-blue-400' },
    { label: 'product', value: 'SKU-9A3F', color: 'text-slate-400' },
    { label: 'qty', value: '128', color: 'text-blue-400' },
    { label: 'source', value: 'Google Sheets', color: 'text-blue-400' },
    { label: 'timestamp', value: 'now', color: 'text-amber-400' },
  ];
  return (
    <div className="w-full rounded-lg bg-background/60 border border-border/60 p-3 font-sans text-[10px] space-y-1.5">
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
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-sans">Ensemble Model</span>
        <motion.span
          className="text-[9px] text-violet-400 font-sans font-bold"
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
          <span className="text-[8px] text-muted-foreground font-sans w-8 shrink-0">
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
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-sans">7-Day Forecast</span>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <motion.span
            className="text-[9px] text-emerald-400 font-sans font-bold"
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
                ? 'linear-gradient(to top, #059669, #34d399)'
                : 'rgba(52,211,153,0.35)',
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
          <span key={i} className="text-[8px] text-muted-foreground font-sans flex-1 text-center">{d}</span>
        ))}
      </div>
    </div>
  );
};

// --- PIPELINE SVG ---
const PipelineSVG = () => {
  // PCB Routing paths for a microprocessor look
  const trackCenter1 = "M 200 70 H 600";
  const trackCenter2 = "M 600 70 H 1000";
  
  const t1_top = "M 200 70 L 250 55 H 350 L 400 70 L 450 55 H 550 L 600 70";
  const t1_bot = "M 200 70 L 250 85 H 350 L 400 70 L 450 85 H 550 L 600 70";
  const t2_top = "M 600 70 L 650 55 H 750 L 800 70 L 850 55 H 950 L 1000 70";
  const t2_bot = "M 600 70 L 650 85 H 750 L 800 70 L 850 85 H 950 L 1000 70";

  return (
    <svg className="w-full h-auto" viewBox="0 0 1200 140" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="hw-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="hw-glow-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === BACKGROUND PCB === */}
      {/* Track 1 (Blue zone: node 1 → node 2) */}
      <g stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25">
        <path d={t1_top} />
        <path d={t1_bot} />
        <path d={trackCenter1} strokeWidth="1.5" />
        <path d="M 200 140 V 70" strokeWidth="1" />
        <path d="M 610 70 V 140" strokeWidth="1" />
      </g>
      {/* Track 2 (Violet zone: node 2 → node 3) */}
      <g stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25">
        <path d={t2_top} />
        <path d={t2_bot} />
        <path d={trackCenter2} strokeWidth="1.5" />
        <path d="M 590 140 V 70" strokeWidth="1" />
        <path d="M 1000 70 V 140" strokeWidth="1" />
      </g>

      {/* === 8-SECOND CONTINUOUS GLOBAL PULSE === */}
      {/* --- BLUE segment: Card 1 → Node 2 --- */}
      <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" filter="url(#hw-glow-sm)">
        {/* UP from Card 1 */}
        <path d="M 200 140 V 70" strokeDasharray="40 200">
          <animate attributeName="stroke-dashoffset" values="40; 40; -70; 40; 40" keyTimes="0; 0.125; 0.1875; 0.188; 1" dur="8s" repeatCount="indefinite" />
        </path>
        {/* Across Node1 → Node2 */}
        <path d={t1_top} strokeWidth="1.5" strokeDasharray="60 1000">
          <animate attributeName="stroke-dashoffset" values="60; 60; -400; 60; 60" keyTimes="0; 0.1875; 0.375; 0.376; 1" dur="8s" repeatCount="indefinite" />
        </path>
        <path d={trackCenter1} strokeWidth="2.5" stroke="#38bdf8" strokeDasharray="100 1000" filter="url(#hw-glow)">
          <animate attributeName="stroke-dashoffset" values="100; 100; -400; 100; 100" keyTimes="0; 0.1875; 0.375; 0.376; 1" dur="8s" repeatCount="indefinite" />
        </path>
        <path d={t1_bot} strokeWidth="1.5" strokeDasharray="60 1000">
          <animate attributeName="stroke-dashoffset" values="60; 60; -400; 60; 60" keyTimes="0; 0.1875; 0.375; 0.376; 1" dur="8s" repeatCount="indefinite" />
        </path>
        {/* DOWN to Card 2 */}
        <path d="M 610 70 V 140" strokeDasharray="40 200">
          <animate attributeName="stroke-dashoffset" values="40; 40; -70; 40; 40" keyTimes="0; 0.375; 0.4375; 0.438; 1" dur="8s" repeatCount="indefinite" />
        </path>
      </g>

      {/* --- VIOLET segment: Card 2 → Node 3 --- */}
      <g stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" filter="url(#hw-glow-sm)">
        {/* UP from Card 2 */}
        <path d="M 590 140 V 70" strokeDasharray="40 200">
          <animate attributeName="stroke-dashoffset" values="40; 40; -70; 40; 40" keyTimes="0; 0.625; 0.6875; 0.688; 1" dur="8s" repeatCount="indefinite" />
        </path>
        {/* Across Node2 → Node3 */}
        <path d={t2_top} strokeWidth="1.5" strokeDasharray="60 1000">
          <animate attributeName="stroke-dashoffset" values="60; 60; -400; 60; 60" keyTimes="0; 0.6875; 0.875; 0.876; 1" dur="8s" repeatCount="indefinite" />
        </path>
        <path d={trackCenter2} strokeWidth="2.5" stroke="#7C3AED" strokeDasharray="100 1000" filter="url(#hw-glow)">
          <animate attributeName="stroke-dashoffset" values="100; 100; -400; 100; 100" keyTimes="0; 0.6875; 0.875; 0.876; 1" dur="8s" repeatCount="indefinite" />
        </path>
        <path d={t2_bot} strokeWidth="1.5" strokeDasharray="60 1000">
          <animate attributeName="stroke-dashoffset" values="60; 60; -400; 60; 60" keyTimes="0; 0.6875; 0.875; 0.876; 1" dur="8s" repeatCount="indefinite" />
        </path>
        {/* DOWN to Card 3 */}
        <path d="M 1000 70 V 140" strokeDasharray="40 200">
          <animate attributeName="stroke-dashoffset" values="40; 40; -70; 40; 40" keyTimes="0; 0.875; 0.9375; 0.938; 1" dur="8s" repeatCount="indefinite" />
        </path>
      </g>

      {/* === NODES === */}
      {/* Node 1 — Blue */}
      <g transform="translate(200, 70)">
        <circle r="28" fill="#3B82F6" fillOpacity="0.08" />
        <circle r="14" fill="none" stroke="#60A5FA" strokeWidth="1.5" filter="url(#hw-glow-sm)" className="fill-card" />
        <circle r="5" fill="#60A5FA" filter="url(#hw-glow-sm)" />
      </g>

      {/* Node 1A — Intermediate connector pad (Blue → Violet transition) */}
      <g transform="translate(400, 70) rotate(45)">
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#60A5FA" strokeWidth="1.5" className="fill-card" rx="1"/>
        <rect x="-2" y="-2" width="4" height="4" fill="#60A5FA" rx="0.5"/>
      </g>

      {/* Node 2 — Blue (central processor hub) */}
      <g transform="translate(600, 70)">
        <circle r="44" fill="#3B82F6" fillOpacity="0.06" />
        <circle r="22" fill="none" stroke="#60A5FA" strokeWidth="2" filter="url(#hw-glow)" className="fill-card" />
        <circle r="30" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 5" opacity="0.4" />
        <circle r="8" fill="#60A5FA" filter="url(#hw-glow)">
          <animate attributeName="opacity" values="0.2; 0.2; 1; 1; 0.2; 0.2" keyTimes="0; 0.375; 0.4375; 0.625; 0.6875; 1" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Node 2A — Intermediate connector pad (Blue → Violet transition) */}
      <g transform="translate(800, 70) rotate(45)">
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#A78BFA" strokeWidth="1.5" className="fill-card" rx="1"/>
        <rect x="-2" y="-2" width="4" height="4" fill="#A78BFA" rx="0.5"/>
      </g>

      {/* Node 3 — Emerald */}
      <g transform="translate(1000, 70)">
        <circle r="28" fill="#10B981" fillOpacity="0.08" />
        <circle r="14" fill="none" stroke="#34D399" strokeWidth="1.5" filter="url(#hw-glow-sm)" className="fill-card" />
        <circle r="5" fill="#34D399" filter="url(#hw-glow-sm)" />
        <circle fill="none" stroke="#34D399" strokeWidth="1" r="14">
          <animate attributeName="r" values="14; 14; 32; 14; 14" keyTimes="0; 0.875; 0.9375; 0.938; 1" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 0; 0.7; 0; 0" keyTimes="0; 0.875; 0.90; 0.938; 1" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
};

// --- STATION CARD ---
const stations = [
  {
    step: '01',
    label: 'Ingest',
    title: 'Sync Data Sources',
    desc: 'Connect Google Sheets or upload CSVs directly. Our NoDatabase™ architecture securely ingests your historical data with zero latency.',
    color: 'blue',
    icon: FileSpreadsheet,
    preview: IngestPreview,
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/10',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    traceColor: '#60A5FA',
    traceGlow: 'drop-shadow(0 0 4px rgba(96,165,250,0.8))',
    traceGuide: 'rgba(96,165,250,0.18)',
  },
  {
    step: '02',
    label: 'Process',
    title: 'AI Ensemble Forecasting',
    desc: 'Our Python FastAPI backend processes data through Prophet, XGBoost, and ARIMA to detect complex seasonal trends and anomalies.',
    color: 'purple',
    icon: Cpu,
    preview: AIPreview,
    borderColor: 'border-violet-500/30',
    glowColor: 'shadow-violet-500/10',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    traceColor: '#A78BFA',
    traceGlow: 'drop-shadow(0 0 4px rgba(167,139,250,0.8))',
    traceGuide: 'rgba(167,139,250,0.18)',
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
    traceColor: '#34D399',
    traceGlow: 'drop-shadow(0 0 4px rgba(52,211,153,0.8))',
    traceGuide: 'rgba(52,211,153,0.18)',
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
      {/* Minute / Raw Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

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
            From data to decisions <span className="text-foreground">in minutes</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            A fully automated end-to-end intelligence pipeline from raw data ingestion to actionable insights.
          </p>
        </motion.div>

        {/* Pipeline Section */}
        <div ref={containerRef}>

          {/* SVG Pipeline Track */}
          <div className="w-full relative hidden md:block mb-0 pointer-events-none z-0">
            <PipelineSVG />
          </div>

          {/* Station Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10">
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
                  className={`group relative flex flex-col rounded-2xl border ${station.borderColor} bg-card/80 backdrop-blur-xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl ${station.glowColor} overflow-hidden`}
                >
                  {/* SVG Border Overlays for complex routing flow */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      {/* Fading guide trace gradients per card */}
                      {station.step === '01' && (
                        <>
                          <linearGradient id="g01l" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                          <linearGradient id="g01r" x1="1" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                        </>
                      )}
                      {station.step === '02' && (
                        <>
                          <linearGradient id="g02l" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                          <linearGradient id="g02r" x1="1" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                        </>
                      )}
                      {station.step === '03' && (
                        <>
                          <linearGradient id="g03l" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                          <linearGradient id="g03r" x1="1" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={station.traceGuide} stopOpacity="0"/><stop offset="100%" stopColor={station.traceGuide}/></linearGradient>
                        </>
                      )}
                    </defs>

                    {station.step === '01' && (
                      <>
                        {/* Static fading guide traces */}
                        <path d="M 0 50 L 0 0 L 50 0" stroke="url(#g01l)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        <path d="M 100 50 L 100 0 L 50 0" stroke="url(#g01r)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        {/* Animated pulse: dash grows from 0 → 100 creating a smooth build-up */}
                        <g stroke={station.traceColor} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" style={{ filter: station.traceGlow }}>
                          <path d="M 0 50 L 0 0 L 50 0">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200" keyTimes="0; 0.01; 0.125; 0.135" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100" keyTimes="0; 0.01; 0.125; 0.135" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                          </path>
                          <path d="M 100 50 L 100 0 L 50 0">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200" keyTimes="0; 0.01; 0.125; 0.135" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100" keyTimes="0; 0.01; 0.125; 0.135" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                          </path>
                        </g>
                      </>
                    )}
                    {station.step === '02' && (
                      <>
                        <path d="M 50 0 L 0 0 L 0 50" stroke="url(#g02l)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        <path d="M 50 0 L 100 0 L 100 50" stroke="url(#g02r)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        <g stroke={station.traceColor} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" style={{ filter: station.traceGlow }}>
                          {/* Incoming pulse (down into card) */}
                          <path d="M 50 0 L 0 0 L 0 50">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200; 0 200" keyTimes="0; 0.4375; 0.531; 0.535; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100; 0" keyTimes="0; 0.4375; 0.531; 0.535; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                          </path>
                          <path d="M 50 0 L 100 0 L 100 50">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200; 0 200" keyTimes="0; 0.4375; 0.531; 0.535; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100; 0" keyTimes="0; 0.4375; 0.531; 0.535; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                          </path>
                          {/* Outgoing pulse (up out of card) */}
                          <path d="M 0 50 L 0 0 L 50 0">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200; 0 200" keyTimes="0; 0.531; 0.625; 0.63; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100; 0" keyTimes="0; 0.531; 0.625; 0.63; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                          </path>
                          <path d="M 100 50 L 100 0 L 50 0">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200; 0 200" keyTimes="0; 0.531; 0.625; 0.63; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100; 0" keyTimes="0; 0.531; 0.625; 0.63; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1; 0 0 1 1" />
                          </path>
                        </g>
                      </>
                    )}
                    {station.step === '03' && (
                      <>
                        <path d="M 50 0 L 0 0 L 0 50" stroke="url(#g03l)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        <path d="M 50 0 L 100 0 L 100 50" stroke="url(#g03r)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        <g stroke={station.traceColor} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" style={{ filter: station.traceGlow }}>
                          <path d="M 50 0 L 0 0 L 0 50">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200" keyTimes="0; 0.9375; 0.999; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100" keyTimes="0; 0.9375; 0.999; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                          </path>
                          <path d="M 50 0 L 100 0 L 100 50">
                            <animate attributeName="stroke-dasharray" values="0 200; 0 200; 100 200; 0 200" keyTimes="0; 0.9375; 0.999; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                            <animate attributeName="stroke-dashoffset" values="0; 0; -100; -100" keyTimes="0; 0.9375; 0.999; 1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.2 0 0.8 1; 0 0 1 1" />
                          </path>
                        </g>
                      </>
                    )}
                  </svg>

                  {/* Step badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${station.badgeBg} border ${station.borderColor}`}>
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${station.badgeText} font-sans`}>
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
