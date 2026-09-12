import { useState, useRef } from 'react';

interface InteractiveProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  gradient: string;
  index: number;
  downloadUrl?: string;
}

export function InteractiveProjectCard({ name, description, tags, gradient, index, downloadUrl }: InteractiveProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000 fade-in-up"
      style={{
        animationDelay: `${index * 150}ms`,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

      {/* Card Content */}
      <div className="relative bg-card rounded-3xl p-8 border border-border overflow-hidden shadow-xl">
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-background/50 backdrop-blur-sm text-foreground/80 text-xs rounded-full border border-border group-hover:border-primary/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
            {description}
          </p>

          <a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden w-full flex items-center justify-center gap-2 font-medium text-sm ${
              downloadUrl
                ? 'bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50 pointer-events-none'
            }`}
          >
            Download APK
            <svg className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      </div>
    </div>
  );
}
