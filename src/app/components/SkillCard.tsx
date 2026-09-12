import { useState, useEffect, useRef } from 'react';

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    level: number;
    color: string;
  };
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setProgress(skill.level);
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Animated Glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}></div>

      <div className="relative">
        {/* Icon */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {skill.icon}
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: isVisible ? `${progress}%` : '0%' }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
          </div>
        </div>

        {/* Percentage */}
        <div className="mt-2 text-right">
          <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {isVisible ? progress : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
