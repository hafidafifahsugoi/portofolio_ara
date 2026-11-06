import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Smartphone, 
  Wifi, 
  Battery
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PROJECTS, ProjectItem, ProjectScreenshot } from '../data/portfolioData';
import { playSound } from '../utils/sound';

interface AppStudioGalleryProps {
  onOpenLightbox: (screenshot: ProjectScreenshot, appName: string) => void;
}

export function AppStudioGallery({ onOpenLightbox }: AppStudioGalleryProps) {
  const [selectedAppId, setSelectedAppId] = useState<string>(PROJECTS[0].id);
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const currentApp: ProjectItem = PROJECTS.find((p) => p.id === selectedAppId) || PROJECTS[0];
  const screenshots = currentApp.screenshots;
  const currentScreen: ProjectScreenshot = screenshots[activeScreenIndex] || screenshots[0];

  // Auto play carousel interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Listen to select-studio-app event from projects section
  useEffect(() => {
    const handleSelectStudioApp = (e: Event) => {
      const customEvent = e as CustomEvent<{ appId: string }>;
      if (customEvent.detail?.appId) {
        setSelectedAppId(customEvent.detail.appId);
        setActiveScreenIndex(0);
      }
    };
    window.addEventListener('select-studio-app', handleSelectStudioApp);
    return () => window.removeEventListener('select-studio-app', handleSelectStudioApp);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % screenshots.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, screenshots.length, selectedAppId]);

  const handleSelectApp = (appId: string) => {
    playSound('switch');
    setSelectedAppId(appId);
    setActiveScreenIndex(0);
  };

  const handleNext = () => {
    playSound('click');
    setActiveScreenIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    playSound('click');
    setActiveScreenIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleSelectScreen = (idx: number) => {
    playSound('click');
    setActiveScreenIndex(idx);
  };

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 bg-gradient-to-b from-transparent via-card/30 to-transparent overflow-hidden">
      {/* Background illumination aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-orb-primary rounded-full blur-[140px] pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Mobile Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Galeri Antarmuka Aplikasi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Eksplorasi rancangan layar dan arsitektur visual dari aplikasi Flutter yang telah saya bangun, dipresentasikan dalam simulasi perangkat interaktif.
          </p>
        </div>

        {/* ── App Selector Tabs ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {PROJECTS.map((project) => {
            const isSelected = project.id === selectedAppId;
            return (
              <button
                key={project.id}
                onClick={() => handleSelectApp(project.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground bg-card/60 hover:bg-card border border-border/80'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeAppPill"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{project.name}</span>
                </span>
                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {project.screenshots.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Main Studio Display: Phone Frame + Insights Panel ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-center justify-center">
          
          {/* Left Column: Context & Metadata (Col 5) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-border shadow-xl space-y-5">
              {/* App Meta Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    {currentApp.category} • {currentApp.version}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mt-1">
                    {currentApp.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {currentApp.tagline}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              {/* Active Screen Title & Caption */}
              <div className="p-4 rounded-2xl bg-card/50 border border-border/60 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Layar Aktif ({activeScreenIndex + 1} dari {screenshots.length})</span>
                  <span className="text-primary font-semibold">Tersinkronisasi</span>
                </div>
                <p className="text-base font-bold text-foreground leading-snug">
                  {currentScreen.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentScreen.caption}
                </p>
              </div>

              {/* Technical Highlights of this App */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground tracking-wide">
                  Sorotan Fitur & Keunggulan:
                </p>
                <ul className="space-y-1.5">
                  {currentApp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentApp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-background/80 border border-border/60 text-[11px] font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={currentApp.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('pop')}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh APK</span>
                </a>

                <button
                  onClick={() => {
                    playSound('click');
                    onOpenLightbox(currentScreen, currentApp.name);
                  }}
                  className="py-3 px-4 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar Layar</span>
                </button>
              </div>

            </div>

            {/* Thumbnail Strip for the Selected App */}
            {screenshots.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground/80 uppercase tracking-wider">
                  Pilih Layar ({screenshots.length} Screens Tersedia):
                </p>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {screenshots.map((screen, idx) => {
                    const isScreenActive = idx === activeScreenIndex;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => handleSelectScreen(idx)}
                        className={`relative w-16 h-24 rounded-xl overflow-hidden shrink-0 border transition-all duration-300 cursor-pointer ${
                          isScreenActive
                            ? 'ring-2 ring-primary border-primary scale-105 shadow-md'
                            : 'border-border/70 opacity-60 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <ImageWithFallback
                          src={screen.src}
                          alt={screen.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold text-white">
                          #{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Realistic Smartphone Mockup Frame (Col 7) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center justify-center">
            
            {/* The Phone Container */}
            <div className="relative group">
              
              {/* Pedestal Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-t from-primary/30 via-accent/20 to-transparent rounded-[52px] blur-3xl opacity-50 transition-opacity duration-700 pointer-events-none" />

              {/* Realistic Phone Body */}
              <div className="relative w-[280px] sm:w-[305px] h-[575px] sm:h-[625px] rounded-[48px] bg-[#161822] p-3 border-4 border-neutral-700/60 dark:border-neutral-600/50 phone-case transition-all duration-500 group-hover:-translate-y-1">
                
                {/* Metallic Bezel Highlight */}
                <div className="absolute inset-0 rounded-[44px] ring-1 ring-white/20 pointer-events-none" />

                {/* Inner Screen Area */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col">
                  
                  {/* Phone Status Bar (Dynamic Island & Network/Battery) */}
                  <div className="absolute top-0 left-0 right-0 z-30 pt-3 pb-1 px-6 flex items-center justify-between text-white text-[11px] font-mono pointer-events-none">
                    <span>09:41</span>
                    {/* Dynamic Island Pill */}
                    <div className="w-20 h-4 bg-black rounded-full border border-neutral-800 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700 mr-2" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Active Screenshot Display with Slide/Crossfade Motion */}
                  <div className="relative w-full h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedAppId}-${activeScreenIndex}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="w-full h-full relative"
                      >
                        <ImageWithFallback
                          src={currentScreen.src}
                          alt={currentScreen.title}
                          className="w-full h-full object-cover object-top select-none"
                        />
                        {/* Subtle inner screen glossy reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Hover Zoom Button overlay */}
                    <button
                      onClick={() => {
                        playSound('click');
                        onOpenLightbox(currentScreen, currentApp.name);
                      }}
                      className="absolute bottom-5 right-5 z-20 p-3 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-90 hover:opacity-100"
                      title="Perbesar Layar Penuh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Phone Bottom Home Indicator Bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-28 h-1 bg-white/70 rounded-full pointer-events-none" />

                </div>

              </div>

              {/* Phone Controls (Prev / Play-Pause / Next) */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  aria-label="Layar Sebelumnya"
                  className="p-3 rounded-full bg-card border border-border/80 hover:border-primary text-foreground hover:text-primary transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    playSound('pop');
                    setIsPlaying(!isPlaying);
                  }}
                  aria-label={isPlaying ? 'Jeda Rotasi Otomatis' : 'Putar Rotasi Otomatis'}
                  className="px-4 py-2.5 rounded-full bg-card border border-border/80 hover:border-primary text-xs font-semibold text-foreground hover:text-primary transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-primary" />
                      <span>Jeda Otomatis</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-primary" />
                      <span>Putar Otomatis</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Layar Berikutnya"
                  className="p-3 rounded-full bg-card border border-border/80 hover:border-primary text-foreground hover:text-primary transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
