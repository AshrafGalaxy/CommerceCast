'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, LineChart, Zap } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Database,
    title: 'Connect your store',
    description:
      'One-click integrations with Shopify, Amazon, WooCommerce. Data synced instantly.',
    align: 'left',
  },
  {
    step: '02',
    icon: BrainCircuit,
    title: 'Models learn your business',
    description:
      'Ensemble engine ingests sales history, identifying seasonality & anomalies.',
    align: 'center',
  },
  {
    step: '03',
    icon: LineChart,
    title: 'Act on live intelligence',
    description:
      'Get daily forecasts, reorder alerts, and margin-safe promotion plans.',
    align: 'right',
  },
];

// Complex orthogonal traces (microchip PCB style)
const traces = [
  "M 0 400 H 200 H 600 H 1000 H 1200", // Main horizontal spine
  "M 100 0 V 200 H 200 V 400", // Top left to N1
  "M 300 0 V 150 H 500 V 400 H 600", // Top mid-left to N2
  "M 900 0 V 250 H 1000 V 400", // Top right to N3
  "M 700 800 V 600 H 600 V 400", // Bottom right to N2
  "M 400 800 V 500 H 600 V 400", // Bottom left to N2
  "M 1100 800 V 600 H 1000 V 400", // Bottom far-right to N3
  "M 0 200 H 300 V 400 H 600", // Left side branch to N2
  "M 0 600 H 150 V 400 H 200", // Bottom left to N1
  "M 1200 150 H 800 V 400 H 600", // Right side top branch to N2
  "M 1200 650 H 950 V 400 H 1000", // Right side bottom branch to N3
  // Extra background decorative traces
  "M 50 0 V 800",
  "M 1150 0 V 800",
  "M 0 50 H 1200",
  "M 0 750 H 1200",
];

// Specific paths for glowing electricity to travel
const surges = [
  { path: "M 0 400 H 200 H 600 H 1000 H 1200", color: "#3B82F6", dur: "3s", delay: "0s", dash: "10 300" },
  { path: "M 0 400 H 200 H 600 H 1000 H 1200", color: "#A78BFA", dur: "3s", delay: "1.5s", dash: "5 300" },
  { path: "M 100 0 V 200 H 200 V 400", color: "#22C55E", dur: "2s", delay: "0.5s", dash: "4 150" },
  { path: "M 300 0 V 150 H 500 V 400 H 600", color: "#3B82F6", dur: "2.5s", delay: "1s", dash: "6 200" },
  { path: "M 700 800 V 600 H 600 V 400", color: "#A78BFA", dur: "2s", delay: "0.2s", dash: "8 180" },
  { path: "M 0 200 H 300 V 400 H 600", color: "#3B82F6", dur: "3.5s", delay: "0s", dash: "4 250" },
  { path: "M 1200 150 H 800 V 400 H 600", color: "#EAB308", dur: "2.8s", delay: "0.7s", dash: "5 220" },
  { path: "M 1200 650 H 950 V 400 H 1000", color: "#22C55E", dur: "2.2s", delay: "1.2s", dash: "3 160" },
  { path: "M 400 800 V 500 H 600 V 400", color: "#3B82F6", dur: "2.4s", delay: "0.4s", dash: "6 190" },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-32 bg-background overflow-hidden text-foreground">
      {/* Background dots for tech vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] uppercase tracking-[0.3em] font-semibold mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5" />
            Live Processing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-headline text-foreground drop-shadow-lg">
            From data to decisions in minutes
          </h2>
        </motion.div>

        {/* The Processor Grid */}
        <div className="relative w-full max-w-[1200px] h-[600px] md:h-[800px] mx-auto mt-10 md:mt-0" ref={containerRef}>
          
          {/* SVG Canvas for Traces & Nodes */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Static Background Traces */}
              {traces.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              ))}

              {/* Active Scroll Trace */}
              <motion.path
                d="M 0 400 H 200 H 600 H 1000 H 1200"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                style={{ pathLength, opacity }}
                filter="url(#glow)"
              />

              {/* Power Surges (Electricity) */}
              {surges.map((surge, i) => (
                <path
                  key={`surge-${i}`}
                  d={surge.path}
                  fill="none"
                  stroke={surge.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={surge.dash}
                  filter="url(#glow)"
                  className="opacity-80"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="1000" 
                    to="-1000" 
                    dur={surge.dur} 
                    begin={surge.delay} 
                    repeatCount="indefinite" 
                  />
                </path>
              ))}

              {/* --- PROCESSOR NODES --- */}

              {/* Node 1: Ingestion (Left) */}
              <g transform="translate(200, 400)">
                <circle r="24" fill="#0f172a" stroke="#3B82F6" strokeWidth="2" filter="url(#glow)" />
                <circle r="12" fill="#3B82F6" className="animate-pulse" />
              </g>

              {/* Node 2: Core Processor (Center) */}
              <g transform="translate(600, 400)">
                <rect x="-40" y="-40" width="80" height="80" rx="12" fill="#0f172a" stroke="#A78BFA" strokeWidth="3" filter="url(#glow-intense)" className="animate-[pulse_3s_ease-in-out_indefinite]" />
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="rgba(167,139,250,0.1)" stroke="#A78BFA" strokeWidth="1" />
                <path d="M -20 -20 L 20 20 M 20 -20 L -20 20" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                <circle r="16" fill="#A78BFA" filter="url(#glow)" />
              </g>

              {/* Node 3: Output (Right) */}
              <g transform="translate(1000, 400)">
                <circle r="24" fill="#0f172a" stroke="#22C55E" strokeWidth="2" filter="url(#glow)" />
                <polygon points="0,-12 12,6 -12,6" fill="#22C55E" transform="rotate(90) translate(0, 2)" className="animate-pulse" />
              </g>
            </svg>
          </div>

          {/* Floating HUD Panels for Text Descriptions */}
          {/* Panel 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] w-[260px] p-5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.1)] z-10 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">N-01 Data IN</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">Connect your store</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              One-click integrations with Shopify, Amazon, WooCommerce. Data synced instantly.
            </p>
          </motion.div>

          {/* Panel 2 (Core) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-[5%] left-[50%] -translate-x-1/2 md:bottom-[15%] w-[300px] p-5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_40px_rgba(167,139,250,0.15)] z-10 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">N-02 AI CORE</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">Models learn your business</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ensemble engine ingests sales history, identifying seasonality, promotions, and anomalies.
            </p>
          </motion.div>

          {/* Panel 3 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-[10%] right-[5%] md:top-[20%] md:right-[10%] w-[260px] p-5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-slate-800 shadow-[0_0_30px_rgba(34,197,94,0.1)] z-10 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400 group-hover:scale-110 group-hover:bg-green-500/30 transition-all">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest">N-03 ACTION OUT</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">Act on intelligence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get daily forecasts, smart reorder alerts, and margin-safe promotion plans.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
