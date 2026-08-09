'use client';

import { motion } from 'framer-motion';
import { Search, TrendingUp, Calendar, AlertTriangle, Box } from 'lucide-react';

const MOCK_DATA = [
  { sku: "SKU-W-EARBUDS", name: "Wireless Earbuds Pro", stock: 120, forecast: 450, status: 'critical', confidence: "94%" },
  { sku: "SKU-S-WATCH-2", name: "Smart Watch Gen 2", stock: 850, forecast: 920, status: 'warning', confidence: "88%" },
  { sku: "SKU-L-STAND", name: "Laptop Ergonomic Stand", stock: 430, forecast: 310, status: 'healthy', confidence: "96%" },
  { sku: "SKU-P-BANK-10K", name: "Power Bank 10000mAh", stock: 1200, forecast: 1050, status: 'healthy', confidence: "91%" },
];

export function DemandPlannerMock() {
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
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-foreground">Demand Planner</h2>
          <div className="flex items-center gap-2 text-sm text-indigo-500 font-medium">
            <TrendingUp className="w-4 h-4" />
            AI Forecast generated for Q4 2024
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search SKUs..." 
              className="pl-9 pr-4 py-1.5 rounded-md border border-border bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 transition-all"
            />
          </div>
          <button className="px-3 py-1.5 rounded-md border border-border bg-indigo-500 text-white text-xs font-semibold shadow-sm hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            Export Forecast
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-4 flex-1 min-h-0">
        
        {/* SKU Table */}
        <div className="flex-[2] rounded-xl border border-border/50 bg-background/50 overflow-hidden flex flex-col shadow-sm">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4">Product / SKU</div>
            <div className="col-span-2 text-right">Current Stock</div>
            <div className="col-span-2 text-right">30d Forecast</div>
            <div className="col-span-2 text-center">AI Confidence</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          <div className="flex flex-col overflow-hidden">
            {MOCK_DATA.map((item, i) => (
              <motion.div 
                key={item.sku}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-border/10 hover:bg-muted/10 transition-colors items-center cursor-pointer group"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                    <Box className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-foreground truncate group-hover:text-indigo-500 transition-colors">{item.name}</span>
                    <span className="text-xs text-muted-foreground truncate font-mono">{item.sku}</span>
                  </div>
                </div>
                <div className="col-span-2 text-right text-sm font-medium">
                  {item.stock}
                </div>
                <div className="col-span-2 text-right text-sm font-bold text-indigo-500">
                  {item.forecast}
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    {item.confidence}
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  {item.status === 'critical' && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-md">
                      <AlertTriangle className="w-3.5 h-3.5" /> Stockout Risk
                    </span>
                  )}
                  {item.status === 'warning' && (
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                      Low Buffer
                    </span>
                  )}
                  {item.status === 'healthy' && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                      Optimal
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="flex-[1] hidden lg:flex rounded-xl border border-border/50 bg-background/50 p-5 shadow-sm flex-col gap-6 shrink-0 h-full">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Selected Item</span>
            <span className="text-base font-bold text-foreground">Wireless Earbuds Pro</span>
            <span className="text-xs text-indigo-500 font-mono">SKU-W-EARBUDS</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Projected Depletion</span>
              <span className="font-bold text-rose-500">Nov 24 (10 days)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reorder Recommended</span>
              <span className="font-bold text-foreground">350 Units</span>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="w-full h-32 rounded-lg bg-gradient-to-tr from-rose-500/10 to-transparent border border-rose-500/20 relative overflow-hidden flex items-end">
               {/* Mock tiny chart */}
               <svg className="w-full h-full text-rose-500" viewBox="0 0 100 50" preserveAspectRatio="none">
                 <path d="M0,10 C20,15 40,30 60,35 C80,40 90,45 100,50" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>
            </div>
            <span className="text-[10px] font-semibold text-center text-muted-foreground uppercase tracking-wider">Inventory Depletion Curve</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
