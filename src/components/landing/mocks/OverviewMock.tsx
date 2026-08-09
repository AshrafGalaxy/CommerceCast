'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, IndianRupee, ShoppingCart, Activity, Users, TrendingUp, Download } from 'lucide-react';

const KPIS = [
  { id: 'revenue', title: "Total Revenue", value: "₹24,590,200", trend: "+14.2%", positive: true, icon: <IndianRupee className="w-4 h-4 text-blue-500" /> },
  { id: 'sales', title: "Total Sales", value: "84,392", trend: "+8.1%", positive: true, icon: <ShoppingCart className="w-4 h-4 text-indigo-500" /> },
  { id: 'aov', title: "Avg. Sale Value", value: "₹2,910", trend: "-2.4%", positive: false, icon: <Activity className="w-4 h-4 text-amber-500" /> },
  { id: 'customers', title: "Active Customers", value: "12,403", trend: "+18.9%", positive: true, icon: <Users className="w-4 h-4 text-emerald-500" /> },
];
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, 
  ComposedChart, Scatter, XAxis, YAxis
} from 'recharts';

const REVENUE_DATA = [
  { val: 20 }, { val: 40 }, { val: 30 }, { val: 70 }, { val: 50 }, { val: 90 }, { val: 100 }
];
const SALES_DATA = [
  { val: 40 }, { val: 60 }, { val: 30 }, { val: 80 }, { val: 50 }, { val: 90 }, { val: 70 }, { val: 100 }
];
const AOV_DATA = [
  { val: 60 }, { val: 40 }, { val: 70 }, { val: 30 }, { val: 50 }, { val: 80 }
];
const CUSTOMERS_DATA = [
  { val: 20 }, { val: 50 }, { val: 30 }, { val: 80 }, { val: 40 }, { val: 70 }
];

const CATEGORIES = {
  revenue: [
    { name: "Electronics", pct: "45%" },
    { name: "Apparel", pct: "35%" },
    { name: "Home & Garden", pct: "20%" },
  ],
  sales: [
    { name: "Organic Search", pct: "52%" },
    { name: "Paid Social", pct: "31%" },
    { name: "Direct Traffic", pct: "17%" },
  ],
  aov: [
    { name: "Premium Warranty", pct: "60%" },
    { name: "Gift Packaging", pct: "25%" },
    { name: "Express Shipping", pct: "15%" },
  ],
  customers: [
    { name: "North America", pct: "48%" },
    { name: "Europe (EMEA)", pct: "34%" },
    { name: "Asia-Pacific", pct: "18%" },
  ]
};

interface OverviewMockProps {
  activeKpi: string;
  dateActive: boolean;
  extractHovered: boolean;
  showTooltip: boolean;
  showAiAlert: boolean;
  alertResolved: boolean;
}

