"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageCircle,
  Phone,
  Instagram,
  MapPin,
  Monitor,
  Gamepad2,
  X,
  ArrowRight,
  Zap,
  Crown,
  Timer,
  Calendar,
  Clock,
  Users,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Expand,
  Shrink,
  Navigation,
  Star,
  Trophy,
  UserPlus,
  HelpCircle,
  ArrowUpRight,
  Server,
  MemoryStick,
  HardDrive,
  Wifi,
  Headphones,
  CreditCard,
  ArrowUp,
  Eye,
} from "lucide-react";
import GameLibrary from "@/components/GameLibrary";
import LoadingScreen from "@/components/LoadingScreen";

/* ═══════════════════════════════════════════════
   ANİMASYONLAR
   ═══════════════════════════════════════════════ */

const slideUp = {
  hidden: { opacity: 0, y: 6 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, delay: d * 0.03, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (d = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.12, delay: d * 0.02, type: "spring", stiffness: 400, damping: 30 },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.01, delayChildren: 0 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -10 },
  show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.15, delay: d * 0.02, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 10 },
  show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.15, delay: d * 0.02, ease: [0.22, 1, 0.36, 1] } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.12, delay: d * 0.02, type: "spring", stiffness: 360, damping: 26 } }),
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  show: (d = 0) => ({ opacity: 1, filter: "blur(0px)", transition: { duration: 0.15, delay: d * 0.02, ease: [0.22, 1, 0.36, 1] } }),
};

/* Aurora çizgisi */
function AuroraLine() {
  return (
    <div className="absolute inset-x-0 top-0 h-px overflow-hidden z-10">
      <motion.div
        className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#ff8c00] to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */

const navItems = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Ekipman", href: "#ekipman" },
  { label: "Galeri", href: "#galeri" },
  { label: "İletişim", href: "#iletisim" },
  { label: "Rezervasyon", href: "#rezervasyon" },
  { label: "SSS", href: "#sss" },
];

function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-menu]')) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "auto" });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      {/* Centered logo */}
      <div className="flex justify-center pt-3 pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg">
            <img src="/versus-logo-new.png" alt="V" className="h-full w-full object-cover" />
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[12px] sm:text-[14px] md:text-[16px] font-black tracking-[0.15em] text-white">SALİH FX</span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold tracking-[0.2em] text-gray-100 uppercase">Game Center & İnternet Kafe</span>
          </div>
        </div>
      </div>

      {/* Fixed kebab menu — bottom-left */}
      <div className="fixed left-3 top-3 z-[60] pointer-events-auto" data-menu>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-black/85 hover:bg-black/90 transition-colors"
          aria-label="Menü"
        >
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <span className={`block w-[3px] h-[3px] rounded-full transition-all duration-300 ${menuOpen ? "bg-[#ff8c00] shadow-[0_0_6px_rgba(255,140,0,0.6)]" : "bg-gray-400"}`} />
            <span className={`block w-[3px] h-[3px] rounded-full transition-all duration-300 ${menuOpen ? "bg-[#ff8c00] shadow-[0_0_6px_rgba(255,140,0,0.6)]" : "bg-gray-400"}`} />
            <span className={`block w-[3px] h-[3px] rounded-full transition-all duration-300 ${menuOpen ? "bg-[#ff8c00] shadow-[0_0_6px_rgba(255,140,0,0.6)]" : "bg-gray-400"}`} />
          </div>
        </motion.button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-white/[0.1] bg-black/90 overflow-hidden shadow-2xl shadow-black/50"
            >
              <div className="py-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-gray-100 hover:text-[#ff8c00] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {/* Bottom accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#ff8c00]/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}


/* ═══════════════════════════════════════════════
   HERO — Legendary Gaming Design
   ═══════════════════════════════════════════════ */

