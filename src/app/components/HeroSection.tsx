import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PROFILE_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export function HeroSection({ onExploreProjects, onContactClick }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [wibTime, setWibTime] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Mobile Application Engineer (Flutter)',
    'Sarjana Teknik Informatika (S.Kom)',
    'Pengolahan Data & Administrasi IT',
    'Cross-Platform UI/UX Specialist'
  ];

  // Cycling roles
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  // Live WIB Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to WIB (GMT+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setWibTime(new Intl.DateTimeFormat('id-ID', options).format(now) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    playSound('pop');
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  // 3D Tilt Card Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -12,
      y: ((x - centerX) / centerX) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const techBadges = [
    { label: 'Flutter', icon: '📱' },
    { label: 'Dart', icon: '🎯' },
    { label: 'Firebase', icon: '🔥' },
    { label: 'Gemini AI', icon: '✨' },
    { label: 'Provider / Bloc', icon: '⚡' },
    { label: 'SQLite / Hive', icon: '💾' },
    { label: 'RESTful API', icon: '🌐' },
    { label: 'Microsoft Excel Advanced', icon: '📊' },
    { label: 'Data Processing', icon: '📁' },
    { label: 'Git & GitHub', icon: '🐙' },
    { label: 'Clean Architecture', icon: '🏛️' },
  ];

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col justify-center overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 glow-orb-primary rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 glow-orb-accent rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Left Column: Personal Narrative & Badges (Col 7) ── */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill & WIB Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
                <span>Terbuka untuk Peluang Kerja & Freelance</span>
              </div>

              {wibTime && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/80 text-muted-foreground text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{wibTime}</span>
                </div>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Halo, saya <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Naura Afifah
                </span>
              </h1>

              {/* Dynamic Subheading Role */}
              <div className="h-8 flex items-center">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-base sm:text-lg font-medium text-foreground/80 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span>{roles[roleIndex]}</span>
                </motion.p>
              </div>
            </motion.div>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              Lulusan S1 Informatika yang memadukan keahlian pengembangan aplikasi mobile modern berbasis <strong className="text-foreground font-semibold">Flutter</strong> dengan ketelitian administrasi, analisis data, dan kepatuhan proses kerja. Berpengalaman membangun aplikasi kesehatan, kecerdasan buatan (AI), dan sistem pengingat terstruktur.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => {
                  playSound('pop');
                  onExploreProjects();
                }}
                className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Eksplorasi Proyek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  onContactClick();
                }}
                className="px-5 py-3 rounded-2xl bg-card border border-border/80 hover:border-primary/60 text-foreground font-medium text-sm hover:bg-card/80 transition-all cursor-pointer"
              >
                Hubungi Saya
              </button>

              <button
                onClick={handleCopyEmail}
                title="Salin alamat email"
                className="p-3 rounded-2xl bg-card border border-border/80 hover:border-primary/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-sans">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Salin Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Contact Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 pt-3 text-xs text-muted-foreground"
            >
              <span className="font-medium text-foreground">Koneksi:</span>
              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl bg-card/60 border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl bg-card/60 border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={`https://wa.me/62${PROFILE_INFO.phone.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl bg-card/60 border border-border hover:border-emerald-500/50 text-foreground hover:text-emerald-500 transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

          </div>

          {/* ── Right Column: Interactive 3D Card & Spotlight (Col 5) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-accent/20 rounded-[36px] blur-2xl opacity-60" />

              {/* 3D Tilt Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative rounded-[32px] glass-panel border border-border/80 p-5 shadow-2xl overflow-hidden group"
              >
                {/* Glossy top-down sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Profile Image with subtle border */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-card/50 border border-border/50">
                  <ImageWithFallback
                    src="/naura.png"
                    alt={PROFILE_INFO.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Badges on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold leading-tight drop-shadow-md">
                        Naura Afifah K.
                      </p>
                      <p className="text-[10px] text-white/80 font-mono drop-shadow-sm">
                        S1 Teknik Informatika
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold border border-white/30 uppercase tracking-wider">
                      Flutter Dev
                    </span>
                  </div>
                </div>

                {/* Impact Metric Chips */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-card/60 border border-border/60">
                    <p className="text-lg font-bold text-primary leading-tight font-display">4</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Mobile Apps</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card/60 border border-border/60">
                    <p className="text-lg font-bold text-accent leading-tight font-display">100%</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Ketelitian</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card/60 border border-border/60">
                    <p className="text-lg font-bold text-emerald-500 leading-tight font-display">S1</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Informatika</p>
                  </div>
                </div>

                {/* Quote pill */}
                <div className="mt-3 p-3 rounded-xl bg-background/50 border border-border/50 text-[11px] text-muted-foreground italic leading-relaxed text-center">
                  &ldquo;Menggabungkan estetika visual, stabilitas kode, dan integritas data.&rdquo;
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Infinite Marquee of Technologies ── */}
        <div className="mt-16 pt-8 border-t border-border/60">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground/70 mb-4">
            Ekosistem Teknologi & Keterampilan Utama
          </p>
          <div className="relative overflow-hidden w-full mask-linear">
            {/* Gradient edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-3 py-2">
              {[...techBadges, ...techBadges].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-border/70 text-xs font-medium text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors shadow-sm shrink-0"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onExploreProjects}
            aria-label="Scroll ke Proyek"
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

