'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import {
  initiateEmailSignIn,
  initiateGoogleSignIn,
  initiatePasswordReset,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Forgot password modal state
  const [forgotEmail, setForgotEmail] = useState('');
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  useAuthRedirect(user, isUserLoading, '/dashboard');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Firebase Auth is currently not initialized.',
      });
      return;
    }

    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please enter both your email address and password.',
      });
      return;
    }

    try {
      setIsLoading(true);
      await initiateEmailSignIn(auth, email.trim(), password);
    } catch (error: any) {
      setIsLoading(false);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage = 'Invalid email or password. Please verify your credentials.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Access temporarily locked due to multiple failed attempts. Please reset your password or try again later.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been deactivated. Please contact support.';
      }

      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    try {
      setIsGoogleLoading(true);
      await initiateGoogleSignIn(auth);
    } catch (error: any) {
      setIsGoogleLoading(false);
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        toast({
          variant: 'destructive',
          title: 'Google Sign-In Failed',
          description: error.message || 'Unable to authenticate with Google.',
        });
      }
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !forgotEmail) return;
    try {
      setIsResetLoading(true);
      await initiatePasswordReset(auth, forgotEmail.trim());
      setIsResetLoading(false);
      setIsForgotOpen(false);
      toast({
        title: 'Reset Link Sent',
        description: `We've sent a password reset link to ${forgotEmail}. Please check your inbox.`,
      });
    } catch (error: any) {
      setIsResetLoading(false);
      toast({
        variant: 'destructive',
        title: 'Reset Failed',
        description: error.message || 'Could not send reset email. Please try again.',
      });
    }
  };

  if (isUserLoading || user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-12 bg-background">
      {/* ── Left: Interactive Form Column ── */}
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
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-blue-500/20 bg-blue-500/5 text-xs font-medium text-blue-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure Portal
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
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your intelligence workspace.
              </p>
            </div>

            {/* 1-Click Google OAuth */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              className="w-full h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 border-border/80 hover:bg-muted/60 transition-all shadow-sm hover:shadow"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border/60" />
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                or continue with email
              </span>
              <div className="flex-grow border-t border-border/60" />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Work Email
                </Label>
                <div className="relative">
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
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Password
                  </Label>
                  <Dialog open={isForgotOpen} onOpenChange={setIsForgotOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline focus:outline-none"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
                      <DialogHeader className="space-y-2">
                        <DialogTitle className="text-lg font-bold font-headline">Reset Password</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                          Enter your account email address and we will send you a secure link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePasswordReset} className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email" className="text-xs font-semibold">Email address</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="name@company.com"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            required
                            className="h-10 text-sm"
                          />
                        </div>
                        <Button type="submit" disabled={isResetLoading} className="w-full h-10 text-xs font-semibold">
                          {isResetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-background/50 border-border/70 focus-visible:ring-primary/30 text-sm"
                />
              </div>

              {/* Remember me option */}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(c) => setRememberMe(!!c)}
                  className="rounded-md"
                />
                <Label htmlFor="remember" className="text-xs font-medium text-muted-foreground cursor-pointer">
                  Remember this device for 30 days
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full h-11 rounded-xl text-xs font-bold tracking-wide uppercase shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in to Workspace'
                )}
              </Button>
            </form>

            {/* Footer Navigation */}
            <div className="pt-2 text-center text-xs text-muted-foreground">
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Create an account →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Compliance & Security Tag */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 border-t border-border/40 pt-4">
          <span>© 2026 CommerceCast Inc.</span>
          <div className="flex items-center gap-3">
            <span className="hover:text-foreground cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer">SOC2</span>
          </div>
        </div>
      </div>

      {/* ── Right: Visual Showcase Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-muted/20 border-l border-border/50 relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        {/* Background Decorative Mesh & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tagline */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 border border-border/60 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Autonomous E-Commerce Intelligence</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Models Live & Synchronized
          </div>
        </div>

        {/* Center Live Forecast Simulation Card */}
        <div className="relative z-10 my-auto py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl p-7 shadow-2xl space-y-6"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground font-sans">
                  Ensemble Live Stream
                </span>
                <h3 className="text-lg font-bold font-headline text-foreground mt-0.5">
                  Q3 Demand & Stockout Prevention
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +28.4% Lift
              </div>
            </div>

            {/* Simulated Live Sparkline & Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-background/60 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-medium block">Forecast Accuracy</span>
                <span className="text-xl font-extrabold text-foreground mt-1 block">98.2%</span>
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                  ↑ +3.1% vs ARIMA
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-background/60 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-medium block">Safety Stock Delta</span>
                <span className="text-xl font-extrabold text-foreground mt-1 block">-18.5%</span>
                <span className="text-[10px] text-blue-500 font-semibold flex items-center gap-1 mt-0.5">
                  Capital unlocked
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-background/60 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-medium block">Active SKUs</span>
                <span className="text-xl font-extrabold text-foreground mt-1 block">1,420</span>
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                  0 Stockouts
                </span>
              </div>
            </div>

            {/* Animated Forecast Wave Preview */}
            <div className="rounded-2xl bg-background/40 border border-border/40 p-4 space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                <span>Predicted Volume (Next 30 Days)</span>
                <span className="text-primary font-bold">Prophet + XGBoost Hybrid</span>
              </div>
              <div className="flex items-end gap-1.5 h-16 pt-2">
                {[35, 42, 50, 48, 65, 58, 72, 85, 80, 92, 98, 110, 105, 120].map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 120) * 100}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.04, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-sm transition-colors ${
                      idx >= 9
                        ? 'bg-gradient-to-t from-blue-600 to-sky-400'
                        : 'bg-muted-foreground/25'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground pt-1">
                <span>Historical Baseline</span>
                <span className="text-blue-500 font-bold">AI Projected Trajectory →</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Testimonial & Endorsement */}
        <div className="relative z-10 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md p-4 flex items-center gap-4">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            &ldquo;CommerceCast eliminated overstock and saved us over $140,000 in holding costs within the first quarter.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginForm />
    </Suspense>
  );
}
