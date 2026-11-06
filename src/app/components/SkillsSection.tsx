import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Code2, 
  Layers, 
  Sparkles, 
  Flame, 
  Globe, 
  Database, 
  FileSpreadsheet, 
  CheckCircle2, 
  Users, 
  GitBranch, 
  Palette, 
  Terminal,
  Award
} from 'lucide-react';
import { SKILL_CATEGORIES, SkillCategory } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export function SkillsSection() {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const selectedCategory: SkillCategory = SKILL_CATEGORIES[selectedCategoryIdx];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-primary" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-primary" />;
      case 'Layers': return <Layers className="w-5 h-5 text-primary" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-primary" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-500" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-500" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-rose-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-violet-500" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-primary" />;
      default: return <Sparkles className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 overflow-hidden bg-card/20">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] glow-orb-primary rounded-full blur-[140px] pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Kompetensi & Kapabilitas Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Keahlian Profesional
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Perpaduan disiplin rekayasa perangkat lunak mobile berstandar tinggi dengan kapabilitas analitis dan administrasi teknologi informasi.
          </p>
        </div>

        {/* ── Category Switcher Pills ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === selectedCategoryIdx;
            return (
              <button
                key={cat.title}
                onClick={() => {
                  playSound('switch');
                  setSelectedCategoryIdx(idx);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground bg-card/60 hover:bg-card border border-border/70'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCatPill"
                    className="absolute inset-0 bg-primary rounded-2xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── Category Description ── */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto italic">
            &ldquo;{selectedCategory.description}&rdquo;
          </p>
        </div>

        {/* ── Skills Bento Grid for Active Category ── */}
        <div className="grid sm:grid-cols-2 gap-6">
          {selectedCategory.skills.map((skill, index) => (
            <SkillCardItem
              key={skill.name}
              skill={skill}
              icon={getIcon(skill.icon)}
              index={index}
            />
          ))}
        </div>

        {/* ── Summary Value Proposition Callout ── */}
        <div className="p-8 rounded-3xl glass-panel border border-border/80 shadow-lg grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase text-primary">Standar Rekayasa</span>
            <h4 className="text-base font-bold text-foreground">Clean Code & Architecture</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Memisahkan lapisan bisnis, data, dan UI agar kode aplikasi modular, mudah diuji, dan skalabel.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase text-accent">Kualitas & Data</span>
            <h4 className="text-base font-bold text-foreground">Akurasi & Integritas Tinggi</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Keahlian pengolahan data menggunakan Microsoft Office, validasi ketat, serta konsistensi dokumentasi.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase text-emerald-500">Kesiapan Kerja</span>
            <h4 className="text-base font-bold text-foreground">Cepat Beradaptasi & Kolaboratif</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Komunikasi proaktif, kepatuhan deadline, dan antusiasme tinggi untuk mempelajari sistem baru.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

interface SkillCardItemProps {
  skill: {
    name: string;
    level: number;
    badge: string;
    icon: string;
    description: string;
  };
  icon: React.ReactNode;
  index: number;
}

function SkillCardItem({ skill, icon, index }: SkillCardItemProps) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-3xl glass-panel border border-border/80 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 space-y-4 group"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {skill.name}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {skill.badge}
            </span>
          </div>
        </div>
        <span className="text-sm font-bold font-mono text-primary">
          {inView ? skill.level : 0}%
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {skill.description}
      </p>

      {/* Progress Bar with Shimmer */}
      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