export function OverviewMock({ activeKpi, dateActive, extractHovered, showTooltip, showAiAlert, alertResolved }: OverviewMockProps) {
  const activeCategories = CATEGORIES[activeKpi as keyof typeof CATEGORIES];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 h-full"
    >
      {/* Header - Fixed Alignment */}
      <div className="flex justify-between items-end shrink-0">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-foreground">Overview</h2>
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Data synced
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {/* Date Range Dropdown Component */}
          <div className="relative">
            <motion.div 
              animate={{ 
                backgroundColor: dateActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0)',
                borderColor: dateActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.1)'
              }}
              className="px-3 py-1.5 rounded-md border border-border bg-background text-xs font-medium text-muted-foreground shadow-sm hover:text-foreground transition-colors cursor-pointer"
            >
              Last 30 Days
            </motion.div>
            <AnimatePresence>
              {dateActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1.5 right-0 w-36 bg-background border border-border rounded-lg shadow-lg z-30 p-1 flex flex-col"
                >
                  <div className="px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/50 rounded-md cursor-pointer transition-colors">Last 7 Days</div>
                  <div className="px-2 py-1.5 text-left text-xs text-indigo-500 font-medium bg-indigo-500/10 rounded-md cursor-pointer transition-colors flex items-center justify-between">
                    Last 30 Days
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </div>
                  <div className="px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/50 rounded-md cursor-pointer transition-colors">Year to Date</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Report Button Component */}
          <div className="relative">
            <motion.div 
              className={`px-3 py-1.5 rounded-md border text-xs font-medium shadow-sm flex items-center gap-2 transition-colors cursor-pointer ${
                extractHovered 
                  ? 'bg-muted border-white/20 text-foreground' 
                  : 'bg-background border-white/10 text-muted-foreground'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Extract Report
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Action Alert Banner */}
      <AnimatePresence>
        {showAiAlert && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="overflow-hidden shrink-0"
          >
            <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-colors duration-500 ${alertResolved ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${alertResolved ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
                  {alertResolved ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-sm font-bold ${alertResolved ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {alertResolved ? 'Inventory Reallocated' : 'High Stockout Risk: Premium Leather Bag'}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {alertResolved ? 'AI automatically optimized supply chain routing to prevent shortfalls.' : 'Predicted to stock out in 14 days due to +42% demand spike.'}
                  </span>
                </div>
              </div>
              
              {!alertResolved && (
                <div className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                  Auto-Optimize
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPIs Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {KPIS.map((kpi) => {
          const isActive = activeKpi === kpi.id;
          return (
            <motion.div
              key={kpi.title}
              animate={{
                borderColor: isActive ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255,255,255,0.1)',
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0)',
                y: isActive ? -4 : 0,
                boxShadow: isActive ? '0 10px 25px -5px rgba(99, 102, 241, 0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)'
              }}
              transition={{ duration: 0.4 }}
              className={`p-3 xl:p-4 rounded-xl border flex flex-col gap-2 cursor-pointer ${!isActive && 'bg-background/50 hover:bg-background/80'}`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs xl:text-sm font-semibold ${isActive ? 'text-indigo-500' : 'text-foreground'}`}>
                  {kpi.title}
                </span>
                <div className={`w-6 h-6 xl:w-7 xl:h-7 rounded-lg flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-indigo-500/20' : 'bg-muted/30'}`}>
                  {kpi.icon}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg xl:text-xl font-extrabold text-foreground tracking-tight leading-none">{kpi.value}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none flex items-center ${kpi.positive ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50' : 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-950/50'}`}>
                  {kpi.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Main Line Chart */}
        <div className="flex-[2] rounded-xl border border-border/50 bg-background/50 p-4 xl:p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden h-full">
          <div className="flex justify-between items-start z-10 shrink-0">
            <div className="flex flex-col items-start gap-1">
              <span className="text-base font-bold text-foreground capitalize">{activeKpi} Forecast</span>
              <span className="text-sm text-muted-foreground">Real-time AI predictive modeling</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full mt-2 z-10 overflow-hidden rounded-b-xl">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full border-b border-foreground/50 border-dashed" />
              ))}
            </div>
            
            {/* Interactive Chart Tooltip (Hover Simulation) */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: 250 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute top-[20%] left-0 z-20 bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl"
                >
                  <div className="text-xs text-muted-foreground font-medium mb-1">Nov 14, 2024</div>
                  <div className="text-lg font-bold text-foreground">
                    {activeKpi === 'sales' ? '1,492 Units' : '₹492,100'}
                  </div>
                  <div className="text-[10px] text-indigo-500 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> AI +12% Confidence
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          <div className="h-[250px] sm:h-[300px] w-full mt-4 relative">
            
            {/* Revenue Chart */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activeKpi === 'revenue' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Sales Chart */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activeKpi === 'sales' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="val" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AOV Chart */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activeKpi === 'aov' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={AOV_DATA} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#f59e0b" 
                    strokeWidth={4} 
                    dot={{ stroke: '#d97706', strokeWidth: 2, r: 5, fill: '#fff' }} 
                    activeDot={{ r: 8, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }} 
                    isAnimationActive={true} 
                    animationDuration={1000} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Customers Chart */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${activeKpi === 'customers' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CUSTOMERS_DATA} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCust" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCust)" dot={{ stroke: '#047857', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
          </div></div>
        </div>
        
        {/* Secondary Sidebar Chart */}
        <div className="flex-[1] hidden md:flex rounded-xl border border-border/50 bg-background/50 p-4 xl:p-5 shadow-sm flex-col gap-3 shrink-0 h-full">
          <span className="text-sm xl:text-base font-bold text-foreground shrink-0">Top Drivers</span>
          <div className="flex flex-col gap-3 xl:gap-4 mt-1 overflow-hidden flex-1 justify-around">
            {activeCategories.map((item) => (
              <div 
                key={item.name}
                className="flex flex-col gap-2"
              >
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-foreground">{item.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-indigo-500 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: item.pct }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
