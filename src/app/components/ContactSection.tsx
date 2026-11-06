import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Peluang Kerja Penuh Waktu');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const topics = [
    'Peluang Kerja Penuh Waktu',
    'Proyek Flutter Freelance',
    'Administrasi & IT Support',
    'Konsultasi Umum'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    playSound('pop');
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_INFO.phone);
    setCopiedPhone(true);
    playSound('pop');
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playSound('click');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      playSound('success');

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5A970', '#38BDF8', '#10B981', '#F43F5E']
        });
      } catch {
        // Safe fallback
      }
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] glow-orb-primary rounded-full blur-[140px] pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mulai Kolaborasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Mari Terhubung & Berdiskusi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Saya terbuka untuk kesempatan kerja penuh waktu, proyek pengembangan aplikasi mobile Flutter, maupun peran teknologi informasi & administrasi.
          </p>
        </div>

        {/* ── Two-Column Grid ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 rounded-3xl glass-panel border border-border/80 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Informasi Kontak Langsung
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Respon cepat dalam 1x24 jam kerja.
                </p>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-3 group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">Email Utama</span>
                    <a
                      href={`mailto:${PROFILE_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {PROFILE_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Salin Email"
                  className="p-2 rounded-lg bg-background/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground text-xs transition-all cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-3 group hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">WhatsApp / Telepon</span>
                    <a
                      href={`https://wa.me/62${PROFILE_INFO.phone.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-foreground hover:text-emerald-500 transition-colors"
                    >
                      {PROFILE_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  title="Salin Nomor"
                  className="p-2 rounded-lg bg-background/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground text-xs transition-all cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-foreground">Jejaring Profesional:</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PROFILE_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 text-xs font-semibold text-foreground hover:text-primary transition-all flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PROFILE_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 text-xs font-semibold text-foreground hover:text-primary transition-all flex items-center gap-2"
                  >
                    <Github className="w-4 h-4 text-primary" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Status details */}
              <div className="p-4 rounded-2xl bg-background/50 border border-border/50 text-xs text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Domisili: Indonesia (Waktu Indonesia Barat)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Siap Kerja Jarak Jauh (Remote) & On-Site</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (Col 7) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl glass-panel border border-border/80 shadow-xl">
              
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-foreground">
                        Pesan Anda Berhasil Terkirim!
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Terima kasih telah menghubungi. Saya akan meninjau pesan Anda dan segera memberikan tanggapan melalui email dalam kurun waktu 1x24 jam.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playSound('pop');
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-card border border-border hover:border-primary text-xs font-semibold text-foreground transition-all cursor-pointer"
                    >
                      Kirim Pesan Lain
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Kirimkan Pesan Langsung
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pilih topik bahasan dan sampaikan kebutuhan Anda secara mendalam.
                      </p>
                    </div>

                    {/* Topic Selector Pills */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">
                        Topik Diskusi / Peluang:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => {
                          const isSelected = selectedTopic === t;
                          return (
                            <button
                              type="button"
                              key={t}
                              onClick={() => {
                                playSound('click');
                                setSelectedTopic(t);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                                  : 'bg-card/70 border border-border/80 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Input Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Nama Lengkap / Perusahaan
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso / PT Solusi Digital"
                        className="w-full px-4 py-3 rounded-2xl bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all"
                      />
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Alamat Email Anda
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        className="w-full px-4 py-3 rounded-2xl bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all"
                      />
                    </div>

                    {/* Input Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Uraian Pesan / Deskripsi Kebutuhan
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ceritakan tentang proyek, posisi lowongan kerja, atau pertanyaan Anda..."
                        className="w-full px-4 py-3 rounded-2xl bg-card/60 border border-border focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mengirimkan Pesan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Pesan Sekarang</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

