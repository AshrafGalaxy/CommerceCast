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
          className="text-[9px] text-blue-400 font-sans font-bold"
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
              style={{ backgroundColor: `rgba(59, 130, 246, ${val})` }}
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
          <TrendingUp className="w-3 h-3 text-blue-400" />
          <motion.span
            className="text-[9px] text-blue-400 font-sans font-bold"
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
                ? 'linear-gradient(to top, #3b82f6, #60a5fa)'
                : 'rgba(59,130,246,0.35)',
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
const PipelineSVG = ({ pathLength, opacity }: { pathLength: any, opacity: any }) => {
  // PCB Routing paths for a microprocessor look
  const trackCenter1 = "M 200 140 H 600";
  const trackCenter2 = "M 600 140 H 1000";
  
  const t1_top = "M 200 140 L 250 110 H 350 L 400 140 L 450 110 H 550 L 600 140";
  const t1_bot = "M 200 140 L 250 170 H 350 L 400 140 L 450 170 H 550 L 600 140";
  const t2_top = "M 600 140 L 650 110 H 750 L 800 140 L 850 110 H 950 L 1000 140";
  const t2_bot = "M 600 140 L 650 170 H 750 L 800 140 L 850 170 H 950 L 1000 140";

  return (
    <svg className="w-full h-full" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="hw-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="hw-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === BACKGROUND PCB === */}
      <g stroke="currentColor" className="text-blue-500/20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d={t1_top} />
        <path d={t1_bot} />
        <path d={t2_top} />
        <path d={t2_bot} />
        <path d={trackCenter1} strokeWidth="2" className="text-blue-500/30" />
        <path d={trackCenter2} strokeWidth="2" className="text-blue-500/30" />
        
        {/* Terminal drops */}
        <path d="M 200 280 V 140" strokeWidth="1.5" />
        <path d="M 590 280 V 140" strokeWidth="1.5" />
        <path d="M 610 140 V 280" strokeWidth="1.5" />
        <path d="M 1000 140 V 280" strokeWidth="1.5" />
      </g>

      {/* === ANIMATED TRACES (Electric Current) === */}
      
      {/* 1. UP from Card 1 */}
      <path d="M 200 280 V 140" stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 140" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="140" to="-15" dur="1s" repeatCount="indefinite" />
      </path>

      {/* 2. Across to Node 2 */}
      <path d={t1_top} stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="10 4 2 400" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </path>
      <path d={trackCenter1} stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 5 5 400" filter="url(#hw-glow)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
      </path>
      <path d={t1_bot} stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 2 10 400" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" begin="0.8s" repeatCount="indefinite" />
      </path>

      {/* 3. DOWN to Card 2 */}
      <path d="M 610 140 V 280" stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 140" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="15" to="-140" dur="1s" begin="1.5s" repeatCount="indefinite" />
      </path>

      {/* 4. UP from Card 2 */}
      <path d="M 590 280 V 140" stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 140" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="140" to="-15" dur="1s" begin="2.5s" repeatCount="indefinite" />
      </path>

      {/* 5. Across to Node 3 */}
      <path d={t2_top} stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="10 4 2 400" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" begin="3s" repeatCount="indefinite" />
      </path>
      <path d={trackCenter2} stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 5 5 400" filter="url(#hw-glow)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1.5s" begin="2.5s" repeatCount="indefinite" />
      </path>
      <path d={t2_bot} stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 2 10 400" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" begin="3.2s" repeatCount="indefinite" />
      </path>

      {/* 6. DOWN to Card 3 */}
      <path d="M 1000 140 V 280" stroke="#60A5FA" strokeWidth="2" strokeDasharray="15 140" filter="url(#hw-glow-sm)">
        <animate attributeName="stroke-dashoffset" from="15" to="-140" dur="1s" begin="4s" repeatCount="indefinite" />
      </path>

      {/* === NODES === */}
      {/* Node 1 */}
      <g transform="translate(200, 140)">
        <circle r="34" fill="url(#node-glow)" />
        <circle r="16" className="fill-card" stroke="#3B82F6" strokeWidth="2" filter="url(#hw-glow-sm)" />
        <circle r="6" fill="#3B82F6" filter="url(#hw-glow-sm)" />
      </g>
      
      {/* Node 1A (Intermediate) */}
      <g transform="translate(400, 140)">
        <circle r="8" className="fill-card" stroke="#3B82F6" strokeWidth="1.5" />
        <circle r="3" fill="#3B82F6" />
      </g>

      {/* Node 2 */}
      <g transform="translate(600, 140)">
        <circle r="54" fill="url(#node-glow)" />
        <circle r="26" className="fill-card" stroke="#3B82F6" strokeWidth="2.5" filter="url(#hw-glow)" />
        <circle r="36" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.6" />
        <motion.circle r="10" fill="#3B82F6" filter="url(#hw-glow)"
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* Node 2A (Intermediate) */}
      <g transform="translate(800, 140)">
        <circle r="8" className="fill-card" stroke="#3B82F6" strokeWidth="1.5" />
        <circle r="3" fill="#3B82F6" />
      </g>

      {/* Node 3 */}
      <g transform="translate(1000, 140)">
        <circle r="34" fill="url(#node-glow)" />
        <motion.circle r="16" fill="none" stroke="#3B82F6" strokeWidth="1.5"
          animate={{ r: [16, 32], opacity: [0.7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle r="16" className="fill-card" stroke="#3B82F6" strokeWidth="2" filter="url(#hw-glow-sm)" />
        <circle r="6" fill="#3B82F6" filter="url(#hw-glow-sm)" />
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
  },
  {
    step: '02',
    label: 'Process',
    title: 'AI Ensemble Forecasting',
    desc: 'Our Python FastAPI backend processes data through Prophet, XGBoost, and ARIMA to detect complex seasonal trends and anomalies.',
    color: 'blue',
    icon: Cpu,
    preview: AIPreview,
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/10',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    step: '03',
    label: 'Decide',
    title: 'Act on intelligence',
    desc: 'Receive proactive alerts, precise restock recommendations, and promotional playbooks — delivered to your dashboard or API.',
    color: 'blue',
    icon: LineChart,
    preview: OutputPreview,
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/10',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
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
                  className={`group relative flex flex-col rounded-2xl border ${station.borderColor} bg-card/80 backdrop-blur-xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl ${station.glowColor} overflow-hidden`}
                >
                  {/* SVG Border Overlays for complex routing flow */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {station.step === '01' && (
                      <>
                        <path d="M 0 50 L 0 0 L 50 0" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 100 50 L 100 0 L 50 0" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 0 50 L 0 0 L 50 0" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 150">
                          <animate attributeName="stroke-dashoffset" from="20" to="-100" dur="1s" repeatCount="indefinite" />
                        </path>
                        <path d="M 100 50 L 100 0 L 50 0" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 150">
                          <animate attributeName="stroke-dashoffset" from="20" to="-100" dur="1s" repeatCount="indefinite" />
                        </path>
                      </>
                    )}
                    {station.step === '02' && (
                      <>
                        <path d="M 50 0 L 0 0 L 0 50" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 50 0 L 100 0 L 100 50" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 50 0 L 0 0 L 0 50" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 200">
                          <animate attributeName="stroke-dashoffset" values="20; -100; 20" dur="2s" begin="1.5s" repeatCount="indefinite" />
                        </path>
                        <path d="M 50 0 L 100 0 L 100 50" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 200">
                          <animate attributeName="stroke-dashoffset" values="20; -100; 20" dur="2s" begin="1.5s" repeatCount="indefinite" />
                        </path>
                      </>
                    )}
                    {station.step === '03' && (
                      <>
                        <path d="M 50 0 L 0 0 L 0 100" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 50 0 L 100 0 L 100 100" stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" opacity="0.3" />
                        <path d="M 50 0 L 0 0 L 0 100" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 200">
                          <animate attributeName="stroke-dashoffset" from="20" to="-150" dur="1.5s" begin="4s" repeatCount="indefinite" />
                        </path>
                        <path d="M 50 0 L 100 0 L 100 100" stroke="#60A5FA" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="20 200">
                          <animate attributeName="stroke-dashoffset" from="20" to="-150" dur="1.5s" begin="4s" repeatCount="indefinite" />
                        </path>
                      </>
                    )}
                  </svg>

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
