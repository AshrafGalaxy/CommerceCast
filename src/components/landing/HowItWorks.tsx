'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, LineChart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  { path: "M 0 400 H 200 H 600 H 1000 H 1200", class: "stroke-blue-600 dark:stroke-blue-500", dur: "3s", delay: "0s", dash: "10 300" },
  { path: "M 0 400 H 200 H 600 H 1000 H 1200", class: "stroke-violet-600 dark:stroke-violet-400", dur: "3s", delay: "1.5s", dash: "5 300" },
  { path: "M 100 0 V 200 H 200 V 400", class: "stroke-emerald-600 dark:stroke-emerald-400", dur: "2s", delay: "0.5s", dash: "4 150" },
  { path: "M 300 0 V 150 H 500 V 400 H 600", class: "stroke-blue-600 dark:stroke-blue-500", dur: "2.5s", delay: "1s", dash: "6 200" },
  { path: "M 700 800 V 600 H 600 V 400", class: "stroke-violet-600 dark:stroke-violet-400", dur: "2s", delay: "0.2s", dash: "8 180" },
  { path: "M 0 200 H 300 V 400 H 600", class: "stroke-blue-600 dark:stroke-blue-500", dur: "3.5s", delay: "0s", dash: "4 250" },
  { path: "M 1200 150 H 800 V 400 H 600", class: "stroke-amber-500", dur: "2.8s", delay: "0.7s", dash: "5 220" },
  { path: "M 1200 650 H 950 V 400 H 1000", class: "stroke-emerald-600 dark:stroke-emerald-400", dur: "2.2s", delay: "1.2s", dash: "3 160" },
  { path: "M 400 800 V 500 H 600 V 400", class: "stroke-blue-600 dark:stroke-blue-500", dur: "2.4s", delay: "0.4s", dash: "6 190" },
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
      {/* Background dots for tech vibe, adapting to light/dark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px]" />
      
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-headline text-foreground drop-shadow-sm dark:drop-shadow-lg">
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
                
                {/* Node gradients that work in both themes */}
                <radialGradient id="node1-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" className="stop-color-blue-500" stopOpacity="0.4" />
                  <stop offset="100%" className="stop-color-blue-500" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="node2-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" className="stop-color-violet-500" stopOpacity="0.4" />
                  <stop offset="100%" className="stop-color-violet-500" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="node3-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" className="stop-color-emerald-500" stopOpacity="0.4" />
                  <stop offset="100%" className="stop-color-emerald-500" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Static Background Traces (Adapts to light/dark via stroke-border) */}
              <g className="stroke-border opacity-60">
                {traces.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              {/* Active Scroll Trace */}
              <motion.path
                d="M 0 400 H 200 H 600 H 1000 H 1200"
                fill="none"
                className="stroke-blue-500 dark:stroke-blue-400"
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
                  className={cn(surge.class, "opacity-80 drop-shadow-md")}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={surge.dash}
                  filter="url(#glow)"
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

              {/* --- ADVANCED PROCESSOR NODES --- */}

              {/* Node 1: Ingestion (Left) - Data packets flowing in */}
              <g transform="translate(200, 400)">
                <circle r="45" fill="url(#node1-glow)" className="animate-pulse" />
                <circle r="24" className="fill-background stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" filter="url(#glow)" />
                {/* Rotating dashed ring */}
                <motion.circle r="34" fill="none" className="stroke-blue-500/50" strokeWidth="2" strokeDasharray="6 6"
                  animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <circle r="8" className="fill-blue-500 dark:fill-blue-400" />
              </g>

              {/* Node 2: Core Processor (Center) - Breathing AI Core */}
              <g transform="translate(600, 400)">
                <circle r="80" fill="url(#node2-glow)" />
                <motion.rect x="-40" y="-40" width="80" height="80" rx="16" className="fill-background stroke-violet-600 dark:stroke-violet-400" strokeWidth="2" filter="url(#glow-intense)" 
                  animate={{ rotate: [0, 90], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                />
                <motion.rect x="-25" y="-25" width="50" height="50" rx="8" className="fill-violet-500/10 stroke-violet-500/60" strokeWidth="1" 
                  animate={{ rotate: [45, -45] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Inner Core */}
                <motion.circle r="12" className="fill-violet-600 dark:fill-violet-400" filter="url(#glow)" 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>

              {/* Node 3: Output (Right) - Radial expanding waves */}
              <g transform="translate(1000, 400)">
                <circle r="45" fill="url(#node3-glow)" />
                
                {/* Expanding waves */}
                <motion.circle r="20" fill="none" className="stroke-emerald-500" strokeWidth="2"
                  animate={{ r: [20, 60], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle r="20" fill="none" className="stroke-emerald-500" strokeWidth="2"
                  animate={{ r: [20, 60], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />

                <circle r="24" className="fill-background stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" filter="url(#glow)" />
                <polygon points="0,-8 8,4 -8,4" className="fill-emerald-600 dark:fill-emerald-400" transform="rotate(90) translate(0, 2)" />
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
            className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] w-[260px] p-5 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-lg z-10 group hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">N-01 Data IN</span>
            </div>
            <h3 className="text-lg font-bold text-card-foreground mb-2 leading-tight">Connect your store</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One-click integrations with Shopify, Amazon, WooCommerce. Data synced instantly.
            </p>
          </motion.div>

          {/* Panel 2 (Core) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-[5%] left-[50%] -translate-x-1/2 md:bottom-[15%] w-[300px] p-5 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-xl z-10 group hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all shadow-sm">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">N-02 AI CORE</span>
            </div>
            <h3 className="text-lg font-bold text-card-foreground mb-2 leading-tight">Models learn your business</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ensemble engine ingests sales history, identifying seasonality, promotions, and anomalies.
            </p>
          </motion.div>

          {/* Panel 3 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-[10%] right-[5%] md:top-[20%] md:right-[10%] w-[260px] p-5 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-lg z-10 group hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-sm">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">N-03 ACTION OUT</span>
            </div>
            <h3 className="text-lg font-bold text-card-foreground mb-2 leading-tight">Act on intelligence</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get daily forecasts, smart reorder alerts, and margin-safe promotion plans.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
