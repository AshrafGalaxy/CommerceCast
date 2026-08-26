'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import {
  initiateEmailSignUp,
  initiateGoogleSignIn,
} from '@/firebase/non-blocking-login';
import { useAuthRedirect } from '@/hooks/use-redirect';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

// ─── Custom Premium Iconography ──────────────────────────────────────────────

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function DiamondSparkleIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <defs>
        <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path
        d="M10 2L12.4 7.6L18 10L12.4 12.4L10 18L7.6 12.4L2 10L7.6 7.6L10 2Z"
        fill="url(#sparkle-grad)"
      />
      <circle cx="10" cy="10" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

function IngestPipelineIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3" stroke="#60A5FA" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="#3B82F6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" stroke="#2563EB" />
      <circle cx="12" cy="6" r="1.5" fill="#60A5FA" />
      <circle cx="12" cy="12" r="1.5" fill="#3B82F6" />
      <circle cx="12" cy="18" r="1.5" fill="#2563EB" />
    </svg>
  );
}

function NeuralEnsembleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="6" cy="6" r="2.5" stroke="#C4B5FD" fill="#8B5CF6" fillOpacity="0.3" />
      <circle cx="18" cy="6" r="2.5" stroke="#C4B5FD" fill="#8B5CF6" fillOpacity="0.3" />
      <circle cx="12" cy="18" r="3" stroke="#A78BFA" fill="#7C3AED" fillOpacity="0.4" />
      <path d="M7.5 8L10.5 15.5" stroke="#A78BFA" strokeDasharray="2 2" />
      <path d="M16.5 8L13.5 15.5" stroke="#A78BFA" strokeDasharray="2 2" />
      <path d="M8.5 6H15.5" stroke="#C4B5FD" />
    </svg>
  );
}

function InventoryVelocityIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#34D399" />
      <path d="M12 12L20 7.5" stroke="#10B981" />
      <path d="M12 12V21" stroke="#059669" />
      <path d="M12 12L4 7.5" stroke="#10B981" />
      <circle cx="12" cy="12" r="1.75" fill="#34D399" />
    </svg>
  );
}

function CheckmarkIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignupForm() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useAuthRedirect(user, isUserLoading, '/dashboard?onboarding=true');

  // Password Strength Analytics
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaCount = [hasMinLength, hasNumber, hasSpecialChar].filter(Boolean).length;
  const strengthPercent = (criteriaCount / 3) * 100;

  const strengthColor =
    criteriaCount === 3
      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
      : criteriaCount === 2
      ? 'bg-amber-500 shadow-sm shadow-amber-500/50'
      : 'bg-rose-500 shadow-sm shadow-rose-500/50';

  const strengthText =
    criteriaCount === 3
      ? 'Enterprise Grade'
      : criteriaCount === 2
      ? 'Moderate'
      : password.length > 0
      ? 'Weak'
      : '';

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength || !hasNumber || !hasSpecialChar) {
      toast({
        variant: 'destructive',
        title: 'Weak Password',
        description: 'Please ensure your password satisfies all 3 security requirements.',
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        variant: 'destructive',
        title: 'Terms of Service',
        description: 'Please accept the Terms of Service to create your workspace.',
      });
      return;
    }

    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Firebase Auth is currently not available.',
      });
      return;
    }

    try {
      setIsLoading(true);
      await initiateEmailSignUp(auth, email.trim(), password);
    } catch (error: any) {
      setIsLoading(false);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid work email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password does not meet security requirements.';
      }

      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    if (!auth) return;
    try {
      setIsGoogleLoading(true);
      await initiateGoogleSignIn(auth);
    } catch (error: any) {
      setIsGoogleLoading(false);
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        toast({
          variant: 'destructive',
          title: 'Google Sign-Up Failed',
          description: error.message || 'Unable to authenticate with Google.',
        });
      }
    }
  };

  if (isUserLoading || user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-12 bg-background">
      {/* ── Left: Interactive Registration Column ── */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>

          {/* Bespoke Luxury Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-md shadow-[0_2px_8px_rgba(16,185,129,0.12)]">
            <DiamondSparkleIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400">
              14-Day Enterprise Trial
            </span>
          </div>
        </div>

        {/* Center Auth Form */}
        <div className="max-w-[400px] w-full mx-auto my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Brand Logo & Title */}
            <div className="space-y-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-2 focus:outline-none">
                <div className="p-2 rounded-xl border border-border/60 bg-card shadow-sm">
                  <Logo className="w-6 h-6 text-primary" />
                </div>
                <span className="text-base font-bold font-headline tracking-tight">CommerceCast</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-headline text-foreground">
                Create your workspace
              </h1>
              <p className="text-sm text-muted-foreground">
                Deploy automated demand forecasting and inventory intelligence in 3 minutes.
              </p>
            </div>

            {/* 1-Click Google OAuth */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading || isLoading}
              className="w-full h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 border-border/80 hover:bg-muted/60 transition-all shadow-sm hover:shadow"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              Sign up with Google
            </Button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border/60" />
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                or sign up with email
              </span>
              <div className="flex-grow border-t border-border/60" />
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-background/50 border-border/70 focus-visible:ring-primary/30 pl-3.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a secure password"
                  className="h-11 rounded-xl bg-background/50 border-border/70 focus-visible:ring-primary/30 text-sm"
                />

                {/* Interactive Password Strength Meter */}
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-1.5 space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Security level:</span>
                      <span className={`font-semibold ${criteriaCount === 3 ? 'text-emerald-500' : criteriaCount === 2 ? 'text-amber-500' : 'text-rose-500'}`}>
                        {strengthText}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full ${strengthColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${strengthPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Criteria Checklist with Bespoke Check Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                      <div className={`flex items-center gap-1.5 text-[10px] font-medium transition-colors ${hasMinLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${hasMinLength ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40' : 'bg-muted text-muted-foreground border border-border/50'}`}>
                          <CheckmarkIcon className="w-2.5 h-2.5" />
                        </div>
                        <span>8+ characters</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-medium transition-colors ${hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${hasNumber ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40' : 'bg-muted text-muted-foreground border border-border/50'}`}>
                          <CheckmarkIcon className="w-2.5 h-2.5" />
                        </div>
                        <span>1+ number</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-medium transition-colors ${hasSpecialChar ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${hasSpecialChar ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40' : 'bg-muted text-muted-foreground border border-border/50'}`}>
                          <CheckmarkIcon className="w-2.5 h-2.5" />
                        </div>
                        <span>1+ symbol</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(c) => setAgreeTerms(!!c)}
                  className="rounded-md mt-0.5"
                />
                <Label htmlFor="terms" className="text-xs leading-tight text-muted-foreground cursor-pointer">
                  I agree to the{' '}
                  <span className="text-primary hover:underline">Terms of Service</span> and{' '}
                  <span className="text-primary hover:underline">Privacy Policy</span>.
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full h-11 rounded-xl text-xs font-bold tracking-wide uppercase shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Workspace...</span>
                  </div>
                ) : (
                  'Get Started Free'
                )}
              </Button>
            </form>

            {/* Footer Navigation */}
            <div className="pt-2 text-center text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Compliance & Security Tag */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 border-t border-border/40 pt-4">
          <span>© 2026 CommerceCast Inc.</span>
          <div className="flex items-center gap-3">
            <span>Enterprise Grade</span>
            <span>•</span>
            <span>NoDatabase™ Privacy</span>
          </div>
        </div>
      </div>

      {/* ── Right: Visual Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-muted/20 border-l border-border/50 relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        {/* Background Decorative Mesh & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tagline */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border border-border/60 text-xs font-semibold backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous E-Commerce Intelligence</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span>Zero Card Required</span>
          </div>
        </div>

        {/* Center Showcase Graphic */}
        <div className="relative z-10 my-auto py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl p-7 shadow-2xl space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-500 font-sans">
                Next-Gen eCommerce Intelligence
              </span>
              <h3 className="text-xl font-bold font-headline text-foreground">
                All-in-One Predictive Command Center
              </h3>
            </div>

            {/* 3 Step Pipeline Preview Cards with Bespoke SVGs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-background/70 border border-border/60 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <IngestPipelineIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">1. Universal Data Ingestion</h4>
                  <p className="text-[11px] text-muted-foreground">Google Sheets, Shopify, CSV, or live database streams.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-background/70 border border-border/60 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <NeuralEnsembleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">2. Python AI Ensemble Forecast</h4>
                  <p className="text-[11px] text-muted-foreground">Prophet + XGBoost + ARIMA combined with dynamic error weighting.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-background/70 border border-border/60 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <InventoryVelocityIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">3. Automated Reorder Points</h4>
                  <p className="text-[11px] text-muted-foreground">Protect cash flow with proactive stockout prevention triggers.</p>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckmarkIcon className="w-2.5 h-2.5" />
                </div>
                <span>Unlimited Historical Uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckmarkIcon className="w-2.5 h-2.5" />
                </div>
                <span>Multi-Model Accuracy Ranks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckmarkIcon className="w-2.5 h-2.5" />
                </div>
                <span>Price Elasticity Simulator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckmarkIcon className="w-2.5 h-2.5" />
                </div>
                <span>Export PDF Executive Reports</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Security Assurance */}
        <div className="relative z-10 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Bank-Grade Data Privacy</div>
              <div className="text-[10px] text-muted-foreground">Your financial figures never leave your secure browser session.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SignupForm />
    </Suspense>
  );
}
