import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, CheckCircle2, Loader2, Database } from 'lucide-react';

interface DataUploadMockProps {
  phase: 'upload' | 'processing';
  uploadHovered: boolean;
  uploadProgress: number;
  processStep: number;
}

export function DataUploadMock({ phase, uploadHovered, uploadProgress, processStep }: DataUploadMockProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {phase === 'upload' ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-background border rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Dropzone */}
            <div className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors duration-300 ${uploadHovered ? 'border-indigo-500 bg-indigo-500/5' : 'border-border bg-muted/30'}`}>
              <UploadCloud className={`w-12 h-12 mb-4 transition-colors duration-300 ${uploadHovered ? 'text-indigo-500' : 'text-muted-foreground'}`} />
              <h3 className="text-lg font-bold text-foreground mb-1">Select Data Source</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Connect your Shopify, WooCommerce, or upload CSV directly.</p>
              
              <div className={`w-full max-w-xs relative`}>
                <div className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 border transition-colors ${uploadHovered ? 'border-indigo-500 bg-indigo-500/10' : 'border-border bg-background'}`}>
                  <FileSpreadsheet className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">historical_sales_2023.csv</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500 rounded-full"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="w-full flex justify-between mt-2 text-xs font-semibold text-muted-foreground">
              <span>{uploadProgress > 0 ? (uploadProgress === 100 ? 'Complete' : 'Uploading...') : 'Waiting...'}</span>
              <span>{uploadProgress}%</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg bg-background border rounded-2xl shadow-2xl p-8 flex flex-col relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Database className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">AI Predictive Engine</h3>
                <p className="text-sm text-muted-foreground">Analyzing historical data patterns...</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <ProcessingStep active={processStep >= 1} done={processStep > 1} text="Ingesting 142,000 transaction records" />
              <ProcessingStep active={processStep >= 2} done={processStep > 2} text="Running multi-variate anomaly detection" />
              <ProcessingStep active={processStep >= 3} done={processStep > 3} text="Training deep learning forecasting model" />
              <ProcessingStep active={processStep >= 4} done={processStep >= 4} text="Forecast generated successfully" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProcessingStep({ active, done, text }: { active: boolean, done: boolean, text: string }) {
  return (
    <div className={`flex items-center gap-3 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {done ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : active ? (
        <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-muted" />
      )}
      <span className={`text-sm font-medium ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{text}</span>
    </div>
  );
}
