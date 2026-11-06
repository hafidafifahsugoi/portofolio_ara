import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { playSound, toggleSoundState, isSoundEnabled } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ activeSection, onNavigate, isDark, onToggleTheme }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', label: 'Tentang' },
    { key: 'projects', label: 'Proyek' },
    { key: 'gallery', label: 'Studio Galeri' },
    { key: 'skills', label: 'Keahlian' },
    { key: 'contact', label: 'Kontak' },
  ];

  const handleSoundToggle = () => {
    const newState = toggleSoundState();
    setSoundOn(newState);
    if (newState) {
      playSound('pop');
    }
  };

  const handleNavClick = (key: string) => {
    playSound('click');
    onNavigate(key);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          isScrolled ? 'pt-3' : 'pt-6'
        }`}
      >
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 rounded-full glass-panel shadow-2xl border max-w-4xl w-full"
        >
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('about')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs tracking-wider shadow-md group-hover:scale-105 transition-transform">
              NK
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-tight text-foreground block leading-tight group-hover:text-primary transition-colors">
                Naura Afifah
              </span>
              <span className="text-[10px] text-muted-foreground block leading-tight font-mono">
                Mobile Dev & IT
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-background/50 rounded-full border border-border/50">
            {navItems.map(({ key, label }) => {
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary/15 dark:bg-primary/20 border border-primary/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {key === 'gallery' && (
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    )}
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Matikan Suara SFX' : 'Aktifkan Suara SFX'}
              aria-label="Toggle SFX Sound"
              className={`p-2 rounded-full border text-xs transition-all duration-300 cursor-pointer ${
                soundOn
                  ? 'bg-primary/10 border-primary/40 text-primary'
                  : 'bg-background/40 border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playSound('switch');
                onToggleTheme();
              }}
              title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-background/40 border border-border text-foreground hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playSound('pop');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Open Mobile Menu"
              className="md:hidden p-2 rounded-full bg-background/40 border border-border text-foreground cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden p-4 rounded-3xl glass-panel shadow-2xl border"
          >
            <div className="flex flex-col gap-2">
              {navItems.map(({ key, label }) => {
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary/20 text-primary font-semibold'
                        : 'text-muted-foreground hover:bg-card/50 hover:text-foreground'
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

