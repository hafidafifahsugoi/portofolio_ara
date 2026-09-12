import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { InteractiveProjectCard } from './components/InteractiveProjectCard';
import { AppCarousel } from './components/AppCarousel';
import { SkillCard } from './components/SkillCard';
import { useState, useEffect } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { key: 'about', label: 'Tentang' },
    { key: 'skills', label: 'Keahlian' },
    { key: 'projects', label: 'Proyek' },
    { key: 'gallery', label: 'Galeri' },
    { key: 'contact', label: 'Kontak' },
  ];

  // Deteksi section aktif saat scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ key }) => {
      const el = document.getElementById(key);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(key);
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

      {/* ── Navigation ── */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-card/80 backdrop-blur-xl border border-border rounded-full px-8 py-3 shadow-2xl nav-float">
        <div className="flex items-center gap-8">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-medium transition-all duration-300 relative ${activeSection === key
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {label}
              {activeSection === key && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════
          ABOUT — profil kiri, quote kanan
      ══════════════════════════════════════ */}
      <section id="about" className="relative min-h-screen px-6 pt-32 pb-24 flex items-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* ── Kiri: Profil ── */}
            <div>
              {/* Foto */}
              <div className="relative w-44 h-52 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-lg opacity-40" />
                <ImageWithFallback
                  src="/naura.png"
                  alt="Naura Afifah Karimawati"
                  className="relative rounded-2xl object-cover object-top w-full h-full"
                />
              </div>

              {/* Nama & Jabatan */}
              <h1 className="text-4xl font-bold text-foreground mb-1 tracking-tight">
                Naura Afifah Karimawati
              </h1>
              <p className="text-primary font-medium text-sm mb-6 tracking-wide uppercase">
                Lulusan S1 Informatika | Administrasi & Teknologi Informasi
              </p>

              {/* Bio */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-[15px] max-w-xl">
                Saya merupakan lulusan Informatika yang memiliki pengalaman dalam administrasi, pengolahan data, dan pengembangan aplikasi. Terbiasa menggunakan Microsoft Office, bekerja secara teliti, serta mampu berkomunikasi dan bekerja sama dalam tim. Selain itu, saya juga memiliki kemampuan dalam pengembangan aplikasi mobile menggunakan Flutter sebagai nilai tambah di bidang teknologi informasi.
              </p>

              {/* Kontak */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <a href="tel:085787897954" className="text-sm text-foreground hover:text-primary transition-colors">
                    087878979541
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <a href="mailto:naulovchan8@gmail.com" className="text-sm text-foreground hover:text-primary transition-colors">
                    naulovchan8@gmail.com
                  </a>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveSection('projects');
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Lihat Proyek
                </button>
                <a
                  href="https://www.linkedin.com/in/naura-afifah-karimawati-a1a746378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium hover:border-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/hanyakamukarenakamu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium hover:border-primary transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* ── Kanan: Quote ── */}
            <div className="flex flex-col justify-center">
              <div className="relative">
                {/* Tanda kutip dekoratif */}
                <svg
                  className="w-12 h-12 text-primary/20 mb-6"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
                </svg>

                <blockquote className="text-2xl font-light text-foreground leading-relaxed tracking-tight">
                  Setiap aplikasi yang saya buat dirancang dengan penuh perhatian, memadukan fungsi dengan dampak yang bermakna.
                </blockquote>

                {/* Garis aksen */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">Naura Afifah</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section id="skills" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium text-foreground mb-4">Keahlian Teknis</h2>
            <p className="text-lg text-muted-foreground">
              Teknologi yang saya gunakan untuk membangun aplikasi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Flutter', icon: '📱', level: 95, color: 'from-blue-500 to-cyan-500' },
              { name: 'Firebase', icon: '🔥', level: 90, color: 'from-orange-500 to-red-500' },
              { name: 'HTML', icon: '🌐', level: 85, color: 'from-orange-400 to-pink-500' },
              { name: 'CSS', icon: '🎨', level: 88, color: 'from-purple-500 to-pink-500' },
              { name: 'PHP', icon: '⚙️', level: 80, color: 'from-indigo-500 to-purple-500' },
            ].map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════ */}
      <section id="projects" className="relative px-6 py-24 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium text-foreground mb-4">Proyek Unggulan</h2>
            <p className="text-lg text-muted-foreground">
              Aplikasi mobile yang saya bangun dengan penuh semangat
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveProjectCard
              name="GlowTrack"
              description="Aplikasi untuk mencatat dan memantau kondisi kulit secara berkala. Dilengkapi dengan analisis sederhana, pengingat perawatan skincare, serta doa harian untuk mendukung rutinitas perawatan yang lebih konsisten."
              tags={['Flutter', 'Firebase', 'Health']}
              gradient="from-pink-500/20 to-rose-500/20"
              index={0}
              downloadUrl="https://drive.google.com/uc?export=download&id=1fOYpkPu1b6yYHjf-egup3Wm8Ll2l8m6v"
            />
            <InteractiveProjectCard
              name="IngatObat"
              description="Aplikasi sederhana untuk membantu pengguna mengingat jadwal minum obat secara teratur. Dilengkapi dengan notifikasi yang tepat waktu agar pengobatan tidak terlewat."
              tags={['Flutter', 'Notifications', 'Healthcare']}
              gradient="from-blue-500/20 to-cyan-500/20"
              index={1}
              downloadUrl="https://drive.google.com/uc?export=download&id=1E8y0oMiKwlMbwxSFMKPlpW-dknAD3Tuh"
            />
            <InteractiveProjectCard
              name="SkinTalk"
              description="Teman digital untuk berbagi keluhan kulit, dilengkapi dengan tanggapan AI yang membantu memberikan insight awal sebelum perawatan lebih lanjut."
              tags={['Flutter', 'AI', 'Healthcare']}
              gradient="from-purple-500/20 to-indigo-500/20"
              index={2}
              downloadUrl="https://drive.google.com/uc?export=download&id=1Qud7sB6iKNErs6OCW_qHQCbjp9XJIRed"
            />
            <InteractiveProjectCard
              name="BundaCare"
              description="Aplikasi pendamping ibu hamil yang menyediakan doa dan dzikir harian, pengingat, serta fitur sederhana untuk membantu menjaga kesehatan dan ketenangan selama masa kehamilan."
              tags={['Flutter', 'Firebase', 'Wellness']}
              gradient="from-green-500/20 to-emerald-500/20"
              index={3}
              downloadUrl="https://drive.google.com/uc?export=download&id=1vu0204sesZKPcjHMezaOGxp_o0JsKMjh"
            />
            <InteractiveProjectCard
              name="SoulTalk AI"
              description="Aplikasi pendamping kesehatan mental berbasis AI dengan fitur percakapan interaktif, pelacak suasana hati (mood tracking), dan rangkuman obrolan untuk menjaga ketenangan pikiran."
              tags={['Flutter', 'AI', 'Mental Wellness']}
              gradient="from-teal-500/20 to-indigo-500/20"
              index={4}
              downloadUrl="https://drive.google.com/uc?export=download&id=19PP9nMEHnItyAxdQEzoEyoNJksNg7LUQ"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium text-foreground mb-4">Galeri Aplikasi</h2>
            <p className="text-lg text-muted-foreground">
              Tampilan indah, interaksi yang mulus
            </p>
          </div>
          <AppCarousel />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT — sebelum footer
      ══════════════════════════════════════ */}
      <section id="contact" className="relative px-6 py-24 bg-card/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Kiri — teks ajakan */}
            <div className="lg:pt-4">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Hubungi Saya</p>
              <h2 className="text-4xl font-bold text-foreground leading-tight mb-6">
                Mari buat sesuatu yang indah bersama
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 text-[15px]">
                Saya terbuka untuk proyek freelance dan peluang kerja penuh waktu
                di bidang mobile development.
              </p>

              {/* Info kontak */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Telepon</p>
                    <a href="tel:085787897954" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      085787897954
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <a href="mailto:naulovchan8@gmail.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      naulovchan8@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan — Form */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Pesan terkirim! Terima kasih telah menghubungi saya.');
                  (e.target as HTMLFormElement).reset();
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    placeholder="Masukkan alamat email Anda"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Bagaimana saya bisa membantu Anda?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative px-6 py-10 border-t border-border bg-card/30">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            © 2026 Naura Afifah Karimawati. Dirancang dengan penuh perhatian.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:naulovchan8@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/naura-afifah-karimawati-a1a746378" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://github.com/hanyakamukarenakamu" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
