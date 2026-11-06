import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Smartphone, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { playSound } from '../utils/sound';

interface ProjectsSectionProps {
  onSelectProjectInStudio: (projectId: string) => void;
}

export function ProjectsSection({ onSelectProjectInStudio }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI & Healthcare' | 'Life & Utilities'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const flagshipProject = PROJECTS[0]; // SoulTalk AI

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] glow-orb-accent rounded-full blur-[130px] pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Karya & Portofolio Rekayasa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Proyek Unggulan Flutter
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Koleksi aplikasi mobile siap-rilis dengan arsitektur bersih, integrasi cloud & AI, dan perhatian mendalam pada pengalaman pengguna (UI/UX).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-card/60 backdrop-blur-md rounded-2xl border border-border/80 self-start md:self-auto">
            {(['All', 'AI & Healthcare', 'Life & Utilities'] as const).map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    playSound('click');
                    setActiveFilter(filter);
                  }}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {filter === 'All' ? `Semua (${PROJECTS.length})` : filter}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Flagship Spotlight Hero Card (SoulTalk AI) ── */}
        {(activeFilter === 'All' || activeFilter === 'AI & Healthcare') && (
          <div className="relative group">
            {/* Ambient Backlight */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-indigo-500/20 rounded-[36px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative rounded-[32px] glass-panel border border-border/80 p-6 sm:p-10 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Description Column (Col 7) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badge & Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-primary text-black font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                      ★ Flagship Project
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground">
                      {flagshipProject.version}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Produksi Teruji</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                      {flagshipProject.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-primary mt-1">
                      {flagshipProject.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {flagshipProject.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                    {flagshipProject.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {flagshipProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-background/80 border border-border text-xs font-mono text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <a
                      href={flagshipProject.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound('pop')}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh APK Resmi</span>
                    </a>

                    <button
                      onClick={() => {
                        playSound('click');
                        onSelectProjectInStudio(flagshipProject.id);
                      }}
                      className="px-5 py-3.5 rounded-2xl bg-card border border-border/80 hover:border-primary/60 text-foreground font-semibold text-sm hover:bg-card/80 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-primary" />
                      <span>Preview di Phone Studio</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                </div>

                {/* Right Mockup Teaser Preview Column (Col 5) */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="relative w-full max-w-sm flex items-center justify-center">
                    
                    {/* Phone 1 (Back, Angled - Video Call) */}
                    <div className="relative w-44 h-72 rounded-[28px] overflow-hidden border-2 border-border shadow-2xl rotate-[-8deg] translate-y-3 opacity-75 group-hover:rotate-[-6deg] group-hover:opacity-90 transition-all duration-500 hidden sm:block">
                      <ImageWithFallback
                        src="/BincangHati_Call.jpg"
                        alt="BincangHati Video Call"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Phone 2 (Front, Center - Home & Mood Tracker) */}
                    <div className="relative w-48 sm:w-52 h-80 sm:h-88 rounded-[32px] overflow-hidden border-2 border-primary/40 shadow-2xl z-10 rotate-[4deg] group-hover:rotate-[0deg] transition-all duration-500">
                      <ImageWithFallback
                        src="/BincangHati_Home.jpg"
                        alt="BincangHati Beranda & Mood Tracker"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-mono uppercase bg-primary/80 px-2 py-0.5 rounded-md font-bold">
                          AI Empathetic Voice & Video
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── Grid of Other Projects (GlowMe, IngatObat, TemanBumil) ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects
            .filter((p) => p.id !== flagshipProject.id || activeFilter !== 'All')
            .map((project, idx) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                index={idx}
                onSelectProjectInStudio={onSelectProjectInStudio}
              />
            ))}
        </div>

      </div>
    </section>
  );
}

interface ProjectCardItemProps {
  project: ProjectItem;
  index: number;
  onSelectProjectInStudio: (projectId: string) => void;
}

function ProjectCardItem({ project, index, onSelectProjectInStudio }: ProjectCardItemProps) {
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
      x: ((y - centerY) / centerY) * -7,
      y: ((x - centerX) / centerX) * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const mainScreenshot = project.screenshots[0];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative rounded-3xl glass-panel border border-border/80 p-6 sm:p-7 shadow-xl hover:shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic ambient hover glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${project.gradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10 space-y-5">
        
        {/* Screenshot Teaser Header */}
        <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-card/60 border border-border/60">
          <ImageWithFallback
            src={mainScreenshot.src}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badge over screenshot */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20 uppercase">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono text-white/90">
              {project.version}
            </span>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onSelectProjectInStudio(project.id);
            }}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-primary" />
            <span>Preview di Studio</span>
          </button>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-card/70 border border-border/60 text-[11px] font-mono text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* Action Row */}
      <div className="relative z-10 pt-6 mt-6 border-t border-border/60 flex items-center gap-3">
        <a
          href={project.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('pop')}
          className="flex-1 py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:border-primary/50"
        >
          <Download className="w-4 h-4" />
          <span>Unduh APK</span>
        </a>

        <button
          onClick={() => {
            playSound('click');
            onSelectProjectInStudio(project.id);
          }}
          className="p-3 rounded-xl bg-card border border-border/80 hover:border-primary/50 text-foreground transition-all cursor-pointer"
          title="Lihat Mockup Layar"
        >
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </button>
      </div>

    </div>
  );
}

