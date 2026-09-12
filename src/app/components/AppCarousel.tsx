import Slider from 'react-slick';
import { ImageWithFallback } from './figma/ImageWithFallback';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  onClick?: () => void;
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Geser ke kiri"
      className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-card/90 hover:bg-card border border-border/80 hover:border-primary backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
    >
      <svg className="w-6 h-6 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Geser ke kanan"
      className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-card/90 hover:bg-card border border-border/80 hover:border-primary backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
    >
      <svg className="w-6 h-6 -mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export function AppCarousel() {
  const screenshots = [
    {
      id: 1,
      src: '/SoulTalk.jpeg',
      alt: 'SoulTalk AI - Beranda & Mood Tracker',
      app: 'SoulTalk AI',
      description: 'Pelacak suasana hati & pendamping AI',
      featured: true,
    },
    {
      id: 2,
      src: '/SoulTalk2.jpeg',
      alt: 'SoulTalk AI - Sesi Panggilan AI Interaktif',
      app: 'SoulTalk AI',
      description: 'Sesi video call & obrolan dengan AI',
      featured: true,
    },
    {
      id: 3,
      src: '/SoulTalk3.jpeg',
      alt: 'SoulTalk AI - Ruang Refleksi',
      app: 'SoulTalk AI',
      description: 'Rangkuman & riwayat sesi refleksi diri',
      featured: true,
    },
    {
      id: 4,
      src: '/BundaCare.jpeg',
      alt: 'BundaCare - Pendamping Ibu Hamil',
      app: 'BundaCare',
      description: 'Pendamping ibu hamil dengan doa harian',
      featured: false,
    },
    {
      id: 5,
      src: '/IngatObat.jpeg',
      alt: 'IngatObat - Pengingat Obat',
      app: 'IngatObat',
      description: 'Jadwal minum obat tepat waktu',
      featured: false,
    },
    {
      id: 6,
      src: '/GlowTrack.jpeg',
      alt: 'GlowTrack - Tampilan Utama',
      app: 'GlowTrack',
      description: 'Pelacak kondisi kulit harian',
      featured: false,
    },
    {
      id: 7,
      src: '/GlowTrack2.jpeg',
      alt: 'GlowTrack - Fitur Lengkap',
      app: 'GlowTrack',
      description: 'Pengingat skincare & doa harian',
      featured: false,
    },
    {
      id: 8,
      src: '/SkinTalk.jpeg',
      alt: 'Blockchain Diary - Catatan Terdesentralisasi',
      app: 'Blockchain Diary',
      description: 'Catatan harian terdesentralisasi di blockchain',
      featured: false,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '40px',
    initialSlide: 0,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '30px' } },
      { breakpoint: 640,  settings: { slidesToShow: 1, centerPadding: '24px' } },
    ],
    customPaging: () => (
      <div className="w-1.5 h-1.5 rounded-full bg-border hover:bg-primary transition-colors duration-300 mt-8" />
    ),
  };

  return (
    <div className="carousel-container pb-10">
      <Slider {...settings}>
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="px-3 py-2">
            <div className="group relative">

              {/* Ambient glow di belakang kartu */}
              <div
                className={`absolute -inset-2 rounded-[32px] blur-2xl transition-all duration-700 ${
                  screenshot.featured
                    ? 'bg-gradient-to-b from-primary/25 to-accent/15 opacity-80 group-hover:opacity-100'
                    : 'bg-gradient-to-b from-primary/10 to-accent/5 opacity-0 group-hover:opacity-70'
                }`}
              />

              {/* Kartu */}
              <div
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-3 ${
                  screenshot.featured
                    ? 'shadow-[0_12px_40px_rgba(139,111,92,0.22)] ring-1 ring-primary/25 scale-[1.04]'
                    : 'shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-border/50 group-hover:shadow-[0_16px_48px_rgba(139,111,92,0.16)]'
                }`}
              >
                {/* Foto full — tidak ada kotak teks di bawah */}
                <div className="aspect-[9/16] relative overflow-hidden">
                  <ImageWithFallback
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />

                  {/* Gradient gelap bawah — selalu ada, tipis */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Badge unggulan — pojok kiri atas */}
                  {screenshot.featured && (
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Unggulan</span>
                    </div>
                  )}

                  {/* Teks nama & deskripsi — overlay bawah, muncul saat hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <p className="text-white font-semibold text-base leading-tight drop-shadow-md">
                      {screenshot.app}
                    </p>
                    <p className="text-white/75 text-xs mt-1 leading-relaxed drop-shadow-sm">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
