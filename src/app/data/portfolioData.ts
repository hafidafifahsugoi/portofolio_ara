export interface ProjectScreenshot {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: 'AI & Healthcare' | 'Life & Utilities';
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  featured?: boolean;
  downloadUrl: string;
  version: string;
  fileSize: string;
  screenshots: ProjectScreenshot[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'bincanghati',
    name: 'BincangHati',
    tagline: 'AI Video Call Suara Empatik & Deteksi Emosi Wajah',
    category: 'AI & Healthcare',
    description:
      'Lepaskan beban pikiran kapan pun kamu butuh tanpa takut dihakimi. Dapatkan teman bercerita yang benar-benar memahami lewat video call suara AI yang responsif, pahami kondisi perasaanmu lewat deteksi emosi wajah otomatis, serta rawat ketenangan diri setiap hari dengan pelacak suasana hati yang mudah dan menyenangkan',
    highlights: [
      'Sesi Video Call Suara AI Empatik Real-time',
      'Deteksi & Pemindaian Emosi Wajah Kamera Langsung',
      'Mood Tracker Interaktif & Log Pola Emosional',
      'Sesi Cerita Terpandu & Transkrip Percakapan'
    ],
    tags: ['Flutter', 'AI Voice & Video', 'Emotion Detection', 'Mental Wellness', 'Provider'],
    gradient: 'from-violet-500/20 via-sky-500/15 to-indigo-500/20',
    featured: true,
    version: 'v1.5.0 Release',
    fileSize: '',
    downloadUrl: 'https://drive.google.com/file/d/1WUUwBopZj_MUc_WT66hh_j5fb7mFr-TM/view?usp=drive_link',
    screenshots: [
      {
        id: 'bh-home',
        src: '/BincangHati_Home.jpg',
        title: 'Beranda & Mood Tracker Interaktif',
        caption: 'Dashboard emosional dengan check-in suasana hati harian, sapaan hangat AraChan, dan akses cepat ke sesi cerita.'
      },
      {
        id: 'bh-call',
        src: '/BincangHati_Call.jpg',
        title: 'Sesi Video Call Suara AI Empatik',
        caption: 'Video call interaktif real-time dengan pemindaian ekspresi wajah kamera langsung, AI avatar adaptif, dan transkrip percakapan langsung.'
      },
      {
        id: 'st-3',
        src: '/SoulTalk3.jpeg',
        title: 'Ruang Refleksi Diri',
        caption: 'Jurnal harian terpandu dengan afirmasi positif dan rangkuman refleksi batin.'
      },
      {
        id: 'st-4',
        src: '/SoulTalk4.jpeg',
        title: 'Analisis Pola Emosi & AI Insights',
        caption: 'Visualisasi grafik mood mingguan dengan deteksi pola emosional yang intuitif.'
      },
      {
        id: 'st-5',
        src: '/SoulTalk5.jpeg',
        title: 'Histori Sesi & Evaluasi Ketenangan',
        caption: 'Rekam jejak percakapan dan evaluasi perkembangan kesehatan mental secara komprehensif.'
      }
    ]
  },
  {
    id: 'glowme',
    name: 'GlowMe',
    tagline: 'Smart Skincare Tracker & Routine Companion',
    category: 'AI & Healthcare',
    description:
      'Wujudkan kulit impian tanpa rasa bingung dan ragu. Pantau kemajuan kondisi kulit harianmu secara nyata, bangun konsistensi perawatan lewat jadwal pengingat skincare yang presisi, serta rawat rasa percaya dirimu dengan afirmasi harian dan doa perawatan agar rutinitas kecantikan terasa lebih tenang dan bermakna.',
    highlights: [
      'Log & Analisis Grafik Perkembangan Kulit',
      'Pengingat Rutinitas Skincare Pagi & Malam',
      'Ruang Afirmasi Positif & Doa Perawatan Diri',
      'Sinkronisasi Cloud Firebase Otomatis'
    ],
    tags: ['Flutter', 'Firebase', 'Skincare Analytics', 'Push Notification'],
    gradient: 'from-rose-500/20 via-pink-500/15 to-amber-500/20',
    version: 'v1.2.0 Release',
    fileSize: '',
    downloadUrl: 'https://drive.google.com/file/d/1z0wRU-H69P5PrAhETpZ7AtYCcQLh61OK/view?usp=drive_link',
    screenshots: [
      {
        id: 'gm-home',
        src: '/GlowMe_Home.jpg',
        title: 'Beranda & Ruang Afirmasi',
        caption: 'Dashboard harian dengan pemantau rutinitas pagi & malam, status kulit, serta ruang afirmasi, refleksi, dan doa harian.'
      },
      {
        id: 'gm-analitik',
        src: '/GlowMe_Analitik.jpg',
        title: 'Analitik Tingkat Kenyamanan Kulit',
        caption: 'Grafik tren kenyamanan kulit skala 1-10, indikator stabilitas kondisi kulit, dan rekap riwayat catatan berkala.'
      },
      {
        id: 'gt-1',
        src: '/GlowTrack.jpeg',
        title: 'Tampilan Log Kondisi Kulit',
        caption: 'Pelacak kondisi kulit harian dengan visualisasi perkembangan kondisi wajah.'
      },
      {
        id: 'gt-2',
        src: '/GlowTrack2.jpeg',
        title: 'Langkah Rutinitas & Doa Mustajab',
        caption: 'Daftar langkah skincare terperinci lengkap dengan doa untuk keberkahan perawatan.'
      }
    ]
  },
  {
    id: 'ingatobat',
    name: 'IngatObat',
    tagline: 'Calming & Aesthetic Medication Reminder',
    category: 'Life & Utilities',
    description:
      'Jaga kesehatan tubuh tetap optimal di tengah padatnya aktivitas harian. Nikmati pengingat obat yang cerdas dan tepat waktu lewat tampilan visual yang lembut, menenangkan, serta bebas dari kesan kaku—membuat rutinitas minum obat terasa lebih ringan, nyaman, dan menyenangkan untuk dijalani setiap hari',
    highlights: [
      'Calming & Aesthetic UI yang Menenangkan',
      'Kalender Kepatuhan Minum Obat Harian',
      'Ringkasan Progres & Status Jadwal Real-time',
      'Pratinjau Kartu Obat & Pengaturan Dosis Cepat'
    ],
    tags: ['Flutter', 'Local Notifications', 'Healthcare', 'Local Database'],
    gradient: 'from-teal-500/20 via-emerald-500/15 to-cyan-500/20',
    version: 'v1.1.5 Release',
    fileSize: '',
    downloadUrl: 'https://drive.google.com/file/d/1fdbvyeXwrd9bFje9xLJYpWJymNdUKt5L/view?usp=drive_link',
    screenshots: [
      {
        id: 'io-home',
        src: '/IngatObat_Home.jpg',
        title: 'Jadwal Harian & Kalender Kepatuhan',
        caption: 'Kalender mingguan dengan indikator sudah/sebagian/belum minum, ringkasan progres hari ini, dan daftar jadwal obat.'
      },
      {
        id: 'io-tambah',
        src: '/IngatObat_Tambah.jpg',
        title: 'Tambah Obat & Pratinjau Kartu',
        caption: 'Form pengingat obat dengan pratinjau kartu langsung, pilihan dosis cepat, dan aturan waktu konsumsi.'
      },
      {
        id: 'io-1',
        src: '/IngatObat.jpeg',
        title: 'Jadwal Obat & Alarm Pengingat',
        caption: 'List jadwal konsumsi obat harian dengan indikator status minum dan waktu otomatis.'
      }
    ]
  },
  {
    id: 'temanbumil',
    name: 'TemanBumil',
    tagline: 'Maternity Companion, Daily Prayers & Wellness',
    category: 'Life & Utilities',
    description:
      'Jalani masa kehamilan lebih tenang dan terencana. Pantau tumbuh kembang si kecil tiap minggu secara visual, jaga hidrasi dan rutinitas harian tanpa repot, serta rawat ketenangan batin lewat doa harian, tasbih digital, dan jurnal emosi—semua dalam satu aplikasi ringan dan responsif.',
    highlights: [
      'Kumpulan Doa & Dzikir Khusus Kehamilan',
      'Pengingat Jadwal Periksa Medis & Vitamin',
      'Catatan Perkembangan Usia Kandungan',
      'Tips Medis & Relaksasi Ibu Hamil'
    ],
    tags: ['Flutter', 'Firebase', 'Maternity', 'Wellness'],
    gradient: 'from-emerald-500/20 via-teal-500/15 to-green-500/20',
    version: 'v1.3.0 Release',
    fileSize: '',
    downloadUrl: 'https://drive.google.com/file/d/1HNxBLlmi03Nn6ZwYwtO-gn1VS4dIPomm/view?usp=drive_link',
    screenshots: [
      {
        id: 'bc-1',
        src: '/BundaCare.jpeg',
        title: 'Beranda Ibu Hamil & Doa Mustajab',
        caption: 'Antarmuka menyejukkan dengan kartu doa pilihan, kalkulator usia kehamilan, dan artikel kesehatan.'
      }
    ]
  }
];

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number;
    badge: string;
    icon: string;
    description: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Mobile Development',
    description: 'Arsitektur dan pengembangan aplikasi mobile Android & multi-platform berstandar industri.',
    skills: [
      {
        name: 'Flutter Framework',
        level: 94,
        badge: 'Spesialisasi Utama',
        icon: 'Smartphone',
        description: 'Cross-platform app development, custom animations, responsive layouts, & native performance.'
      },
      {
        name: 'Dart Programming',
        level: 92,
        badge: 'Advanced',
        icon: 'Code2',
        description: 'OOP, asynchronous streams, sound null safety, pattern matching, & clean architecture.'
      },
      {
        name: 'State Management (Provider & Bloc)',
        level: 88,
        badge: 'Arsitektur',
        icon: 'Layers',
        description: 'Separation of concerns, reactive data flows, predictability, and scalable structure.'
      },
      {
        name: 'Mobile UI/UX Design & Micro-motion',
        level: 90,
        badge: 'Craft & Motion',
        icon: 'Sparkles',
        description: 'Pixel-perfect layout implementation, smooth transitions, and accessible components.'
      }
    ]
  },
  {
    title: 'Backend, Cloud & Database',
    description: 'Integrasi layanan data cloud, autentikasi aman, dan penyimpanan lokal offline.',
    skills: [
      {
        name: 'Firebase Ecosystem',
        level: 89,
        badge: 'Cloud Sync',
        icon: 'Flame',
        description: 'Cloud Firestore, Firebase Authentication, Cloud Messaging (FCM), & Analytics.'
      },
      {
        name: 'RESTful API & HTTP Client',
        level: 87,
        badge: 'Integrasi',
        icon: 'Globe',
        description: 'JSON serialization, error handling, token authentication, & API lifecycle integration.'
      },
      {
        name: 'Local Storage (SQLite & Hive)',
        level: 85,
        badge: 'Offline-First',
        icon: 'Database',
        description: 'Penyimpanan terenkripsi lokal, caching performa tinggi, & sinkronisasi data.'
      }
    ]
  },
  {
    title: 'Administrasi & Teknologi Informasi',
    description: 'Keahlian analitis, pemrosesan data presisi, dan operasional administrasi profesional.',
    skills: [
      {
        name: 'Microsoft Office & Excel Advanced',
        level: 95,
        badge: 'Sangat Mahir',
        icon: 'FileSpreadsheet',
        description: 'Pivot tables, VLOOKUP/XLOOKUP, visualisasi data laporan, & administrasi dokumen terstruktur.'
      },
      {
        name: 'Pengolahan & Validasi Data',
        level: 92,
        badge: 'Presisi Tinggi',
        icon: 'CheckCircle2',
        description: 'Input data teliti, rekonsiliasi data, pembersihan data (data cleansing), dan pelaporan.'
      },
      {
        name: 'Komunikasi & Kolaborasi Tim',
        level: 93,
        badge: 'Interpersonal',
        icon: 'Users',
        description: 'Manajemen alur kerja, komunikasi lintas divisi, kepatuhan tenggat waktu, dan adaptabilitas.'
      }
    ]
  },
  {
    title: 'Alat & Ekosistem Pengembang',
    description: 'Tool modern untuk efisiensi pengujian, kontrol versi, dan kolaborasi.',
    skills: [
      {
        name: 'Git & GitHub',
        level: 88,
        badge: 'Version Control',
        icon: 'GitBranch',
        description: 'Branching strategies, code versioning, commit hygiene, & remote repositories.'
      },
      {
        name: 'Figma to Code',
        level: 87,
        badge: 'Desain Sistem',
        icon: 'Palette',
        description: 'Mengonversi rancangan UI/UX Figma menjadi kode Flutter yang responsif dan presisi.'
      },
      {
        name: 'Android Studio & VS Code',
        level: 90,
        badge: 'IDE & Profiling',
        icon: 'Terminal',
        description: 'DevTools, widget inspection, debug profiling, & APK build release optimization.'
      }
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Naura Afifah Karimawati',
  title: 'Lulusan S1 Informatika • Mobile Application Engineer (Flutter) • Administrasi & IT Specialist',
  shortBio:
    'Lulusan Sarjana Informatika dengan dedikasi tinggi dalam rekayasa aplikasi mobile (Flutter) dan pengolahan data administratif. Berkomitmen menghadirkan produk digital yang estetik, stabil, dan memberikan dampak nyata bagi pengguna.',
  fullBio:
    'Saya merupakan lulusan S1 Informatika yang memadukan ketelitian administratif, analisis data, dan keahlian rekayasa aplikasi mobile modern menggunakan Flutter. Terbiasa bekerja secara terstruktur, kolaboratif, dan presisi tinggi dengan Microsoft Office serta arsitektur kode Flutter yang bersih dan mudah dirawat.',
  email: 'naulovchan8@gmail.com',
  phone: '087878979541',
  phoneDisplay: '+62 878-7897-9541',
  linkedin: 'https://www.linkedin.com/in/naura-afifah-karimawati-a1a746378',
  github: 'https://github.com/hafidafifahsugoi',
  location: 'Indonesia (WIB)',
  status: 'Terbuka untuk Peluang Kerja Penuh Waktu & Kontrak Proyek'
};

