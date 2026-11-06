import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Smartphone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProjectScreenshot } from '../data/portfolioData';
import { playSound } from '../utils/sound';

interface LightboxModalProps {
  isOpen: boolean;
  screenshot: ProjectScreenshot | null;
  appName: string;
  onClose: () => void;
}

export function LightboxModal({ isOpen, screenshot, appName, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !screenshot) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-lg w-full max-h-[92vh] flex flex-col rounded-3xl glass-panel border border-white/20 shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-border/80 flex items-center justify-between bg-card/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block">
                  {appName}
                </span>
                <h4 className="text-sm font-bold text-foreground leading-tight">
                  {screenshot.title}
                </h4>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 rounded-full bg-card hover:bg-card/80 border border-border text-foreground transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Screenshot Container */}
          <div className="relative flex-1 p-4 flex items-center justify-center overflow-auto bg-black/40">
            <div className="max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <ImageWithFallback
                src={screenshot.src}
                alt={screenshot.title}
                className="max-h-[65vh] w-auto object-contain select-none"
              />
            </div>
          </div>

          {/* Footer Caption */}
          <div className="p-4 sm:p-5 border-t border-border/80 bg-card/60 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {screenshot.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

