'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Store,
  Database,
  TrendingUp,
  Boxes,
  Percent,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  FileSpreadsheet,
  Layers,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/ui/Logo';

function BespokeDataPackIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 10L17 6" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M10 10V18" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M10 10L3 6" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="#3B82F6" />
    </svg>
  );
}

function BespokeRocketIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M10 2C13 4 15 8 15 12L10 15L5 12C5 8 7 4 10 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 12L2 14L4 17L7 16" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M15 12L18 14L16 17L13 16" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="10" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Supported E-Commerce platforms
const PLATFORMS = [
  { id: 'shopify', name: 'Shopify', desc: 'Direct API & Webhooks', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'woocommerce', name: 'WooCommerce', desc: 'REST API & Plugin', color: 'text-violet-500 bg-violet-500/10 border-violet-500/30' },
  { id: 'amazon', name: 'Amazon Seller', desc: 'SP-API Orders', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  { id: 'sheets', name: 'Google Sheets / CSV', desc: 'Live Sheet & Files', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' },
];

// Strategic Goals
const GOALS = [
  {
    id: 'forecasting',
    title: 'AI Demand Forecasting',
    desc: 'Predict weekly sales spikes, seasonality, and long-range demand with hybrid ensemble models.',
    icon: TrendingUp,
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    id: 'inventory',
    title: 'Inventory & Reorder Intelligence',
    desc: 'Automate ABC classification, eliminate dead inventory, and calculate exact safety stock thresholds.',
    icon: Boxes,
    color: 'text-violet-500 bg-violet-500/10',
  },
  {
    id: 'promotions',
    title: 'Smart Promotion Simulator',
    desc: 'Model price elasticity of demand to project revenue lift and net ROI before launching discounts.',
    icon: Percent,
    color: 'text-emerald-500 bg-emerald-500/10',
  },
];

// Generates rich 90-day realistic sample retail dataset CSV
function generateSampleCSV(storeName: string): string {
  const categories = ['Electronics', 'Apparel', 'Home & Living', 'Accessories'];
  const products = [
    { name: 'Ultra-Comfort Wool Hoodie', sku: 'APP-101', cat: 'Apparel', price: 85, cost: 32 },
    { name: 'AeroNoise Pro Headphones', sku: 'ELE-202', cat: 'Electronics', price: 199, cost: 78 },
    { name: 'Smart Minimalist Desk Lamp', sku: 'HOM-303', cat: 'Home & Living', price: 65, cost: 24 },
    { name: 'Ergonomic Titanium Water Bottle', sku: 'ACC-404', cat: 'Accessories', price: 42, cost: 14 },
    { name: 'Performance Track Pants', sku: 'APP-105', cat: 'Apparel', price: 75, cost: 28 },
    { name: 'Wireless Fast Charge Pad', sku: 'ELE-206', cat: 'Electronics', price: 39, cost: 12 },
  ];

  const lines = [
    `# Metadata: Company=${storeName || 'Demo Store'}, Source=SampleDataset, Currency=USD`,
    'Date,Product Name,SKU,Category,Units Sold,Unit Price,Unit Cost,Revenue,Gross Profit,Region,Payment Method',
  ];

  const now = new Date();
  for (let d = 89; d >= 0; d--) {
    const currentDate = new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
    const dateStr = currentDate.toISOString().split('T')[0];
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

    products.forEach((p) => {
      // Base demand with slight upward trend and weekend lift
      const baseUnits = Math.floor(Math.random() * 8) + 4;
      const trendMultiplier = 1 + (90 - d) / 300;
      const weekendMultiplier = isWeekend ? 1.4 : 1.0;
      const units = Math.max(1, Math.round(baseUnits * trendMultiplier * weekendMultiplier));

      const rev = units * p.price;
      const profit = units * (p.price - p.cost);
      const regions = ['North America', 'Europe', 'Asia Pacific'];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const payments = ['Credit Card', 'PayPal', 'Apple Pay', 'Shop Pay'];
      const payment = payments[Math.floor(Math.random() * payments.length)];

      lines.push(
        `${dateStr},"${p.name}",${p.sku},${p.cat},${units},${p.price},${p.cost},${rev},${profit},${region},${payment}`
      );
    });
  }

  return lines.join('\n');
}

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Form State
  const [storeName, setStoreName] = useState('');
  const [platform, setPlatform] = useState('shopify');
  const [currency, setCurrency] = useState('USD');
  const [dataChoice, setDataChoice] = useState<'demo' | 'custom'>('demo');
  const [selectedGoal, setSelectedGoal] = useState('forecasting');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if onboarding query param exists or if never completed
    const onboardingParam = searchParams.get('onboarding') === 'true';
    const completed = typeof window !== 'undefined' && window.localStorage.getItem('has-completed-onboarding');

    if (onboardingParam || (!completed && typeof window !== 'undefined')) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleNext = () => {
    if (step === 1 && !storeName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Store Name Required',
        description: 'Please give your workspace or store a name to continue.',
      });
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        // 1. Save store identity and preferences
        window.localStorage.setItem('workspace-store-name', storeName);
        window.localStorage.setItem('workspace-platform', platform);
        window.localStorage.setItem('app-currency', currency);
        window.localStorage.setItem('workspace-goal', selectedGoal);
        window.localStorage.setItem('has-completed-onboarding', 'true');

        // 2. Preload Demo Data if chosen
        if (dataChoice === 'demo') {
          const sampleCSV = generateSampleCSV(storeName);
          const storagePayload = {
            currentData: sampleCSV,
            history: [
              {
                fileName: 'sample_retail_90d.csv',
                uploadDate: new Date().toISOString(),
                size: sampleCSV.length,
                recordCount: 540,
                data: sampleCSV,
              },
            ],
          };
          window.localStorage.setItem('sales-data', JSON.stringify(storagePayload));
        }

        // 3. Enable interactive spotlight tour
        window.localStorage.setItem('start-tour', 'true');
      }

      toast({
        title: '🎉 Workspace Activated!',
        description: `Welcome to CommerceCast, ${storeName || 'Operator'}! Your dashboard is configured.`,
      });

      setIsOpen(false);

      if (dataChoice === 'custom') {
        router.push('/dashboard/data-sources');
      } else {
        router.push('/dashboard');
        // Trigger page refresh to reload storage
        window.location.reload();
      }
    } catch (e) {
      console.error('Onboarding error', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
      <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden rounded-3xl border border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl">
        {/* Top Progress Tracker */}
        <DialogHeader className="bg-muted/40 border-b border-border/60 p-5 flex flex-row items-center justify-between space-y-0 text-left">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg border border-border/60 bg-card shadow-sm">
              <Logo className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground font-sans">
                Quick-Start Setup • Step {step} of 3
              </span>
              <DialogTitle className="text-sm font-bold font-headline text-foreground mt-0.5">
                {step === 1 && 'Store & Identity'}
                {step === 2 && 'Data Engine Setup'}
                {step === 3 && 'Strategic Objectives'}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Quick-start setup wizard to configure store preferences, data sources, and predictive AI models.
              </DialogDescription>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6 bg-primary'
                    : s < step
                    ? 'w-2 bg-primary/40'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Store & Platform ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-headline text-foreground">
                    Tell us about your store
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your workspace to match your brand and currency preferences.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Store Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="store-name" className="text-xs font-semibold">
                      Store or Organization Name <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="store-name"
                      placeholder="e.g. Apex Apparel, Lumina Goods"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="h-10 text-sm rounded-xl"
                      autoFocus
                    />
                  </div>

                  {/* Primary Platform */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Primary Platform</Label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {PLATFORMS.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setPlatform(p.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            platform === p.id
                              ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                              : 'border-border/60 hover:bg-muted/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-foreground">{p.name}</span>
                            {platform === p.id && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{p.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Currency Selection */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Base Currency</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { code: 'USD', symbol: '$' },
                        { code: 'EUR', symbol: '€' },
                        { code: 'GBP', symbol: '£' },
                        { code: 'INR', symbol: '₹' },
                      ].map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setCurrency(c.code)}
                          className={`h-9 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                            currency === c.code
                              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                              : 'border-border/60 text-muted-foreground hover:bg-muted/40'
                          }`}
                        >
                          <span>{c.symbol}</span>
                          <span>{c.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Data Source Decision ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-headline text-foreground">
                    How would you like to start?
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Explore live dashboards immediately with demo data, or link your own files.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Demo Dataset */}
                  <div
                    onClick={() => setDataChoice('demo')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 relative overflow-hidden ${
                      dataChoice === 'demo'
                        ? 'border-blue-500 bg-blue-500/5 shadow-md ring-1 ring-blue-500/20'
                        : 'border-border/60 hover:bg-muted/40'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <BespokeDataPackIcon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">
                            Load 90-Day Sample Retail Dataset
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-500 text-[9px] font-bold text-white uppercase tracking-wider">
                            Recommended
                          </span>
                        </div>
                        {dataChoice === 'demo' && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Instantly populates 540 multi-channel transaction rows, live forecast curves, and inventory classifications. No CSV setup required.
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Upload Own Data */}
                  <div
                    onClick={() => setDataChoice('custom')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      dataChoice === 'custom'
                        ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                        : 'border-border/60 hover:bg-muted/40'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">
                          Connect My Own Google Sheet or CSV
                        </span>
                        {dataChoice === 'custom' && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Upload custom historical transactions or sync directly with a Google Sheet spreadsheet via OAuth2.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Strategic Goals ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-headline text-foreground">
                    What is your primary focus?
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We will customize your dashboard metrics and AI models based on your goal.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {GOALS.map((g) => {
                    const Icon = g.icon;
                    const isSelected = selectedGoal === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGoal(g.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                            : 'border-border/60 hover:bg-muted/40'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${g.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground">{g.title}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{g.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="bg-muted/30 border-t border-border/60 p-4 sm:p-5 flex items-center justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              size="sm"
              onClick={handleNext}
              className="text-xs font-bold px-5 h-9 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting}
              onClick={handleFinish}
              className="text-xs font-bold px-6 h-9 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/20 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:opacity-90"
            >
              <BespokeRocketIcon className="w-3.5 h-3.5" />
              <span>Launch Dashboard</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