function Hero() {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setDone(true), 300);
    return () => clearTimeout(t);
  }, [started]);

  // Particles — minimal for performance
  const particles = [
    { top: '20%', left: '15%', size: '2px', color: '#ff8c00', dx: '15px', dy: '-20px', dur: '10s', delay: '0s' },
    { top: '65%', right: '12%', size: '2px', color: '#00d4e8', dx: '-15px', dy: '15px', dur: '12s', delay: '2s' },
    { top: '40%', left: '75%', size: '2px', color: '#ff2d55', dx: '-20px', dy: '-25px', dur: '11s', delay: '4s' },
    { top: '80%', left: '45%', size: '2px', color: '#22c55e', dx: '20px', dy: '15px', dur: '9s', delay: '1s' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ contain: 'layout style paint' }}>
      {/* Background layers */}
      <div className="hero-bg" />

      {/* Floating particles — minimal */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            top: p.top,
            left: p.left || undefined,
            right: p.right || undefined,
            '--ps': p.size,
            '--pc': p.color,
            '--px': p.dx,
            '--py': p.dy,
            '--pd': p.dur,
            '--pdel': p.delay,
          } as React.CSSProperties}
        />
      ))}



      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-16 pb-8">
        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/80 px-3 sm:px-4 py-1 sm:py-1.5 badge-pulse"
        >
          <span className="relative flex h-[5px] w-[5px] sm:h-[6px] sm:w-[6px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-[5px] w-[5px] sm:h-[6px] sm:w-[6px] rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-wide text-gray-100">Ankara / Çubuk</span>
        </motion.div>

        {/* VERSUS text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-black tracking-[0.4em] text-white/50 uppercase mb-2 sm:mb-3">
            SALİH FX
          </p>
        </motion.div>

        {/* Massive VS emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={started ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 150, damping: 20 }}
          className="relative"
        >
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[260px] xl:text-[300px] font-black leading-none text-white select-none hero-gradient-text">
            SF
          </h1>
          {/* Horizontal lines through VS */}
          <div className="absolute top-1/2 left-[-20px] sm:left-[-40px] right-[-20px] sm:right-[-40px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
        </motion.div>

        {/* GAME CENTER text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-black tracking-[0.4em] text-white/50 uppercase mt-2 sm:mt-3 mb-6 sm:mb-8">
            GAME CENTER & İNTERNET KAFE
          </p>
        </motion.div>

        {/* Tagline with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] font-black tracking-tight hero-gradient-text mb-3 sm:mb-4">
            SINIRLARI ZORLA.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 sm:mb-8 max-w-md text-[12px] sm:text-[14px] md:text-[16px] leading-relaxed text-gray-200"
        >
          Premium gaming deneyimi. E-spor, yarış simülatörü ve VIP odalar.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3"
        >
          {/* WhatsApp */}
          <motion.a href="https://wa.me/905057499978" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-[13px] font-bold text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-shadow duration-300">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-1.13-.297-.262-.586-.177-.836.063l-.562.562c-.262.262-.66.284-1.054.106C9.636 12.966 7.823 10.332 7.058 9.272c-.262-.364-.24-.75.063-1.053l.562-.562c-.262-.262-.338-.551.063-.836-.149-.149-1.422-1.676-1.666-1.934C5.806 4.625 5.522 4.672 5.295 4.899L4.736 5.46c-1.102 1.102-.967 2.69.32 4.615 1.358 2.028 3.688 4.595 5.822 5.824 2.058 1.185 3.578 1.34 4.615.32l.562-.562c-.224-.224.265-.505.063-.836-.224-.366-1.368-1.382-1.648-1.64z"/></svg>
            <span>WhatsApp</span><span className="text-[9px] sm:text-[10px] text-green-200/70">0505 749 99 78</span>
          </motion.a>
          {/* Rezervasyon */}
          <motion.a href="#rezervasyon" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group flex items-center gap-2 rounded-lg border-2 border-[#ff8c00] bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-[13px] font-bold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,140,0,0.2)] hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            Rezervasyon
          </motion.a>
          {/* Yol Tarifi */}
          <motion.a href="https://maps.google.com/?q=Cumhuriyet+Mah.+Arı+Sokak+No+9%2FA+06760+Çubuk%2FAnkara" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group flex items-center gap-2 rounded-2xl bg-white/[0.06] border border-white/[0.12] px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-[13px] font-bold text-white hover:bg-white/[0.12] transition-all duration-300">
            <Navigation className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-200 group-hover:text-white transition-colors" />
            Yol Tarifi
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center mt-8 sm:mt-10"
        >
          <div className="scroll-cta-btn flex flex-col items-center gap-2 rounded-full border border-[#ff8c00]/30 bg-[#ff8c00]/5 px-6 py-3 cursor-pointer"
            onClick={() => document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-[#ff8c00]/80">Aşağı Keşfet</span>
            <div className="chevron-double flex flex-col items-center gap-0">
              <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff8c00]/70" />
              <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff8c00]/50 -mt-1.5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature teaser strip — what's waiting below */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={done ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-[4] pb-4 sm:pb-6"
      >
        <div className="teaser-line mx-auto max-w-lg sm:max-w-xl mb-4 sm:mb-5" />
        <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6">
          <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
            {[
              { icon: Zap, label: "RTX 4090", sub: "PC Gaming", color: "#00d4e8", section: "#ekipman" },
              { icon: Crown, label: "VIP Oda", sub: "4-8 Kişilik", color: "#ff2d55", section: "#hizmetler" },
              { icon: Trophy, label: "Turnuva", sub: "Haftalık", color: "#ff8c00", section: "#hizmetler" },
              { icon: Gamepad2, label: "450+ Oyun", sub: "Kütüphane", color: "#22c55e", section: "#galeri" },
              { icon: Timer, label: "02:00", sub: "Kapanış", color: "#eab308", section: "#iletisim" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.section}
                initial={{ opacity: 0, y: 20 }}
                animate={done ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="teaser-card flex-shrink-0 flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/[0.08] bg-black/85 px-3 py-2 sm:px-4 sm:py-2.5"
              >
                <div className="teaser-icon-wrap flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${item.color}15` }}>
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: item.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white/90 leading-tight">{item.label}</span>
                  <span className="text-[8px] sm:text-[9px] text-white/40 leading-tight">{item.sub}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   NEON MARQUEE 1 — Glitch Distortion Stili
   ═══════════════════════════════════════════════ */

function NeonMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = [
    "SALİH FX GAME CENTER",
    "PREMIUM GAMING",
    "RTX 4090",
    "24/7 AÇIK",
    "E-SPOR",
    "VIP ODA",
    "YARIŞ SİMÜLATÖRÜ",
    "240Hz MONİTÖR",
    "TURNUVALAR",
    "ANKARA",
  ];
  const trackClass = reverse ? "marquee-track-right" : "marquee-track-left";
  return (
    <div className="relative z-10 overflow-hidden py-5 sm:py-6 glitch-marquee-wrapper marquee-mask">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,140,0,0.3) 1px, rgba(255,140,0,0.3) 2px)" }} />
      {/* Top/bottom RGB lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff8c00]/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4e8]/50 to-transparent" />
      <div className={`flex whitespace-nowrap ${trackClass}`} style={{ width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="group relative mx-3 sm:mx-4 inline-flex items-center select-none">
            {/* Glitch shadow layers */}
            <span className="absolute text-[16px] sm:text-[20px] md:text-[24px] font-black tracking-[0.2em] uppercase text-cyan-400/20 blur-[0.5px]" style={{ clipPath: "inset(20% 0 60% 0)", transform: "translate(-2px, 0)" }}>{item}</span>
            <span className="absolute text-[16px] sm:text-[20px] md:text-[24px] font-black tracking-[0.2em] uppercase text-red-400/20 blur-[0.5px]" style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, 0)" }}>{item}</span>
            {/* Main text */}
            <span className="relative text-[16px] sm:text-[20px] md:text-[24px] font-black tracking-[0.2em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-300">{item}</span>
            {/* Neon separator */}
            <span className="mx-3 sm:mx-4 inline-block w-1.5 h-1.5 rounded-full bg-[#ff8c00]/40 shadow-[0_0_6px_rgba(255,140,0,0.6)] group-hover:bg-[#ff8c00]/80 group-hover:shadow-[0_0_12px_rgba(255,140,0,0.8)] transition-all duration-300" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROMO BANNER — Tam Genişlik Görsel
   ═══════════════════════════════════════════════ */

function PromoBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-4 sm:py-5">
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] neon-glow bg-gradient-to-br from-[#ff8c00]/10 via-neutral-950 to-blue-500/10 h-40 sm:h-48 md:h-56 flex items-end rgb-border-spin">
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#ff8c00]/20">
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ff8c00]" />
              </div>
              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-bold tracking-widest text-[#ff8c00] uppercase">Özel Kampanya</span>
            </div>
            <p className="text-[16px] sm:text-[20px] md:text-[24px] font-black text-white leading-tight mb-1">
              İlk Gelişine <span className="neon-text">%30 İndirim</span>
            </p>
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100">Tüm paketlerde geçerli • Çubuk şubesi</p>
          </div>
          {/* Shine sweep */}
          <div className="absolute inset-0 shine-effect" />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   OYUN LOGOSU KAYAN BANT — Neon Pill Stili
   ═══════════════════════════════════════════════ */

function GameLogosMarquee() {
  const games = [
    { name: "VALORANT", color: "#ff4655", glow: "rgba(255,70,85,0.4)" },
    { name: "CS2", color: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
    { name: "LEAGUE", color: "#60a5fa", glow: "rgba(96,165,250,0.4)" },
    { name: "FORTNITE", color: "#ff8c00", glow: "rgba(168,85,247,0.4)" },
    { name: "APEX", color: "#ef4444", glow: "rgba(239,68,68,0.4)" },
    { name: "PUBG", color: "#eab308", glow: "rgba(234,179,8,0.4)" },
    { name: "FIFA 25", color: "#34d399", glow: "rgba(52,211,153,0.4)" },
    { name: "ROCKET L", color: "#22d3ee", glow: "rgba(34,211,238,0.4)" },
    { name: "RUST", color: "#dc2626", glow: "rgba(220,38,38,0.4)" },
    { name: "GTA VI", color: "#22c55e", glow: "rgba(34,197,94,0.4)" },
    { name: "LOL", color: "#818cf8", glow: "rgba(129,140,248,0.4)" },
    { name: "DOTA 2", color: "#f87171", glow: "rgba(248,113,113,0.4)" },
  ];
  return (
    <div className="relative z-10 py-4 sm:py-5 marquee-mask">
      {/* Gradient border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="flex whitespace-nowrap marquee-track-left" style={{ width: "max-content" }}>
        {[...games, ...games].map((g, i) => (
          <div
            key={i}
            className="game-pill-item mx-1.5 sm:mx-2 flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${g.color}08, ${g.color}15)`,
              border: `1px solid ${g.color}25`,
              boxShadow: `inset 0 0 12px ${g.color}08, 0 0 0px transparent`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <Gamepad2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: g.color }} />
            <span className="text-[12px] sm:text-[14px] md:text-[16px] font-black tracking-[0.15em] uppercase" style={{ color: g.color }}>
              {g.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   RGB GAME IMAGE STRIP — Neon glow game images
   ═══════════════════════════════════════════════ */

function RgbGameStrip({ image, label, reverse = false }: { image: string; label: string; reverse?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-4 sm:py-5">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={blurIn}
        className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
      >
        <div className={`relative overflow-hidden rounded-2xl rgb-img-glow rgb-img-shine rgb-img-reflection ${reverse ? "order-first" : ""}`}>
          {/* Animated RGB top border */}
          <div className="absolute top-0 inset-x-0 h-[2px] z-[3] rgb-img-border-sweep" />
          {/* Animated RGB bottom border */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] z-[3] rgb-img-border-sweep" style={{ animationDelay: "1.5s" }} />
          {/* Dark overlay gradient for blending */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          {/* Image */}
          <img
            src={image}
            alt={label}
            className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover rounded-2xl"
            loading="lazy"
          />
          {/* Label overlay */}
          <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 z-[2]">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 border border-white/10 px-2.5 py-1">
              <Gamepad2 className="h-3 w-3 text-[#ff8c00]" />
              <span className="text-[9px] sm:text-[10px] font-bold text-white/80 tracking-wider uppercase">{label}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   İSTATİSTİKLER — Animasyonlu Sayaçlar
   ═══════════════════════════════════════════════ */

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const stats = [
    { value: "127+", label: "Google Yorum", icon: Users, color: "text-orange-400", gradient: "from-orange-500/15 to-transparent", border: "border-orange-500/20", iconBg: "bg-orange-500/15", glow: "shadow-[inset_0_1px_20px_rgba(249,115,22,0.1)]", hoverGlow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]" },
    { value: "4.5", label: "Puan", icon: Trophy, color: "text-blue-400", gradient: "from-blue-500/15 to-transparent", border: "border-blue-500/20", iconBg: "bg-blue-500/15", glow: "shadow-[inset_0_1px_20px_rgba(59,130,246,0.1)]", hoverGlow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    { value: "1", label: "Şube", icon: MapPin, color: "text-cyan-400", gradient: "from-cyan-500/15 to-transparent", border: "border-cyan-500/20", iconBg: "bg-cyan-500/15", glow: "shadow-[inset_0_1px_20px_rgba(6,182,212,0.1)]", hoverGlow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
    { value: "02:00", label: "Kapanış", icon: Timer, color: "text-emerald-400", gradient: "from-emerald-500/15 to-transparent", border: "border-emerald-500/20", iconBg: "bg-emerald-500/15", glow: "shadow-[inset_0_1px_20px_rgba(16,185,129,0.1)]", hoverGlow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
  ];
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-4 sm:py-5 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-stats.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={pop} custom={i * 0.02} whileHover={{ scale: 1.05, y: -3 }} className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-xl border ${s.border} bg-gradient-to-b ${s.gradient} bg-black/70 p-3 sm:p-4 ${s.glow} ${s.hoverGlow} transition-shadow duration-300`}>
              <div className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg ${s.iconBg}`}>
                <s.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${s.color}`} />
              </div>
              <p className={`text-[16px] sm:text-[20px] md:text-[24px] font-black ${s.color} leading-none`}>{s.value}</p>
              <p className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold text-gray-100 uppercase tracking-wider text-center leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   NEON MARQUEE 2 — Matrix Rain Stili (Ters Yön)
   ═══════════════════════════════════════════════ */

function NeonMarqueeGlow() {
  const items = [
    "RTX 4090",
    "240Hz",
    "i9-14900K",
    "64GB DDR5",
    "2TB NVMe",
    "1Gbps FİBER",
    "7.1 SURROUND",
    "ERGONOMİK SANDALYE",
    "VIP ODA",
    "SİMÜLATÖR",
  ];
  return (
    <div className="relative z-10 overflow-hidden py-4 sm:py-5 matrix-marquee-wrapper marquee-mask">
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,212,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,232,0.5) 1px, transparent 1px)", backgroundSize: "40px 20px" }} />
      {/* Top/bottom neon lines */}
      <div className="absolute top-0 inset-x-0 h-px matrix-border-line-top" />
      <div className="absolute bottom-0 inset-x-0 h-px matrix-border-line-bottom" />
      <div className="flex whitespace-nowrap marquee-track-right" style={{ width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="group relative mx-3 sm:mx-4 inline-flex items-center select-none">
            {/* Cyan ghost text */}
            <span className="absolute text-[14px] sm:text-[18px] md:text-[22px] font-black tracking-[0.15em] uppercase text-[#00d4e8]/15 blur-[1px]" style={{ transform: "translate(0, 1px)" }}>{item}</span>
            {/* Main text with gradient */}
            <span className="relative text-[14px] sm:text-[18px] md:text-[22px] font-black tracking-[0.15em] uppercase bg-gradient-to-r from-[#00d4e8]/60 via-[#ff8c00]/50 to-[#ff2d55]/40 bg-clip-text text-transparent group-hover:from-[#00d4e8] group-hover:via-[#ff8c00] group-hover:to-[#ff2d55] transition-all duration-500">
              {item}
            </span>
            {/* Separator diamond */}
            <span className="mx-3 sm:mx-4 inline-block text-[8px] text-white/10 group-hover:text-white/30 rotate-45 transition-all duration-500">◈</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ÖZELLİK ÇİPLERİ
   ═══════════════════════════════════════════════ */

function FeatureChips() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const chips = [
    { icon: Zap, label: "RTX 4090", color: "text-amber-400" },
    { icon: Crown, label: "VIP Oda", color: "text-red-400" },
    { icon: Timer, label: "24/7 Açık", color: "text-[#00d4e8]" },
    { icon: Gamepad2, label: "Simülatör", color: "text-red-400" },
  ];
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {chips.map((c) => (
          <motion.div key={c.label} variants={pop} whileHover={{ scale: 1.06, y: -2 }} className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/[0.06] bg-black/80 px-3 py-1.5 sm:px-4 sm:py-2 corner-pulse">
            <c.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${c.color}`} />
            <span className="text-[10px] sm:text-[12px] md:text-[13px] font-semibold text-gray-100">{c.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   HİZMETLER
   ═══════════════════════════════════════════════ */

function HizmetlerSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const hizmetler = [
    { icon: Gamepad2, title: "PC Gaming", desc: "RTX 4090, 240Hz monitörler ile profesyonel gaming deneyimi", color: "text-[#00d4e8]", bg: "bg-[#00d4e8]/15", borderColor: "border-l-[#00d4e8]", glowColor: "shadow-[inset_2px_0_12px_-4px_rgba(0,212,232,0.3)]" },
    { icon: Crown, title: "VIP Odalar", desc: "Ses yalıtımlı, özel klima ve 4-8 kişilik grup odaları", color: "text-red-400", bg: "bg-red-400/15", borderColor: "border-l-red-400", glowColor: "shadow-[inset_2px_0_12px_-4px_rgba(248,113,113,0.3)]" },
    { icon: Navigation, title: "Yarış Simülatörü", desc: "Profesyonel direksiyon seti ve 3 ekran ile gerçekçi sürüş", color: "text-amber-400", bg: "bg-amber-400/15", borderColor: "border-l-amber-400", glowColor: "shadow-[inset_2px_0_12px_-4px_rgba(251,191,36,0.3)]" },
    { icon: Trophy, title: "E-Spor Turnuvaları", desc: "Haftalık turnuvalar, ödüller ve liderlik tabloları", color: "text-[#ff8c00]", bg: "bg-[#ff8c00]/15", borderColor: "border-l-[#ff8c00]", glowColor: "shadow-[inset_2px_0_12px_-4px_rgba(255,140,0,0.3)]" },
  ];
  return (
    <section id="hizmetler" ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-hizmetler.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,212,232,0.5) 10px, rgba(0,212,232,0.5) 11px)" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl border-l-4 border-[#00d4e8] pl-4 sm:pl-5">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#00d4e8]/15">
            <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00d4e8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white">Hizmetlerimiz</h2>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] text-cyan-400/80">Neler sunuyoruz?</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {hizmetler.map((h, i) => (
            <motion.div key={h.title} variants={slideUp} custom={i * 0.02} whileHover={{ x: 4, borderColor: h.borderColor.replace("border-l-", "") }} className={`flex items-start gap-3 sm:gap-4 rounded-lg border-l-[3px] ${h.borderColor} bg-black/60 p-3 sm:p-4 md:p-5 hover:bg-black/80 transition-colors ${h.glowColor}`}>
              <div className={`flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 items-center justify-center ${h.bg}`} style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)" }}>
                <h.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${h.color}`} />
              </div>
              <div className="pt-0.5">
                <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-white">{h.title}</p>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100 leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EKİPMAN
   ═══════════════════════════════════════════════ */

function EkipmanSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const specs = [
    { icon: Zap, label: "Ekran Kartı", value: "RTX 5060 Ti", sub: "NVIDIA Ada Lovelace", color: "#76b900", glow: "rgba(118,185,0,0.25)" },
    { icon: Zap, label: "Ekran Kartı", value: "RTX 4090", sub: "NVIDIA Flagship", color: "#76b900", glow: "rgba(118,185,0,0.25)" },
    { icon: Monitor, label: "Monitör", value: "240Hz 1ms", sub: "IPS Gaming", color: "#00d4e8", glow: "rgba(0,212,232,0.25)" },
    { icon: Server, label: "İşlemci", value: "i9-14900K", sub: "24 Core / 32 Thread", color: "#ff8c00", glow: "rgba(255,140,0,0.25)" },
    { icon: MemoryStick, label: "RAM", value: "64GB DDR5", sub: "5600MHz Dual Channel", color: "#ff2d55", glow: "rgba(255,45,85,0.25)" },
    { icon: HardDrive, label: "Depolama", value: "2TB NVMe", sub: "Gen4 PCIe SSD", color: "#ff8c00", glow: "rgba(168,85,247,0.25)" },
    { icon: Wifi, label: "Ağ", value: "1Gbps Fiber", sub: "Ultra Düşük Gecikme", color: "#22c55e", glow: "rgba(34,197,94,0.25)" },
    { icon: Headphones, label: "Ses", value: "7.1 Surround", sub: " profesyonel kulaklık", color: "#f59e0b", glow: "rgba(245,158,11,0.25)" },
  ];
  return (
    <section id="ekipman" ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-ekipman.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Subtle grid bg */}
      <div className="absolute inset-0 z-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Section header */}
        <motion.div variants={slideUp} className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff8c00]" />
            <div className="absolute inset-0 rounded-xl shadow-[0_0_12px_rgba(255,140,0,0.2)]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white tracking-tight">Ekipmanlarımız</h2>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-100 tracking-wider uppercase">Premium gaming donanımı</p>
          </div>
        </motion.div>

        {/* GPU Highlight Cards */}
        <motion.div variants={slideUp} custom={0.1} className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          {specs.slice(0, 2).map((item, i) => (
            <motion.div
              key={item.value}
              variants={pop}
              custom={i * 0.02}
              whileHover={{ scale: 1.03, y: -3 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/70 p-3.5 sm:p-4 md:p-5 group cursor-default"
              style={{ boxShadow: `inset 0 1px 0 0 ${item.color}15, 0 0 30px ${item.glow}` }}
            >
              {/* Glow orb */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-[0.04] group-hover:opacity-[0.12] transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${item.color}, transparent 70%)` }} />
              <div className="relative z-[2]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg" style={{ background: `${item.color}15` }}>
                    <item.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" style={{ color: item.color }} />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase" style={{ color: `${item.color}90` }}>{item.label}</span>
                </div>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-black leading-none mb-0.5" style={{ color: item.color }}>{item.value}</p>
                <p className="text-[9px] sm:text-[10px] text-gray-100">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other specs — smaller grid */}
        <motion.div variants={slideUp} custom={0.2} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
          {specs.slice(2).map((item, i) => (
            <motion.div
              key={item.value}
              variants={pop}
              custom={(i + 2) * 0.06}
              whileHover={{ scale: 1.04, y: -2 }}
              className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/65 p-2.5 sm:p-3 md:p-3.5 group cursor-default transition-all duration-300 hover:border-white/[0.12]"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md" style={{ background: `${item.color}12` }}>
                  <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: item.color }} />
                </div>
                <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-gray-100">{item.label}</span>
              </div>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-black leading-none mb-0.5" style={{ color: item.color }}>{item.value}</p>
              <p className="text-[8px] sm:text-[9px] text-gray-300">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div variants={slideUp} custom={0.35} className="mt-4 sm:mt-5 flex items-center justify-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[12px] sm:text-[13px] font-bold text-gray-100 tracking-wider uppercase">Tüm donanımlar düzenli olarak güncellenmektedir</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROMO / DUYURU KARTLARI
   ═══════════════════════════════════════════════ */

function PromoCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const cards = [
    { icon: Zap, badge: "YENİ", badgeColor: "bg-[#ff8c00]", title: "Yeni Sezon Turnuvaları", desc: "Hemen kaydol, ödüller seni bekliyor!", iconColor: "text-[#ff8c00]", iconBg: "bg-[#ff8c00]/10", borderColor: "border-[#ff8c00]/20", cardBg: "bg-black/90" },
    { icon: Timer, badge: "02:00", badgeColor: "bg-emerald-500", title: "Gece 02:00'ye Kadar Açık!", desc: "Uzun oyun geceleri için ideal.", iconColor: "text-[#00d4e8]", iconBg: "bg-[#00d4e8]/10", borderColor: "border-[#00d4e8]/20", cardBg: "bg-black/90" },
    { icon: Trophy, badge: "KAMPANYA", badgeColor: "bg-red-500", title: "VIP Odada %20 İndirim", desc: "Sınırlı süre, kaçırmayın!", iconColor: "text-red-400", iconBg: "bg-red-400/10", borderColor: "border-red-400/20" },
    { icon: UserPlus, badge: "POPÜLER", badgeColor: "bg-blue-500", title: "500+ Aktif Oyuncu", desc: "Topluluğa katıl, yarış!", iconColor: "text-blue-400", iconBg: "bg-blue-400/10", borderColor: "border-blue-400/20" },
  ];
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-4 sm:py-5">
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {cards.map((c, i) => (
            <motion.div key={c.title} variants={slideUp} custom={i * 0.02} whileHover={{ scale: 1.03, y: -2 }} className={`relative overflow-hidden rounded-2xl border ${c.borderColor} bg-black/65 p-4 sm:p-5 md:p-6 rgb-shimmer-hover`}>
              <span className={`absolute top-3 right-3 sm:top-4 sm:right-4 rounded-lg ${c.badgeColor} px-1.5 py-0.5 text-[7px] sm:text-[8px] font-black text-white uppercase tracking-wider shadow-lg`}>
                {c.badge}
              </span>
              <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl ${c.iconBg} mb-3 sm:mb-4`}>
                <c.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${c.iconColor}`} />
              </div>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-white mb-0.5 leading-tight">{c.title}</p>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MÜŞTERİ YORUMLARI — Testimonial Cards
   ═══════════════════════════════════════════════ */

function ReviewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [active, setActive] = useState(0);

  const reviews = [
    { name: "Anonim", rating: 5, text: "Gayet başarılı kaliteli bir Ortam. Sürekli müşterisiyim gayet memnunum. 1GB int direksiyon seti eksik olan hiçbir şey yok.", branch: "Çubuk", game: "Gaming", color: "#ff8c00" },
    { name: "Murat L.", rating: 5, text: "Çubuğun en iyi internet kafesi! Bilgisayarları standartların üzerinde.", branch: "Çubuk", game: "CS2", color: "#f59e0b" },
    { name: "Kullanıcı", rating: 4, text: "Hijyenik ve temiz bir mekan. Ekipmanlar yeni ve güçlü.", branch: "Çubuk", game: "Valorant", color: "#ff4655" },
    { name: "Müşteri", rating: 5, text: "Atmosfer çok güzel, personel ilgili. Kesinlikle tavsiye ederim.", branch: "Çubuk", game: "LOL", color: "#818cf8" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, [reviews.length]);

  const r = reviews[active];

  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-reviews.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <motion.div variants={slideUp} className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-500/15">
            <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-400" />
          </div>
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white">Müşteri Yorumları</h2>
        </motion.div>

        {/* Ana Spotlight Kart */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-white/[0.06] bg-black/65 overflow-hidden mb-4 sm:mb-5">
          <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${r.color}, transparent)` }} />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: r.color }} />
          <div className="relative p-4 sm:p-5 md:p-6">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-[0.05]">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${s < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-700"}`} />
              ))}
            </div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-white leading-relaxed mb-4 max-w-lg">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-black text-white text-[12px] sm:text-[13px]" style={{ background: `linear-gradient(135deg, ${r.color}cc, ${r.color}66)` }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-[12px] sm:text-[13px] font-bold text-white">{r.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] sm:text-[9px] font-bold text-orange-400">{r.branch}</span>
                    <span className="text-gray-600 text-[8px]">·</span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-100">{r.game} oyuncusu</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1" style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}>
                <Gamepad2 className="h-3 w-3" style={{ color: r.color }} />
                <span className="text-[9px] sm:text-[10px] font-bold" style={{ color: r.color }}>{r.game}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini kartlar */}
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {reviews.map((rev, i) => (
            <motion.button
              key={rev.name}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 rounded-xl border p-2.5 sm:p-3 transition-all duration-200 text-left min-w-[140px] sm:min-w-[160px] ${
                i === active ? "border-white/[0.15] bg-white/[0.08]" : "border-white/[0.04] bg-black/65 hover:border-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-black text-white" style={{ background: `${rev.color}aa` }}>
                  {rev.name[0]}
                </div>
                <span className="text-[10px] font-bold text-white truncate">{rev.name}</span>
              </div>
              <p className="text-[9px] text-gray-200 leading-relaxed" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{rev.text}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-[8px] font-bold" style={{ color: rev.color }}>{rev.game}</span>
                <span className="text-gray-600 text-[8px]">·</span>
                <span className="text-[8px] font-bold text-gray-100">{rev.branch}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div variants={slideUp} custom={0.1} className="mt-4 sm:mt-5 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-black/80 px-4 py-2">
            <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[11px] sm:text-[12px] font-bold text-white">4.6</span></div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[11px] sm:text-[12px] font-bold text-white">4.9</span></div>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-[10px] text-gray-100 font-semibold">Google</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   GALERİ
   ═══════════════════════════════════════════════ */

function GaleriSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const photos = [
    { src: "/images/salihfx/s.png", label: "Dış Görünüm" },
    { src: "/images/salihfx/sd.png", label: "Giriş" },
    { src: "/images/salihfx/ad.png", label: "Oyun Alanı" },
    { src: "/images/salihfx/d.png", label: "PC İstasyonları" },
    { src: "/images/gallery/pursaklar-sim-1.jpg", label: "Yarış Simülatörü" },
    { src: "/images/gallery/pursaklar-ekipman.jpg", label: "Ekipman Detay" },
    { src: "/images/gallery/pursaklar-pc.jpg", label: "RTX Gaming PC" },
    { src: "/images/gallery/vs-01.jpg", label: "Gaming Alanı" },
    { src: "/images/gallery/vs-02.jpg", label: "PC İstasyonları" },
    { src: "/images/gallery/vs-03.jpg", label: "Ekipmanlar" },
    { src: "/images/gallery/vs-04.jpg", label: "RGB Setup" },
  ];

  const promos = [
    { src: "/images/gallery/promo-csgo.jpg", label: "CS:GO Heyecanı" },
    { src: "/images/gallery/promo-valorant.jpg", label: "Valorant Takım" },
    { src: "/images/gallery/promo-playstation.jpg", label: "Playstation Turnuva" },
    { src: "/images/gallery/promo-ps5.jpg", label: "PS5 Turnuva" },
    { src: "/images/gallery/promo-yaş-sınırlı-değil.jpg", label: "Yaş Sınırlı Değil" },
  ];

  const allImages = [...photos, ...promos];

  const go = useCallback((dir: number) => {
    if (activeIdx === null) return;
    const next = activeIdx + dir;
    if (next >= 0 && next < allImages.length) setActiveIdx(next);
  }, [activeIdx, allImages.length]);

  useEffect(() => {
    if (activeIdx === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") { setActiveIdx(null); setZoomed(false); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [activeIdx, go]);

  return (
    <section id="galeri" ref={ref} className="relative z-10 py-10 sm:py-14 md:py-20">
      <div className="relative mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6">

        {/* ════════ BAŞLIK ════════ */}
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="text-center mb-8 sm:mb-10 md:mb-12">
          <motion.h2 variants={pop} custom={0} className="text-[34px] sm:text-[44px] md:text-[54px] lg:text-[62px] font-black text-white tracking-tight leading-[1.05]">
            <span className="hero-gradient-text">Galeri</span>
          </motion.h2>
          <motion.div variants={pop} custom={0.05} className="mt-2.5 flex items-center justify-center gap-4 sm:gap-6">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#ff8c00]/40" />
            <span className="text-[14px] sm:text-[15px] font-bold text-white tracking-wide">{photos.length + promos.length} Fotoğraf</span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#00d4e8]/40" />
          </motion.div>
        </motion.div>

        {/* ════════ PROMO CAROUSEL ════════ */}
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="mb-8 sm:mb-10">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6">
            {promos.map((img, i) => {
              const globalIdx = photos.length + i;
              return (
                <motion.div
                  key={img.src}
                  variants={pop}
                  custom={i * 0.02}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 snap-start relative group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] w-[260px] sm:w-[320px] md:w-[380px] aspect-[16/9]"
                  onClick={() => setActiveIdx(globalIdx)}
                >
                  <img src={img.src} alt={img.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#ff2d55] to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#ff2d55] to-transparent" />
                  </div>
                  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#00d4e8] to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#00d4e8] to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#ff2d55]/90 text-[8px] sm:text-[9px] font-black text-white uppercase tracking-wider mb-1.5">Etkinlik</span>
                    <p className="text-[12px] sm:text-[14px] font-bold text-white">{img.label}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Expand className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ════════ FOTOĞRAF GRID ════════ */}
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
            {photos.slice(0, 3).map((img, i) => (
              <motion.div
                key={img.src} variants={pop} custom={i * 0.02}
                whileHover={{ scale: 1.04, y: -6 }} whileTap={{ scale: 0.97 }}
                className="relative group cursor-pointer rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-[#ff8c00]/25 hover:shadow-[0_0_25px_#ff8c0015] transition-all duration-400"
                onClick={() => setActiveIdx(i)}
              >
                <img src={img.src} alt={img.label} loading="lazy" className="w-full aspect-[3/4] sm:aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[9px] sm:text-[10px] font-bold text-white/90">{img.label}</p>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0"><Expand className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" /></div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
            {photos.slice(3, 7).map((img, i) => (
              <motion.div key={img.src} variants={pop} custom={(i + 3) * 0.04}
                whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
                className="relative group cursor-pointer rounded-lg sm:rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.02] hover:border-[#00d4e8]/25 hover:shadow-[0_0_20px_#00d4e815] transition-all duration-400"
                onClick={() => setActiveIdx(i + 3)}
              >
                <img src={img.src} alt={img.label} loading="lazy" className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[7px] sm:text-[8px] font-bold text-white/80">{img.label}</p>
                  <Expand className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/70" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
            {photos.slice(7, 10).map((img, i) => (
              <motion.div key={img.src} variants={pop} custom={(i + 7) * 0.04}
                whileHover={{ scale: 1.04, y: -6 }} whileTap={{ scale: 0.97 }}
                className="relative group cursor-pointer rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-[#ff2d55]/25 hover:shadow-[0_0_25px_#ff2d5515] transition-all duration-400"
                onClick={() => setActiveIdx(i + 7)}
              >
                <img src={img.src} alt={img.label} loading="lazy" className="w-full aspect-[3/4] sm:aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[9px] sm:text-[10px] font-bold text-white/90">{img.label}</p>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0"><Expand className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" /></div>
                </div>
              </motion.div>
            ))}
          </div>
          {photos.length > 10 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
              {photos.slice(10).map((img, i) => (
                <motion.div key={img.src} variants={pop} custom={(i + 10) * 0.04}
                  whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
                  className="relative group cursor-pointer rounded-lg sm:rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.02] hover:border-[#ff8c00]/25 hover:shadow-[0_0_20px_#ff8c0015] transition-all duration-400"
                  onClick={() => setActiveIdx(photos.indexOf(img))}
                >
                  <img src={img.src} alt={img.label} loading="lazy" className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-[7px] sm:text-[8px] font-bold text-white/80">{img.label}</p>
                    <Expand className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ═══ INSTAGRAM ═══ */}
        <motion.div variants={slideUp} custom={0.5} className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3">
          <a href="https://www.instagram.com/versusgamecenterr?igsh=MTJmaGQ2bmtsaTNjZg==" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-3 hover:bg-white/[0.06] transition-all duration-300">
            <Instagram className="h-4 w-4 text-blue-400" />
            <span className="text-[11px] sm:text-[12px] font-semibold text-gray-100">@versusgamecenterr</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-gray-100 group-hover:text-gray-100 transition-colors" />
          </a>
          <span className="text-[10px] text-gray-300">Daha fazlası için takip et</span>
        </motion.div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/[0.97]"
            onClick={() => { setActiveIdx(null); setZoomed(false); }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
              <span className="rounded-lg bg-white/[0.06] border border-white/10 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold text-gray-100">{allImages[activeIdx].label}</span>
              <span className="text-[10px] sm:text-[11px] text-gray-100 tabular-nums">{activeIdx + 1} / {allImages.length}</span>
            </div>
            <motion.button className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-gray-200 hover:bg-white/[0.12] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setActiveIdx(null); setZoomed(false); }}><X className="h-4 w-4" /></motion.button>
            <motion.button className="absolute top-4 right-14 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-gray-200 hover:bg-white/[0.12] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}>{zoomed ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}</motion.button>
            {activeIdx > 0 && <motion.button className="absolute left-3 sm:left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft className="h-5 w-5" /></motion.button>}
            {activeIdx < allImages.length - 1 && <motion.button className="absolute right-3 sm:right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight className="h-5 w-5" /></motion.button>}
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-3 pt-8">
                <motion.img src={allImages[activeIdx].src} alt={allImages[activeIdx].label} onClick={(e) => e.stopPropagation()} className={`object-contain transition-all duration-500 rounded-lg ${zoomed ? "max-w-full max-h-[85vh] w-full" : "max-w-[90vw] max-h-[72vh]"}`} draggable={false} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   İLETİŞİM — Detaylı Kartlar (Referans Tasarım)
   ═══════════════════════════════════════════════ */

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  const branch = {
    name: "Çubuk",
    label: "ŞUBEMİZ",
    color: "#ff8c00",
    labelColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    ringColor: "ring-orange-500/30",
    glowFrom: "from-orange-500/20",
    glowTo: "to-orange-600/5",
    rating: 4.5,
    address: "Cumhuriyet Mh. Arı Sokak No: 9/A, 06760 Çubuk/Ankara",
    phone: "+90 505 749 99 78",
    phoneRaw: "905057499978",
    waPhone: "905057499978",
    hours: "Kapanış: 02:00",
    tags: ["E-Spor", "PC Gaming", "Yarış Sim", "Direksiyon Seti", "1GB İnternet"],
  };

  const b = branch;

  return (
    <section id="iletisim" ref={ref} className="relative z-10 px-4 sm:px-6 py-8 sm:py-10 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-contact.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

        {/* Başlık */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#ff8c00]/10">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff8c00]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-black text-white section-rgb-heading">İletişim</h2>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-100">Şubemize ulaşın</p>
          </div>
        </div>

        {/* Aktif Şube Detayları — Büyük Tasarım */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.06] bg-black/85 overflow-hidden neon-glow rgb-border-spin">
            {/* Gradient üst bar */}
            <div className={`h-1 bg-gradient-to-r ${b.glowFrom} ${b.glowTo}`} />

            <div className="p-5 sm:p-6 md:p-7">
              {/* Büyük Başlık */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${b.iconBg} ring-1 ${b.ringColor}`}>
                    <MapPin className={`h-6 w-6 sm:h-7 sm:w-7 ${b.labelColor}`} />
                  </div>
                  <div>
                    <p className={`text-[18px] sm:text-[20px] md:text-[22px] font-black ${b.labelColor}`}>{b.name}</p>
                    <span className={`rounded-md ${b.iconBg} px-2 py-0.5 text-[8px] sm:text-[9px] font-bold ${b.labelColor} uppercase tracking-wider`}>{b.label}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-amber-500/5 border border-amber-500/10 px-3 py-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(b.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-black text-amber-400">{b.rating}</span>
                </div>
              </div>

              {/* Bilgi Grid — 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {/* Adres */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin className="h-3 w-3 text-gray-100" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-100 uppercase tracking-wider">Adres</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-100 leading-relaxed">{b.address}</p>
                </div>

                {/* Telefon */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Phone className="h-3 w-3 text-gray-100" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-100 uppercase tracking-wider">Telefon</span>
                  </div>
                  <a href={`tel:+${b.phoneRaw}`} className="text-[11px] sm:text-[12px] text-white font-semibold hover:underline">{b.phone}</a>
                </div>

                {/* Saatler */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock className="h-3 w-3 text-gray-100" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-100 uppercase tracking-wider">Saatler</span>
                  </div>
                  <p className="text-[11px] sm:text-[12px] text-gray-100 font-bold">{b.hours}</p>
                  <p className="text-[8px] sm:text-[9px] text-gray-100">Her gün</p>
                </div>

                {/* Instagram */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Instagram className="h-3 w-3 text-gray-100" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-100 uppercase tracking-wider">Instagram</span>
                  </div>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-[11px] sm:text-[12px] text-white font-semibold hover:underline">@salihfxgamecenter</a>
                </div>
              </div>

              {/* Etiketler */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                {b.tags.map((tag) => (
                  <span key={tag} className={`rounded-lg border ${b.iconBg} ${b.labelColor} px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Aksiyon Butonları — Yan yana */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <motion.a
                  href={`https://wa.me/${b.waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-bold text-white shadow-lg shadow-green-800/20"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-1.13-.297-.262-.586-.177-.836.063l-.562.562c-.262.262-.66.284-1.054.106C9.636 12.966 7.823 10.332 7.058 9.272c-.262-.364-.24-.75.063-1.053l.562-.562c.262-.262.338-.551.063-.836-.149-.149-1.422-1.676-1.666-1.934C5.806 4.625 5.522 4.672 5.295 4.899L4.736 5.46c-1.102 1.102-.967 2.69.32 4.615 1.358 2.028 3.688 4.595 5.822 5.824 2.058 1.185 3.578 1.34 4.615.32l.562-.562c.224-.224.265-.505.063-.836-.224-.366-1.368-1.382-1.648-1.64z"/></svg>
                  WhatsApp
                </motion.a>
                <motion.a
                  href="https://maps.google.com/?q=Cumhuriyet+Mah.+Arı+Sokak+No+9%2FA+06760+Çubuk%2FAnkara"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-bold text-white"
                >
                  <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-gray-200" />
                  Yol Tarifi
                </motion.a>
              </div>
            </div>

            {/* Neon alt bar */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ÇALIŞMA SAATLERİ — Working Hours Section
   ═══════════════════════════════════════════════ */

function WorkingHoursSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const openHour = 10;
  const closeHour = 2;

  const isOpenNow = (currentHour: number) => {
    if (currentHour >= openHour) return true;
    if (currentHour < closeHour) return true;
    return false;
  };

  const currentHour = now.getHours();
  const currentDay = now.getDay();
  const isOpen = isOpenNow(currentHour);

  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-hours.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Section title */}
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-500/15">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white">Çalışma Saatleri</h2>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-400/50">Çubuk şubesi</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase ${
                isOpen ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 badge-pulse" : "bg-red-500/15 text-red-400 border border-red-500/20"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-400"} opacity-60 animate-ping`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
              </span>
              {isOpen ? "ŞU AN AÇIK" : "ŞU AN KAPALI"}
            </motion.div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Çubuk Branch */}
          <motion.div variants={scaleIn} custom={0.1}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-orange-500/10">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-400" />
              </div>
              <div>
                <p className="text-[12px] sm:text-[13px] font-bold text-orange-400">Çubuk</p>
                <span className="rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[8px] font-bold text-orange-400 uppercase">Merkez</span>
              </div>
            </div>
            <div className="relative">
              {/* Vertical emerald line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent" />
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {days.map((day, i) => {
                  const dayIndex = i + 1 === 7 ? 0 : i + 1;
                  const isToday = dayIndex === currentDay;
                  return (
                    <div key={day} className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-[10px] sm:text-[11px] md:text-[12px] transition-colors ${
                      isToday ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-black/70 border border-transparent hover:bg-black/60"
                    }`}>
                      {/* Timeline dot */}
                      <div className={`relative z-10 h-[16px] w-[16px] shrink-0 rounded-full border-2 flex items-center justify-center ${
                        isToday ? "border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "border-emerald-500/30 bg-black"
                      }`}>
                        {isToday && <div className="h-[6px] w-[6px] rounded-full bg-white" />}
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <span className={`font-bold ${isToday ? "text-emerald-400" : "text-gray-200"}`}>{day}</span>
                        <span className={`font-semibold ${isToday ? "text-white" : "text-gray-100"}`}>10:00 – 02:00</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   REZERVASYON — Ad Soyad + Telefon Alanlı
   ═══════════════════════════════════════════════ */

function RezervasyonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [selected, setSelected] = useState({ sube: "", paket: "", saat: "", kisi: "", ad: "", tel: "" });

  const subeler = [
    { id: "kizilay", name: "Kızılay", desc: "Necatibey Cd. No: 34", color: "border-orange-500/30 bg-orange-500/5", activeBg: "bg-orange-500/10 border-orange-500/50", iconBg: "bg-orange-500/10 text-orange-500" },
    { id: "pursaklar", name: "Pursaklar", desc: "Şht. Ali Aktaş Cd. No: 10/B", color: "border-cyan-500/30 bg-cyan-500/5", activeBg: "bg-cyan-500/10 border-cyan-500/50", iconBg: "bg-cyan-500/10 text-cyan-400" },
  ];

  const paketler = [
    { id: "standart", name: "Standart", price: "₺60/saat", desc: "RTX 4090, 240Hz Monitör", icon: "monitor", popular: false },
    { id: "vip", name: "VIP Oda", price: "₺150/saat", desc: "Özel Oda 4-8 Kişi, Ses Yalıtım", icon: "crown", popular: true },
    { id: "simulator", name: "Simülatör", price: "₺100/saat", desc: "Direksiyon, 3 Ekran", icon: "navigation", popular: false },
  ];

  const saatler = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  const kisiler = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "12"];

  const canSend = selected.sube && selected.paket && selected.saat && selected.kisi;

  const buildWhatsAppMsg = (phoneLabel?: string) => {
    const sube = subeler.find(s => s.id === selected.sube)?.name || "";
    const paket = paketler.find(p => p.id === selected.paket)?.name || "";
    return `🎮 *VERSUS GAME CENTER — Rezervasyon*\n\n👤 Ad: ${selected.ad || "Belirtilmedi"}\n📞 Tel: ${selected.tel || "Belirtilmedi"}\n📍 Şube: ${sube}${phoneLabel ? ` (${phoneLabel})` : ""}\n📦 Paket: ${paket}\n🕐 Saat: ${selected.saat}\n👥 Kişi: ${selected.kisi}\n📅 Tarih: ${new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}\n\nOnay bekliyorum, teşekkürler! 🙏`;
  };

  const whatsappNums = [
    { id: "kizilay", label: "Kızılay Şube", phone: "905467871406", display: "+90 546 787 14 06", color: "border-orange-500/20 hover:bg-orange-500/10", iconColor: "bg-orange-500/10 text-orange-500" },
    { id: "pursaklar", label: "Pursaklar Şube", phone: "905416454196", display: "+90 541 645 41 96", color: "border-cyan-500/20 hover:bg-cyan-500/10", iconColor: "bg-cyan-500/10 text-cyan-400" },
  ];

  return (
    <section id="rezervasyon" ref={ref} className="relative z-10 px-4 sm:px-6 py-10 sm:py-12 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-rezervasyon.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="animated-border relative">
          <div className="absolute inset-0 overflow-hidden rounded-[1.25rem]">
            <div className="blob-1 absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[#ff8c00]/10 blur-3xl" />
            <div className="blob-2 absolute top-1/2 -right-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="blob-3 absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-[#00d4e8]/10 blur-3xl" />
          </div>

          <div className="relative rounded-[1.25rem] border border-white/[0.06] bg-black/85 p-4 sm:p-5 md:p-6 shadow-[0_0_40px_rgba(255,140,0,0.05),0_0_80px_rgba(0,212,232,0.03)]">
            <AuroraLine />

            {/* Başlık */}
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center gap-3 sm:gap-4 mb-1">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#ff8c00]/10">
                  <Gamepad2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff8c00]" />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-black text-white section-rgb-heading">Rezervasyon</h2>
                  <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-100">Seçimlerini yap, WhatsApp ile onayla</p>
                </div>
              </div>
            </div>

            {/* Ad Soyad */}
            <div className="mb-4 sm:mb-5">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                placeholder="Adınızı girin"
                value={selected.ad}
                onChange={(e) => setSelected({ ...selected, ad: e.target.value })}
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] md:text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#ff8c00]/30 focus:shadow-[0_0_15px_#ff8c0015,0_0_30px_#ff8c0008] transition-all duration-300"
              />
            </div>

            {/* Telefon */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2">
                Telefon
              </label>
              <input
                type="tel"
                placeholder="05XX XXX XX XX"
                value={selected.tel}
                onChange={(e) => setSelected({ ...selected, tel: e.target.value })}
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] md:text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#ff8c00]/30 focus:shadow-[0_0_15px_#ff8c0015,0_0_30px_#ff8c0008] transition-all duration-300"
              />
            </div>

            {/* Şube Seçimi */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2.5">
                <MapPin className="inline h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Şube Seç
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {subeler.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected({ ...selected, sube: s.id })}
                    className={`relative flex items-center gap-3 sm:gap-4 rounded-xl border p-4 sm:p-5 text-left transition-all ${selected.sube === s.id ? s.activeBg + " ring-1 ring-white/10 shadow-[0_0_20px_" + (s.id === "kizilay" ? "#ff8c0020" : "#00d4e820") + "]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:shadow-[0_0_15px_rgba(255,140,0,0.08)]"}`}
                  >
                    {selected.sube === s.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#ff8c00]">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </motion.div>
                    )}
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}>
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-white">{s.name}</p>
                      <p className="text-[10px] sm:text-[11px] md:text-[12px] text-gray-100">{s.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Paket Seçimi */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2.5">
                <Crown className="inline h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Paket Seç
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {paketler.map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected({ ...selected, paket: p.id })}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 sm:p-5 text-center transition-all ${selected.paket === p.id ? "border-[#ff8c00]/40 bg-[#ff8c00]/10 ring-1 ring-white/10 shadow-[0_0_20px_#ff8c0020]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:shadow-[0_0_15px_rgba(0,212,232,0.08)]"}`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-lg bg-[#ff8c00] px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-white uppercase shadow-lg shadow-orange-800/30">
                        Popüler
                      </span>
                    )}
                    {selected.paket === p.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 sm:top-3 sm:right-3 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#ff8c00]">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </motion.div>
                    )}
                    {p.icon === "monitor" && <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-[#00d4e8]" />}
                    {p.icon === "crown" && <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />}
                    {p.icon === "navigation" && <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />}
                    <div>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-white">{p.name}</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] font-black text-[#ff8c00]">{p.price}</p>
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-100 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Saat Seçimi */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2.5">
                <Clock className="inline h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Saat Seç
              </label>
              <div className="flex items-center gap-2 sm:gap-3 mb-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-[0_0_10px_rgba(0,212,232,0.06)]">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#00d4e8]" />
                <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-white">Bugün</span>
                <span className="text-[11px] sm:text-[12px] text-gray-100">— {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                {saatler.map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelected({ ...selected, saat: s })}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2.5 sm:py-3 text-[12px] sm:text-[13px] md:text-[14px] font-semibold transition-all ${selected.saat === s ? "bg-[#ff8c00] text-white shadow-lg shadow-orange-800/20 shadow-[0_0_15px_#ff8c0040]" : "bg-white/[0.04] text-gray-200 border border-white/[0.06] hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(0,212,232,0.1)]"}`}
                  >
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Kişi Seçimi */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-2.5">
                <Users className="inline h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Kişi Sayısı
              </label>
              <p className="text-[10px] sm:text-[11px] text-gray-100 mb-2.5">VIP odalar için 4-8 kişi arası önerilir</p>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
                {kisiler.map((k) => (
                  <motion.button
                    key={k}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelected({ ...selected, kisi: k })}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2.5 sm:py-3 text-[13px] sm:text-[14px] md:text-[15px] font-bold transition-all ${selected.kisi === k ? "bg-[#ff8c00] text-white shadow-lg shadow-orange-800/20 shadow-[0_0_15px_#ff8c0040]" : "bg-white/[0.04] text-gray-200 border border-white/[0.06] hover:shadow-[0_0_10px_rgba(0,212,232,0.1)]"}`}
                  >
                    <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{k}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ayırıcı */}
            <div className="mb-5 sm:mb-6 h-px bg-gradient-to-r from-transparent via-[#ff8c00]/25 via-[#00d4e8]/15 to-transparent" />

            {/* WhatsApp Butonları */}
            <div>
              <p className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider text-gray-200 uppercase mb-3 sm:mb-4 text-center">
                WhatsApp ile Onayla
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {whatsappNums.map((wa) => (
                  <motion.a
                    key={wa.id}
                    href={canSend
                      ? `https://wa.me/${wa.phone}?text=${encodeURIComponent(buildWhatsAppMsg(wa.label))}`
                      : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={canSend ? { scale: 1.02 } : {}}
                    whileTap={canSend ? { scale: 0.98 } : {}}
                    onClick={(e) => { if (!canSend) e.preventDefault(); }}
                    className={`flex items-center gap-3 sm:gap-4 rounded-xl border p-4 sm:p-5 text-left transition-all ${
                      canSend
                        ? wa.color + " cursor-pointer hover:shadow-[0_0_20px_" + (wa.id === "kizilay" ? "#ff8c0015" : "#00d4e815") + "]"
                        : "border-white/[0.04] bg-white/[0.02] cursor-not-allowed opacity-40"
                    }`}
                  >
                    <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl ${canSend ? "bg-[#25D366]/15" : "bg-white/[0.04]"}`}>
                      <svg className={`h-6 w-6 sm:h-7 sm:w-7 ${canSend ? "text-[#25D366]" : "text-gray-300"}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-1.13-.297-.262-.586-.177-.836.063l-.562.562c-.262.262-.66.284-1.054.106C9.636 12.966 7.823 10.332 7.058 9.272c-.262-.364-.24-.75.063-1.053l.562-.562c.262-.262.338-.551.063-.836-.149-.149-1.422-1.676-1.666-1.934C5.806 4.625 5.522 4.672 5.295 4.899L4.736 5.46c-1.102 1.102-.967 2.69.32 4.615 1.358 2.028 3.688 4.595 5.822 5.824 2.058 1.185 3.578 1.34 4.615.32l.562-.562c.224-.224.265-.505.063-.836-.224-.366-1.368-1.382-1.648-1.64z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-white">{wa.label}</p>
                      <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-100">{wa.display}</p>
                    </div>
                    {canSend && (
                      <ArrowRight className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-gray-100" />
                    )}
                  </motion.a>
                ))}
              </div>

              {!canSend && (
                <p className="text-[10px] sm:text-[11px] text-center text-gray-300 mt-2 sm:mt-3">
                  Şube, paket, saat ve kişi seçimi yapmanız gerekiyor
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SSS — FAQ Section
   ═══════════════════════════════════════════════ */

function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: "Kredi kartı veya nakit ödeme yapılabiliyor mu?", a: "Evet, her iki şubemizde kredi kartı, banka kartı, nakit ve mobil ödeme (QR) kabul ediyoruz." },
    { q: "Çocuklar gaming alanına girebilir mi?", a: "12 yaş ve üzeri çocuklar ebeveyn izni ile girebilir. VIP odalarda ailecek oyun keyfi de yaşayabilirsiniz." },
    { q: "Kendi laptopumu getirebilirim?", a: "Maalesef güvenlik ve düzen sebebiyle kişisel cihaz kabul edilmemektedir. Tüm istasyonlarımız RTX 4090 donanımlıdır." },
    { q: "Toplu rezervasyon veya etkinlik düzenleyebilir miyim?", a: "Evet! Doğum günü partileri, kurum etkinlikleri ve turnuva organizasyonları için bizimle iletişime geçin. Özel paketlerimiz mevcuttur." },
    { q: "Abonelik veya paket sistemi var mı?", a: "Saatlik ücretin yanı sıra 3 saat, 5 saat ve 10 saatlik paketlerimiz bulunmaktadır. Düzenli gelen müşterilerimize özel indirimler uygulanır." },
    { q: "Yarış simülatörü için ön rezervasyon gerekli mi?", a: "Hafta sonu ve akşam saatleri için simülatör ön rezervasyon tavsiye edilir. Hafta içi genellikle müsaittir." },
    { q: "İnternet bağlantısı nasıl?", a: "Her iki şubemizde 1Gbps fiber internet, ayrıca her istasyonda özel LAN bağlantısı mevcuttur. Ping süresi minimum seviyededir." },
    { q: "Yiyecek ve içecek servisi var mı?", a: "Her iki şubemizde içecek otomatları ve atıştırmalık seçenekleri mevcuttur. Ayrıca çevrede birçok restoran ve kafe bulunmaktadır." },
  ];

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section id="sss" ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden" dir="rtl">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-faq.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={slideUp} className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Section title */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#ff8c00]/15">
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ff8c00]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white">Sıkça Sorulan Sorular</h2>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-100">Merak ettikleriniz</p>
          </div>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              custom={i * 0.02}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                openIdx === i
                  ? "border-[#ff8c00]/40 bg-neutral-900/90 shadow-[0_0_15px_rgba(255,140,0,0.1)]"
                  : "border-white/[0.08] bg-neutral-900/80 hover:bg-neutral-900"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-center justify-between w-full px-4 sm:px-5 py-3.5 sm:py-4 text-right gap-3"
              >
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${openIdx === i ? "text-[#ff8c00]" : "text-gray-100"}`} />
                </motion.div>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-white leading-snug">{faq.q}</span>
                  <span className={`text-[11px] sm:text-[12px] font-black tabular-nums shrink-0 w-6 text-center ${
                    openIdx === i ? "text-[#ff8c00]" : "text-gray-300"
                  }`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </button>
              <div className={`faq-answer ${openIdx === i ? "open" : ""}`}>
                <p className="px-4 sm:px-5 pb-3.5 sm:pb-4 text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-white leading-relaxed text-right">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="relative z-10 neon-border-all neon-glow rounded-t-2xl border-t border-[#ff8c00]/20 bg-gradient-to-b from-black via-black/[0.97] to-black mt-10 sm:mt-12">
      {/* RGB animated top border */}
      <div className="h-px w-full rgb-line-glow" />

      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6 pt-8 sm:pt-10 pb-8 sm:pb-10">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-center">
          <div className="relative mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-[#ff8c00]/20">
            <img src="/versus-logo-new.png" alt="V" className="h-full w-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-black tracking-[0.2em] neon-text uppercase gallery-rgb-glow">SALİH FX</p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.3em] text-gray-100 uppercase">Game Center & İnternet Kafe</p>
          </div>
        </div>

        {/* Neon divider */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ff8c00]/30" />
          <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#ff8c00]/10">
            <Zap className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-[#ff8c00]" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ff8c00]/30" />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center">
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#ff8c00] uppercase mb-2">Hızlı Erişim</p>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <a href="#rezervasyon" className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-100 hover:text-[#ff8c00] transition-colors">Rezervasyon</a>
              <a href="#galeri" className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-100 hover:text-[#ff8c00] transition-colors">Galeri</a>
              <a href="#iletisim" className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-100 hover:text-[#ff8c00] transition-colors">İletişim</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#ff8c00] uppercase mb-2">Şube</p>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100">Çubuk</p>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100">Cumhuriyet Mh.</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#ff8c00] uppercase mb-2">Çalışma Saatleri</p>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100">Her Gün</p>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-100">Kapanış: 02:00</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[12px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#ff8c00] uppercase mb-3 sm:mb-4 text-center">Bizi Takip Edin</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-400/40 transition-all"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
            <motion.a
              href="https://wa.me/905057499978"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-400/40 transition-all"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
          </div>
        </div>

        {/* Neon divider */}
        <div className="mb-4 sm:mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff8c00]/20 to-transparent" />
          <div className="h-1 w-1 rounded-full bg-[#ff8c00]/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#ff8c00]/20 to-transparent" />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="rounded-xl border border-[#ff8c00]/10 bg-[#ff8c00]/5 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8c00]" />
              <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#ff8c00] uppercase">Kızılay</p>
            </div>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-200 leading-relaxed">Necatibey Cd. No: 34</p>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-200">06430 Çankaya/Ankara</p>
          </div>
          <div className="rounded-xl border border-[#ff8c00]/10 bg-[#ff8c00]/5 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8c00]" />
              <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#ff8c00] uppercase">Pursaklar</p>
            </div>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-200 leading-relaxed">Şht. Ali Aktaş Cd. No: 10/B</p>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-200">06146 Pursaklar/Ankara</p>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
          <a href="tel:+905467871406" className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#ff8c00]/10 bg-[#ff8c00]/5 px-3 sm:px-4 py-2 sm:py-2.5 neon-reflect hover:bg-[#ff8c00]/10 transition-colors">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8c00]" />
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-gray-100">+90 546 787 14 06</span>
          </a>
          <a href="tel:+905416454196" className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#ff8c00]/10 bg-[#ff8c00]/5 px-3 sm:px-4 py-2 sm:py-2.5 neon-reflect hover:bg-[#ff8c00]/10 transition-colors">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8c00]" />
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-gray-100">+90 541 645 41 96</span>
          </a>
        </div>

        {/* Instagram */}
        <div className="mb-6 sm:mb-8 text-center">
          <a href="https://www.instagram.com/versusgamecenterr?igsh=MTJmaGQ2bmtsaTNjZg==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-blue-500/10 bg-blue-500/5 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-blue-500/10 transition-colors">
            <Instagram className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-gray-100">@versusgamecenterr</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[8px] sm:text-[9px] text-gray-300">
            © {new Date().getFullYear()} Versus Game Center. Tüm hakları saklıdır.
          </p>
          <p className="text-[7px] sm:text-[8px] text-gray-400 mt-0.5">
            Premium Gaming Deneyimi — Ankara
          </p>
        </div>
      </div>

      {/* Neon bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8c00] to-transparent opacity-50" />
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   FİYATLANDIRMA
   ═══════════════════════════════════════════════ */

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  const plans = [
    {
      name: "Standart PC",
      price: "30₺",
      period: "/saat",
      icon: Monitor,
      color: "#ff8c00",
      features: ["RTX 5060 Ti", "144Hz Monitör", "1 Saat Minimum"],
      popular: false,
    },
    {
      name: "Premium PC",
      price: "50₺",
      period: "/saat",
      icon: Crown,
      color: "#a855f7",
      features: ["RTX 4090", "240Hz Monitör", "VIP Koltuk", "Öncelikli Sıra"],
      popular: true,
    },
    {
      name: "VIP Oda (4 Kişi)",
      price: "180₺",
      period: "/saat",
      icon: Users,
      color: "#00d4e8",
      features: ["Ses Yalıtımı", "Özel Klima", "PS5 Dahil", "Özel Ekran"],
      popular: false,
    },
    {
      name: "VIP Oda (8 Kişi)",
      price: "320₺",
      period: "/saat",
      icon: Trophy,
      color: "#f59e0b",
      features: ["Geniş Oda", "2x RTX 4090", "Turnuva Hazır", "Özel Ses Sistemi"],
      popular: false,
    },
  ];

  return (
    <section id="fiyatlandirma" ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-pricing.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Subtle grid bg */}
      <div className="absolute inset-0 z-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Section header */}
        <motion.div variants={slideUp} className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff8c00]" />
            <div className="absolute inset-0 rounded-xl shadow-[0_0_12px_rgba(255,140,0,0.2)]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white tracking-tight">Fiyatlandırma</h2>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-100 tracking-wider uppercase">Uygun fiyat, premium deneyim</p>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={pop}
              custom={i * 0.05}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 md:p-6 group cursor-default transition-all duration-300 ${plan.popular ? "bg-black/90" : "bg-black/80"}`}
              style={{
                borderColor: plan.popular ? `${plan.color}40` : "rgba(255,255,255,0.06)",
                boxShadow: plan.popular ? `0 0 20px ${plan.color}15, inset 0 1px 0 0 ${plan.color}20` : "none",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center rounded-full bg-[#ff8c00] px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black text-white tracking-wider uppercase shadow-lg shadow-[#ff8c00]/30">
                    En Popüler
                  </span>
                </div>
              )}

              {/* Glow orb */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${plan.color}, transparent 70%)` }} />

              <div className="relative z-[2]">
                {/* Icon + Name */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${plan.color}15` }}>
                    <plan.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-white leading-tight">{plan.name}</h3>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-[22px] sm:text-[26px] font-black leading-none" style={{ color: plan.color }}>{plan.price}</span>
                      <span className="text-[11px] sm:text-[12px] text-gray-300 font-semibold">{plan.period}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-2 mb-5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: `${plan.color}12` }}>
                        <Check className="h-3 w-3" style={{ color: plan.color }} />
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-semibold text-gray-100">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  href="https://wa.me/905057499978"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full text-center rounded-xl py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: plan.popular ? `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` : "rgba(255,255,255,0.05)",
                    border: plan.popular ? "none" : `1px solid ${plan.color}30`,
                    boxShadow: plan.popular ? `0 4px 20px ${plan.color}25` : "none",
                    color: plan.popular ? "#fff" : plan.color,
                  }}
                >
                  {plan.popular ? "Hemen Rezerve Et" : "Rezervasyon"}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div variants={slideUp} custom={0.35} className="mt-4 sm:mt-5 flex items-center justify-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-[12px] font-bold text-gray-100 tracking-wider uppercase">3 saat, 5 saat ve 10 saatlik paketler de mevcuttur</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAYSTATION BÖLÜMÜ
   ═══════════════════════════════════════════════ */

function PlayStationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  const cards = [
    {
      name: "PS5 Gaming Zone",
      desc: "DualSense denetleyici, 4K TV ve 50+ PS5 oyunu ile eşsiz konsol deneyimi.",
      features: ["DualSense Controller", "4K HDR TV", "50+ PS5 Oyunu", "Çok Oyuncu Modu"],
      color: "#006FCD",
      glow: "rgba(0,111,205,0.2)",
      icon: Gamepad2,
    },
    {
      name: "PS VR Deneyimi",
      desc: "PlayStation VR2 ile sanal gerçeklik dünyasına adım atın.",
      features: ["PS VR2 Kulaklık", "Sanal Gerçeklik", "İmmersif Oyunlar", "Hareket Kontrolü"],
      color: "#00d4e8",
      glow: "rgba(0,212,232,0.2)",
      icon: Eye,
    },
  ];

  return (
    <section id="playstation" ref={ref} className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/images/sections/bg-ps.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Subtle grid bg */}
      <div className="absolute inset-0 z-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(0,111,205,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,111,205,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Section header */}
        <motion.div variants={slideUp} className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#006FCD]/10 border border-[#006FCD]/20">
            <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#006FCD]" />
            <div className="absolute inset-0 rounded-xl shadow-[0_0_12px_rgba(0,111,205,0.2)]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-black text-white tracking-tight">PlayStation</h2>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-100 tracking-wider uppercase">Konsol gaming deneyimi</p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.name}
              variants={pop}
              custom={i * 0.05}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/80 p-4 sm:p-5 md:p-6 group cursor-default transition-all duration-300 hover:border-white/[0.12]"
              style={{ boxShadow: `inset 0 1px 0 0 ${card.color}15, 0 0 30px ${card.glow}` }}
            >
              {/* Glow orb */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${card.color}, transparent 70%)` }} />

              <div className="relative z-[2]">
                {/* Icon + Name */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${card.color}15` }}>
                    <card.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-white leading-tight">{card.name}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[12px] sm:text-[13px] text-gray-200 leading-relaxed mb-4">{card.desc}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {card.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded" style={{ background: `${card.color}12` }}>
                        <Check className="h-2.5 w-2.5" style={{ color: card.color }} />
                      </div>
                      <span className="text-[11px] sm:text-[12px] font-semibold text-gray-100">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/905057499978"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full text-center mt-4 rounded-xl py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-bold text-white tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`,
                    boxShadow: `0 4px 20px ${card.glow}`,
                  }}
                >
                  Bilgi Al
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════════ */

function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/905057499978"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full shadow-lg cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "rgba(37,211,102,0.4)" }} />
      {/* WhatsApp icon */}
      <svg className="relative h-7 w-7 sm:h-8 sm:w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════
   BACK TO TOP BUTTON
   ═══════════════════════════════════════════════ */

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#ff8c00]/30 bg-black/80 backdrop-blur-sm shadow-lg cursor-pointer transition-colors hover:bg-[#ff8c00]/10"
          style={{ boxShadow: "0 4px 20px rgba(255,140,0,0.15)" }}
          aria-label="Yukarı çık"
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff8c00]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [gameLibOpen, setGameLibOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <main className="min-h-screen bg-transparent relative z-[1]">
      <Header />
      <Hero />
      <NeonMarquee />
      <RgbGameStrip image="/images/games/rgb/gaming-setup-1.png" label="Premium Gaming Setup" />
      <FeatureChips />
      <HizmetlerSection />
      <RgbGameStrip image="/images/games/rgb/fps-gaming.png" label="PC Gaming Deneyimi" />
      {/* Separator — Cyan */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-2" /></div>

      {/* Oyun Kütüphanesi — Buton */}
      <section className="relative z-10 px-4 sm:px-6 py-2 sm:py-3">
        <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameLibOpen(true)}
              className="w-full relative overflow-hidden rounded-2xl border border-[#ff8c00]/20 bg-gradient-to-r from-[#ff8c00]/10 via-black to-[#00d4e8]/10 p-4 sm:p-5 md:p-6 group cursor-pointer neon-glow"
            >
              <div className="absolute inset-0 shine-effect pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff8c00]/15 border border-[#ff8c00]/25 shadow-lg shadow-[#ff8c00]/10">
                    <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff8c00]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] sm:text-[15px] md:text-[17px] font-black text-white">
                      Oyun Kütüphanesi
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] sm:text-[10px] text-gray-200">450+ oyun yüklü</span>
                      <span className="text-gray-400">·</span>
                      <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-400">
                        <span className="relative flex h-[4px] w-[4px]">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-[4px] w-[4px] rounded-full bg-emerald-400" />
                        </span>
                        Aktif Sunucular
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-1.5 rounded-xl bg-[#ff8c00]/90 px-3 sm:px-4 py-2 sm:py-2.5"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-white">Keşfet</span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <PromoBanner />
      <RgbGameStrip image="/images/games/rgb/esports-arena.png" label="E-Spor Arenası" />
      <NeonMarqueeGlow />
      <EkipmanSection />
      <RgbGameStrip image="/images/games/rgb/pc-rgb-closeup.png" label="RTX 4090 Gaming PC" />
      {/* Separator — Amber */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-2" /></div>
      <GameLogosMarquee />
      <PromoCards />
      <StatsSection />
      <RgbGameStrip image="/images/games/rgb/vip-room.png" label="VIP Gaming Odası" />
      <RgbGameStrip image="/images/games/rgb/friends-gaming.png" label="Arkadaşlarla Gaming" reverse />
      {/* Separator — Orange */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent my-2" /></div>
      {/* Oyun Kütüphanesi — CTA 2 (Mini Game Grid) */}
      <section className="relative z-10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.35 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameLibOpen(true)}
              className="w-full relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/8 via-neutral-950 to-violet-500/8 p-4 sm:p-5 cursor-pointer group"
            >
              {/* Mini game grid preview */}
              <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.04] transition-opacity">
                <div className="grid grid-cols-8 grid-rows-4 h-full w-full gap-0.5 p-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="rounded-sm bg-white" style={{ opacity: 0.3 + (i % 3) * 0.3 }} />
                  ))}
                </div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500/30 to-violet-500/30 blur-sm" />
                    <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-xl border border-rose-500/30 bg-black/85">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="16" cy="10" r="1" fill="currentColor"/><circle cx="19" cy="13" r="1" fill="currentColor"/></svg>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] sm:text-[15px] font-black text-white">
                      450+ Oyun Keşfet
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-100 mt-0.5">FPS, MOBA, Battle Royale, RPG ve daha fazlası</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-500 px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-rose-500/20">
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-white">Tüm Oyunlar</span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <ReviewsSection />
      <RgbGameStrip image="/images/games/rgb/peripherals-rgb.png" label="RGB Ekipmanlar" />
      {/* Separator — Pink */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent my-2" /></div>
      <GaleriSection />
      <RgbGameStrip image="/images/games/rgb/racing-sim.png" label="Yarış Simülatörü" reverse />
      {/* Oyun Kütüphanesi — CTA 3 (Featured Showcase) */}
      <section className="relative z-10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameLibOpen(true)}
              className="w-full relative overflow-hidden cursor-pointer group"
            >
              <div className="relative rounded-2xl border border-cyan-500/15 bg-gradient-to-r from-cyan-950/40 via-black to-emerald-950/40 p-4 sm:p-5 overflow-hidden">
                {/* Animated scan line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent animate-pulse" />
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500/40 rounded-br-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20">
                        <Server className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                      </div>
                      {/* Ping dot */}
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border border-black" />
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] sm:text-[15px] font-black text-white">
                        Oyun Kütüphanesi
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[8px] font-bold text-emerald-400">GTA V Aktif</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5">
                          <Zap className="h-2.5 w-2.5 text-amber-400" />
                          <span className="text-[8px] font-bold text-amber-400">Popüler</span>
                        </span>
                        <span className="text-[8px] text-gray-300">450+ oyun</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-cyan-500/90 px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-cyan-500/20 group-hover:bg-cyan-400 transition-colors">
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-white">Kütüphaneyi Aç</span>
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>
      <NeonMarquee reverse />
      <Contact />
      <RgbGameStrip image="/images/games/rgb/hallway-neon.png" label="SalihFx Game Center" />
      <WorkingHoursSection />
      {/* Separator — Emerald */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-2" /></div>
      <RezervasyonSection />
      <RgbGameStrip image="/images/games/rgb/monitor-glow.png" label="240Hz Gaming" />
      <FAQSection />
      <RgbGameStrip image="/images/games/rgb/game-center-exterior.png" label="SalihFx Game Center" />
      {/* Separator — Violet */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent my-2" /></div>
      <PricingSection />
      <RgbGameStrip image="/images/games/rgb/pricing-neon.png" label="Fiyatlandırma" />
      {/* Separator — Orange */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent my-2" /></div>
      <PlayStationSection />
      <RgbGameStrip image="/images/games/rgb/ps5-zone.png" label="PlayStation Zone" />
      {/* Separator — Blue */}
      <div className="relative z-10 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6"><div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-2" /></div>
      <Footer />

      {/* Floating UI */}
      <FloatingWhatsApp />
      <BackToTop />

      {/* Oyun Kütüphanesi — Tam Ekran Overlay */}
      <GameLibrary isOpen={gameLibOpen} onClose={() => setGameLibOpen(false)} />
    </main>
    </>
  );
}
