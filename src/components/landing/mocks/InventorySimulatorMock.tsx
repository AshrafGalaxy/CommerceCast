'use client';

import { motion } from 'framer-motion';
import { Target, Settings2, RefreshCw, Zap, TrendingUp, AlertCircle } from 'lucide-react';

export function InventorySimulatorMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-end shrink-0">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-foreground">Inventory Simulator</h2>
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-medium">
            <Zap className="w-4 h-4" />
            What-If Scenario Sandbox
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-md border border-border bg-background/50 hover:bg-muted text-foreground text-xs font-semibold transition-colors flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button className="px-3 py-1.5 rounded-md border border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 text-xs font-semibold transition-colors flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5" />
            Save Scenario
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Controls Sidebar */}
        <div className="flex-[1] rounded-xl border border-border/50 bg-background/50 p-6 flex flex-col gap-6 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 pb-4 border-b border-border/50">
            <Target className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-foreground">Scenario Parameters</span>
          </div>

          <div className="flex flex-col gap-5">
            {/* Control 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Marketing Spend</span>
                <span className="text-indigo-500 font-mono">+40%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[70%] bg-indigo-500 rounded-full" />
                <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-md cursor-grab" />
              </div>
            </div>

            {/* Control 2 */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Supplier Lead Time</span>
                <span className="text-rose-500 font-mono">+14 Days</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[85%] bg-rose-500 rounded-full" />
                <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-rose-500 rounded-full shadow-md cursor-grab" />
              </div>
            </div>

            {/* Control 3 */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Price Discount</span>
                <span className="text-emerald-500 font-mono">15% Off</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[30%] bg-emerald-500 rounded-full" />
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-emerald-500 rounded-full shadow-md cursor-grab" />
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">High Stockout Risk</span>
              <span className="text-xs text-amber-600/80 dark:text-amber-400/80 leading-relaxed">
                Increasing marketing spend by 40% while facing a 14-day supplier delay creates a 92% probability of stockouts across top SKUs.
              </span>
            </div>
          </div>
        </div>

        {/* Simulator Charts */}
        <div className="flex-[2] flex flex-col gap-4 min-h-0">
          
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col gap-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Projected Revenue</span>
              <span className="text-2xl font-extrabold text-emerald-500">₹32.4M</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 self-start px-2 py-0.5 rounded-full mt-1">+24% vs Baseline</span>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col gap-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Projected Stockouts</span>
              <span className="text-2xl font-extrabold text-rose-500">14 SKUs</span>
              <span className="text-xs font-medium text-rose-600 bg-rose-500/10 self-start px-2 py-0.5 rounded-full mt-1">Critical Warning</span>
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-border/50 bg-background/50 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
             <div className="flex justify-between items-center z-10">
                <span className="text-base font-bold text-foreground">Inventory Depletion Trajectory</span>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-muted-foreground" /> Baseline
                  </div>
                  <div className="flex items-center gap-2 text-indigo-500">
                    <div className="w-3 h-0.5 bg-indigo-500" /> Simulated
                  </div>
                </div>
             </div>

             <div className="flex-1 relative w-full mt-4 z-10 overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-full border-b border-foreground/50 border-dashed" />
                  ))}
                </div>

                <svg className="absolute inset-0 w-full h-full overflow-hidden" viewBox="0 0 400 120" preserveAspectRatio="none">
                  {/* Baseline Path */}
                  <path d="M0,20 C100,25 200,40 300,50 C350,55 380,60 400,65" fill="none" className="text-muted-foreground/40" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                  
                  {/* Simulated Path (Steeper depletion) */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M0,20 C80,30 150,60 220,90 C250,105 280,120 310,120 L400,120" 
                    fill="none" 
                    className="text-indigo-500" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    vectorEffect="non-scaling-stroke" 
                    strokeLinecap="round" 
                  />
                  
                  {/* Stockout Zone */}
                  <rect x="0" y="100" width="400" height="20" fill="currentColor" className="text-rose-500/10" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" className="text-rose-500/30" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                  <text x="390" y="112" fontSize="8" fill="currentColor" className="text-rose-500 font-bold" textAnchor="end">STOCKOUT THRESHOLD</text>
                </svg>
             </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
