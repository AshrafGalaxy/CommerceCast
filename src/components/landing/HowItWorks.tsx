'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, LineChart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      {/* Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-20"
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
        <div className="relative w-full max-w-[1200px] h-[500px] mx-auto" ref={containerRef}>
          
          {/* SVG Canvas for Traces & Nodes */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                {/* Node gradients */}
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

              {/* Static Background Grid (Minimalist) */}
              <g className="stroke-border opacity-50">
                <path d="M 0 250 H 1200" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 200 0 V 500 M 600 0 V 500 M 1000 0 V 500" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              </g>

              {/* Main Connecting Track */}
              <path
                d="M 200 250 H 1000"
                fill="none"
                className="stroke-muted-foreground/30"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Active Scroll Trace */}
              <motion.path
                d="M 200 250 H 1000"
                fill="none"
                className="stroke-blue-500 dark:stroke-blue-400"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength, opacity }}
                filter="url(#glow)"
              />

              {/* Sequential Power Surges (1 -> 2 -> 3) */}
              
              {/* Surge from 1 to 2 */}
              <path
                d="M 200 250 H 600"
                fill="none"
                className="stroke-blue-500 dark:stroke-blue-400 opacity-90 drop-shadow-md"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="20 400"
                filter="url(#glow)"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  from="420" 
                  to="0" 
                  dur="1.5s"
                  begin="0s" 
                  repeatCount="indefinite" 
                />
              </path>

              {/* Surge from 2 to 3 */}
              <path
                d="M 600 250 H 1000"
                fill="none"
                className="stroke-violet-500 dark:stroke-violet-400 opacity-90 drop-shadow-md"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="20 400"
                filter="url(#glow)"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  from="420" 
                  to="0" 
                  dur="1.5s"
                  begin="0.75s" 
                  repeatCount="indefinite" 
                />
              </path>

              {/* --- NODES --- */}

              {/* Node 1: Ingestion (Left) */}
              <g transform="translate(200, 250)">
                <circle r="45" fill="url(#node1-glow)" className="animate-pulse" />
                <circle r="20" className="fill-background stroke-blue-500 dark:stroke-blue-400" strokeWidth="3" filter="url(#glow)" />
                <circle r="6" className="fill-blue-500 dark:fill-blue-400" />
              </g>

              {/* Node 2: Core Processor (Center) - No rotation */}
              <g transform="translate(600, 250)">
                <circle r="60" fill="url(#node2-glow)" />
                <rect x="-25" y="-25" width="50" height="50" rx="10" className="fill-background stroke-violet-600 dark:stroke-violet-400" strokeWidth="3" filter="url(#glow-intense)" />
                {/* Inner Core */}
                <motion.circle r="10" className="fill-violet-600 dark:fill-violet-400" filter="url(#glow)" 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>

              {/* Node 3: Output (Right) */}
              <g transform="translate(1000, 250)">
                <circle r="45" fill="url(#node3-glow)" />
                
                {/* Expanding waves */}
                <motion.circle r="20" fill="none" className="stroke-emerald-500" strokeWidth="2"
                  animate={{ r: [20, 60], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                
                <circle r="20" className="fill-background stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="3" filter="url(#glow)" />
                <circle r="6" className="fill-emerald-600 dark:fill-emerald-400" />
              </g>
            </svg>
          </div>

          {/* Floating HUD Panels for Text Descriptions */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start h-full relative z-10 space-y-8 md:space-y-0 md:pt-10">
            
            {/* Panel 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[280px] p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-lg group hover:-translate-y-1 transition-transform mx-auto md:mx-0 md:-ml-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-sm">
                  <Database className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2 leading-tight">Connect your store</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One-click integrations with Shopify, Amazon, WooCommerce. Data synced instantly.
              </p>
            </motion.div>

            {/* Panel 2 (Core) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-[280px] p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-xl group hover:-translate-y-1 transition-transform mx-auto md:mx-0 mt-8 md:mt-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all shadow-sm">
                  <BrainCircuit className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2 leading-tight">Models learn</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ensemble engine ingests sales history, identifying seasonality, promotions, and anomalies.
              </p>
            </motion.div>

            {/* Panel 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-[280px] p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-lg group hover:-translate-y-1 transition-transform mx-auto md:mx-0 md:-mr-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-sm">
                  <LineChart className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2 leading-tight">Act on intelligence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Receive proactive alerts and precise inventory restock recommendations via dashboard or API.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
