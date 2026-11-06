import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AppStudioGallery } from './components/AppStudioGallery';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { ProjectScreenshot } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isDark, setIsDark] = useState(true);

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxScreen, setActiveLightboxScreen] = useState<ProjectScreenshot | null>(null);
  const [activeLightboxAppName, setActiveLightboxAppName] = useState('');

  // Synchronize Dark / Light Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  };

  // Section Observer for Smooth Active Nav Pill
  useEffect(() => {
    const sections = ['about', 'projects', 'gallery', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProjectInStudio = (projectId: string) => {
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
      // Dispatch a custom event or let gallery receive updated state
      window.dispatchEvent(new CustomEvent('select-studio-app', { detail: { appId: projectId } }));
    }
  };

  const handleOpenLightbox = (screenshot: ProjectScreenshot, appName: string) => {
    setActiveLightboxScreen(screenshot);
    setActiveLightboxAppName(appName);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      
      {/* Background Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Floating Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="relative z-10">
        {/* 1. Hero & Narrative Profile */}
        <HeroSection
          onExploreProjects={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 2. Flagship & Projects Showcase Bento */}
        <ProjectsSection
          onSelectProjectInStudio={handleSelectProjectInStudio}
        />

        {/* 3. Interactive Mobile App Studio Showcase */}
        <AppStudioGallery
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 4. Professional Skills & Competencies Bento */}
        <SkillsSection />

        {/* 5. Interactive Contact & Opportunities */}
        <ContactSection />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Interactive Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        screenshot={activeLightboxScreen}
        appName={activeLightboxAppName}
        onClose={() => setLightboxOpen(false)}
      />

    </div>
  );
}
