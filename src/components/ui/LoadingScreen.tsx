'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

const ECOMMERCE_LOADING_MESSAGES = [
  'Preparing your store intelligence...',
  'Synchronizing sales channels & historical orders...',
  'Calibrating predictive demand models...',
  'Compiling SKU inventory velocity...',
  'Readying your executive command center...',
];

export function LoadingScreen({ message }: { message?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ECOMMERCE_LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [message]);

  const currentMessage = message || ECOMMERCE_LOADING_MESSAGES[msgIndex];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background relative overflow-hidden select-none">
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-80 h-80 bg-blue-500/20 rounded-full blur-[90px]"
        />
      </div>

      {/* Center Brand Identity Pod */}
      <div className="relative flex flex-col items-center justify-center z-10 space-y-8 max-w-sm px-6 text-center">
        <div className="relative flex items-center justify-center">
          {/* Outer Orbital Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-5 rounded-full border border-dashed border-primary/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-9 rounded-full border border-primary/10"
          />

          {/* Glowing Glassmorphic Emblem Container */}
          <div className="relative p-5 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <motion.div
              animate={{ scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Logo className="w-12 h-12 text-primary drop-shadow-md" />
            </motion.div>
          </div>
        </div>

        {/* Dynamic E-Commerce Narrative Text */}
        <div className="space-y-3 w-full">
          {/* Micro Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 border border-border/60 text-[11px] font-semibold text-muted-foreground backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">CommerceCast Secure Session</span>
          </div>

          {/* Animated Transitioning Message */}
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-xs font-medium text-foreground tracking-tight"
              >
                {currentMessage}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Luxury Indeterminate Progress Shimmer */}
          <div className="w-44 h-1 mx-auto bg-muted rounded-full overflow-hidden relative">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Subtle Trust Label */}
      <div className="absolute bottom-8 text-[11px] text-muted-foreground/60 tracking-wider uppercase font-sans">
        Retail Demand & Inventory OS
      </div>
    </div>
  );
}
