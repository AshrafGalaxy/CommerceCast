'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MousePointer2, Loader2, BrainCircuit, Play, Pause } from 'lucide-react';
import { OverviewMock } from './mocks/OverviewMock';
import { DataUploadMock } from './mocks/DataUploadMock';

export function AnimatedDashboardMock({ isExpanded }: { isExpanded?: boolean }) {

  // States passed to OverviewMock
  const [activeKpi, setActiveKpi] = useState('revenue');
  const [showTooltip, setShowTooltip] = useState(false);
  const [dateActive, setDateActive] = useState(false);
  const [extractHovered, setExtractHovered] = useState(false);
  
  // Scrollytelling UI panels
  const [globalPhase, setGlobalPhase] = useState<'upload' | 'processing' | 'dashboard'>('upload');
  const [uploadHovered, setUploadHovered] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [cursorState, setCursorState] = useState({ left: "10%", top: "80%", opacity: 0, scale: 1 });
  const [showToast, setShowToast] = useState<{ title: string; desc: string } | null>(null);
  const [showAiAlert, setShowAiAlert] = useState(false);
  const [alertResolved, setAlertResolved] = useState(false);
  const [animationCaption, setAnimationCaption] = useState<string | null>(null);
  const [sequenceProgress, setSequenceProgress] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  
  const togglePause = () => {
    setIsPaused(prev => {
      isPausedRef.current = !prev;
      return !prev;
    });
  };
  
  const autoPlayRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const shouldRun = isExpanded && isInView;

  useEffect(() => {
    if (!shouldRun) {
      setGlobalPhase('dashboard');
      setUploadHovered(false);
      setUploadProgress(0);
      setProcessStep(0);
      setCursorState({ left: "10%", top: "80%", opacity: 0, scale: 1 });
      setActiveKpi('revenue');
      setDateActive(false);
      setExtractHovered(false);
      setShowTooltip(false);
      setShowToast(null);
      setAnimationCaption(null);
      setShowAiAlert(false);
      setAlertResolved(false);
      setSequenceProgress(0);
      autoPlayRef.current = false;
      return;
    }

    autoPlayRef.current = true;
    let isMounted = true;
    
    const runSequence = async () => {
      const smartWait = async (ms: number) => {
        let elapsed = 0;
        const interval = 50;
        while (elapsed < ms) {
          if (!isMounted || !autoPlayRef.current) return;
          if (isPausedRef.current) {
            await new Promise(r => setTimeout(r, interval));
            continue;
          }
          await new Promise(r => setTimeout(r, interval));
          elapsed += interval;
        }
      };
      while (isMounted && autoPlayRef.current) {
        // Reset everything
        setGlobalPhase('upload');
        setUploadProgress(0);
        setProcessStep(0);
        setUploadHovered(false);
        setCursorState({ left: "5%", top: "90%", opacity: 0, scale: 1 });
        setShowAiAlert(false);
        setAlertResolved(false);
        setShowTooltip(false);
        setDateActive(false);
        setExtractHovered(false);
        setActiveKpi('revenue');
        setAnimationCaption("Step 1: Connecting Data Sources");
        setSequenceProgress(0);
        
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // Move to upload box
        setCursorState({ left: "50%", top: "70%", opacity: 1, scale: 1 });
        setSequenceProgress(5);
        await smartWait(400);
        if (!isMounted || !autoPlayRef.current) return;

        setCursorState({ left: "50%", top: "50%", opacity: 1, scale: 1 });
        await smartWait(400);
        if (!isMounted || !autoPlayRef.current) return;
        
        setUploadHovered(true);
        await smartWait(400);
        if (!isMounted || !autoPlayRef.current) return;
        
        // Click to upload
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        
        // Progress bar simulation
        for (let p = 0; p <= 100; p += 25) {
          setUploadProgress(p);
          await smartWait(150);
          if (!isMounted || !autoPlayRef.current) return;
        }
        
        await smartWait(500);
        if (!isMounted || !autoPlayRef.current) return;

        // Transition to processing
        setGlobalPhase('processing');
        setAnimationCaption("Step 2: Data Cleaning & Feature Engineering");
        setSequenceProgress(40);
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // Processing steps
        for (let step = 1; step <= 4; step++) {
          setProcessStep(step);
          setSequenceProgress(40 + (step * 5)); // 45, 50, 55, 60
          await smartWait(800);
          if (!isMounted || !autoPlayRef.current) return;
        }

        await smartWait(1000);
        if (!isMounted || !autoPlayRef.current) return;

        // Transition to dashboard
        setGlobalPhase('dashboard');
        setAnimationCaption("Step 3: Extracting Actionable Insights");
        setSequenceProgress(65);
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState({ left: "15%", top: "70%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;

        // 3. Advanced AI Tooltip (Hover Chart)
        setCursorState({ left: "60%", top: "75%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        setShowTooltip(true);
        await smartWait(1000);
        if (!isMounted || !autoPlayRef.current) return;
        
        setShowTooltip(false);
        await smartWait(200);
        if (!isMounted || !autoPlayRef.current) return;

        // 4. Actionable AI Insight (Alert Banner)
        setShowAiAlert(true);
        setAnimationCaption("Step 4: AI Auto-Optimization");
        setSequenceProgress(75);
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // Move to Auto-Optimize button
        setCursorState({ left: "88%", top: "21%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        // Click Auto-Optimize
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        setAlertResolved(true);
        
        await smartWait(600);
        if (!isMounted || !autoPlayRef.current) return;

        setShowAiAlert(false); // Dismiss the banner fast
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        // 5. Chart Interaction (Click Sales KPI)
        setCursorState({ left: "37%", top: "22%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        setActiveKpi('sales');
        
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // Click AOV KPI
        setCursorState({ left: "62%", top: "22%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        setActiveKpi('aov');
        
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // Click Customer KPI
        setCursorState({ left: "88%", top: "22%", opacity: 1, scale: 1 });
        await smartWait(300);
        if (!isMounted || !autoPlayRef.current) return;
        
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        setActiveKpi('customers');
        
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;

        // 6. Extract Report
        setAnimationCaption("Step 5: Generating Forecast Report");
        setSequenceProgress(90);
        setCursorState({ left: "87%", top: "9%", opacity: 1, scale: 1 });
        await smartWait(400);
        if (!isMounted || !autoPlayRef.current) return;
        
        setExtractHovered(true);
        await smartWait(200);
        if (!isMounted || !autoPlayRef.current) return;
        
        setCursorState(prev => ({ ...prev, scale: 0.8 }));
        await smartWait(100);
        if (!isMounted || !autoPlayRef.current) return;
        setCursorState(prev => ({ ...prev, scale: 1 }));
        setExtractHovered(false);
        
        setShowToast({ title: "Compiling AI predictions...", desc: "Applying confidence intervals." });
        await smartWait(800);
        if (!isMounted || !autoPlayRef.current) return;
        
        setShowToast({ title: "Report Downloaded", desc: "Sales_Forecast_Q4.pdf" });
        setSequenceProgress(100);
        await smartWait(1000);
        if (!isMounted || !autoPlayRef.current) return;
        
        setShowToast(null);

        // 7. Extended Loop Gap (6 seconds)
        setAnimationCaption(null);
        setCursorState({ left: "50%", top: "50%", opacity: 0, scale: 1 }); // Fade cursor out
        await smartWait(6000);
      }
    };

    runSequence();
    
    return () => { isMounted = false; autoPlayRef.current = false; };
  }, [shouldRun]);

  return (
    <div ref={containerRef} className="flex-1 flex overflow-hidden relative rounded-r-[inherit] bg-gradient-to-br from-background to-muted/20">
      
      <AnimatePresence>
        {animationCaption && (
          <motion.div
            key={animationCaption}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-6 w-full flex justify-center z-[60] pointer-events-none"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border shadow-lg px-6 py-2 rounded-full">
              <span className="text-sm font-semibold text-foreground tracking-wide whitespace-nowrap">{animationCaption}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Cursor */}
      <motion.div
        animate={{
          left: cursorState.left,
          top: cursorState.top,
          opacity: cursorState.opacity,
          scale: cursorState.scale
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute z-50 pointer-events-none flex flex-col items-center drop-shadow-xl"
      >
        <MousePointer2 className="w-6 h-6 text-black dark:text-white fill-white dark:fill-black -rotate-12" strokeWidth={1.5} />
        <div className="bg-indigo-500 text-white text-[11px] px-2.5 py-0.5 rounded-full font-semibold shadow-md ml-6 mt-1 border border-indigo-400">
          Kavya
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6">
        {/* The Dashboard is always rendered as the base layer */}
        <div className="w-full h-full flex flex-col max-w-[1280px]">
          <OverviewMock 
            activeKpi={activeKpi} 
            dateActive={dateActive} 
            extractHovered={extractHovered} 
            showTooltip={showTooltip} 
            showAiAlert={showAiAlert}
            alertResolved={alertResolved}
          />
        </div>

        {/* The Upload Sequence acts as a modal overlay */}
        <AnimatePresence>
          {globalPhase !== 'dashboard' && (
            <motion.div 
              key="upload_flow"
              className="absolute inset-0 z-40 bg-background/60 backdrop-blur-md flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              <DataUploadMock 
                phase={globalPhase as 'upload' | 'processing'} 
                uploadHovered={uploadHovered}
                uploadProgress={uploadProgress}
                processStep={processStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-6 right-6 z-50 bg-background/95 backdrop-blur border border-border p-3 rounded-lg shadow-xl flex items-start gap-2 max-w-[240px]"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              {showToast.title.includes("Success") || showToast.title.includes("Downloaded") ? (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              ) : (
                <Loader2 className="w-3 h-3 text-indigo-500 animate-spin" />
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold leading-tight">{showToast.title}</span>
              <span className="text-[10px] text-muted-foreground leading-snug">{showToast.desc}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Media Player Controls */}
      <div className="absolute bottom-6 left-6 z-50 flex items-center gap-4 px-4 py-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
        <button
          onClick={togglePause}
          className="text-foreground hover:text-primary transition-colors flex items-center justify-center"
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
        </button>
        <div className="w-32 sm:w-48 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${sequenceProgress}%` }}
            transition={{ ease: "linear", duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
