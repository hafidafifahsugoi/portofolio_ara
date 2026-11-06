import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export function Footer() {
  const scrollToTop = () => {
    playSound('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/80 bg-card/40 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Brand & Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-sm text-foreground">
              {PROFILE_INFO.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              S1 Informatika
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Mobile Application Engineer (Flutter) • Administrasi & Teknologi Informasi
          </p>
        </div>

        {/* Center: Signature */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Dirancang & dibangun dengan presisi serta dedikasi</span>
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Kembali ke Atas"
            className="p-2.5 rounded-xl bg-card border border-border/80 hover:border-primary/50 text-foreground hover:text-primary transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

