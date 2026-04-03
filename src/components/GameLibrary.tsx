"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Gamepad2,
  Server,
  Zap,
  Users,
  ChevronDown,
  Monitor,
  Star,
  Filter,
} from "lucide-react";
import { games, categories, categoryColors, type GameCategory } from "@/data/games";

interface GameLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

function GameCard({ game, index }: { game: (typeof games)[0]; index: number }) {
  const colors = categoryColors[game.category] || categoryColors["FPS"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: index * 0.015,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-xl border ${
        game.featured
          ? "border-[#ff8c00]/50 bg-gradient-to-br from-[#ff8c00]/15 via-[#ff8c00]/5 to-black/80"
          : "border-white/[0.06] bg-black/50"
      } backdrop-blur-xl p-3 sm:p-4 transition-all duration-200 cursor-default ${
        game.featured ? "rgb-border-glow" : "hover:border-white/[0.12] hover:bg-black/60"
      }`}
    >
      {/* Featured top glow */}
      {game.featured && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff8c00] to-transparent" />
      )}

      {/* Server Status Badge */}
      {game.serverStatus && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
          {game.serverStatus === "active" ? (
            <span className="flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.5">
              <span className="relative flex h-[5px] w-[5px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-emerald-400" />
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold text-emerald-400 uppercase tracking-wider">
                Aktif
              </span>
            </span>
          ) : game.serverStatus === "popular" ? (
            <span className="flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.5">
              <Zap className="h-2.5 w-2.5 text-amber-400" />
              <span className="text-[7px] sm:text-[8px] font-bold text-amber-400 uppercase tracking-wider">
                Popüler
              </span>
            </span>
          ) : null}
        </div>
      )}

      {/* Featured Badge */}
      {game.featured && (
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1 rounded-md bg-[#ff8c00]/20 border border-[#ff8c00]/40 px-1.5 py-0.5">
          <Server className="h-2.5 w-2.5 text-[#ff8c00]" />
          <span className="text-[7px] sm:text-[8px] font-black text-[#ff8c00] uppercase tracking-wider">
            Hızlı Sunucu
          </span>
        </div>
      )}

      {/* Game Name */}
      <div className="mt-1">
        <p
          className={`text-[11px] sm:text-[12px] md:text-[13px] font-bold leading-tight truncate ${
            game.featured ? "text-[#ff8c00]" : "text-white"
          }`}
        >
          {game.name}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-md border ${colors.border} ${colors.bg} px-1.5 py-0.5`}
          >
            <span className={`text-[7px] sm:text-[8px] font-semibold ${colors.text} uppercase tracking-wider`}>
              {game.category}
            </span>
          </span>
        </div>
      </div>

      {/* Hover shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </div>
    </motion.div>
  );
}

export default function GameLibrary({ isOpen, onClose }: GameLibraryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("Tümü");
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredGames = useMemo(() => {
    let result = games.filter((g) => {
      const matchSearch = search === "" || g.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Tümü" || g.category === activeCategory;
      return matchSearch && matchCategory;
    });

    // Featured games first
    const featured = result.filter((g) => g.featured);
    const active = result.filter((g) => g.serverStatus === "active" && !g.featured);
    const popular = result.filter((g) => g.serverStatus === "popular" && !g.featured);
    const rest = result.filter(
      (g) => !g.featured && g.serverStatus !== "active" && g.serverStatus !== "popular"
    );
    return [...featured, ...active, ...popular, ...rest];
  }, [search, activeCategory]);

  const activeCount = games.filter((g) => g.serverStatus === "active").length;
  const popularCount = games.filter((g) => g.serverStatus === "popular").length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col h-full overflow-hidden"
          >
            {/* ── HEADER ── */}
            <div className="shrink-0 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ff8c00]/15 border border-[#ff8c00]/25">
                    <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff8c00]" />
                  </div>
                  <div>
                    <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-black text-white tracking-tight">
                      OYUN KÜTÜPHANESİ
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] sm:text-[10px] text-gray-100">
                        {games.length}+ Oyun
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-400">
                        <span className="relative flex h-[4px] w-[4px]">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-[4px] w-[4px] rounded-full bg-emerald-400" />
                        </span>
                        {activeCount} Aktif Sunucu
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-amber-400">
                        <Zap className="h-2.5 w-2.5" />
                        {popularCount} Popüler
                      </span>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-200" />
                </motion.button>
              </div>

              {/* Search bar */}
              <div className="px-4 sm:px-6 md:px-8 pb-3 sm:pb-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-100" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Oyun ara... (CS2, Valorant, GTA, FIFA...)"
                    className="w-full h-10 sm:h-11 md:h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl pl-10 sm:pl-11 pr-4 sm:pr-12 text-[12px] sm:text-[13px] md:text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c00]/40 focus:bg-white/[0.06] transition-all duration-200"
                    autoFocus
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.08] hover:bg-white/[0.15] transition-colors"
                    >
                      <X className="h-3 w-3 text-gray-200" />
                    </button>
                  )}
                  {/* Bottom RGB line */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#ff8c00]/25 to-transparent" />
                </div>
              </div>

              {/* Category Filters */}
              <div className="px-4 sm:px-6 md:px-8 pb-3 sm:pb-4">
                <div className="relative">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 mb-2 text-[10px] sm:text-[11px] font-semibold text-gray-200 hover:text-white transition-colors"
                  >
                    <Filter className="h-3 w-3" />
                    Kategoriler
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`flex flex-wrap gap-1.5 sm:gap-2 ${
                      showFilters ? "block" : "hidden lg:flex"
                    }`}
                  >
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      const colors = cat === "Tümü" ? { text: "text-[#ff8c00]", bg: "bg-[#ff8c00]/15", border: "border-[#ff8c00]/30" } : categoryColors[cat] || categoryColors["FPS"];
                      return (
                        <motion.button
                          key={cat}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveCategory(cat)}
                          className={`rounded-lg border px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 ${
                            isActive
                              ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg`
                              : "border-white/[0.06] bg-white/[0.03] text-gray-100 hover:text-gray-100 hover:border-white/[0.12]"
                          }`}
                        >
                          {cat}
                          {cat === "Tümü" && (
                            <span className="ml-1 text-[8px] opacity-60">({games.length})</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── GAME GRID ── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 md:px-8 py-4 sm:py-6 custom-scrollbar">
              {/* Results info */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 max-w-6xl mx-auto">
                <p className="text-[10px] sm:text-[11px] text-gray-100">
                  {search || activeCategory !== "Tümü" ? (
                    <>
                      <span className="text-gray-100 font-bold">{filteredGames.length}</span> oyun bulundu
                    </>
                  ) : (
                    <>
                      Tüm oyunlar{" "}
                      <span className="text-gray-100 font-bold">({games.length})</span>
                    </>
                  )}
                </p>
                {(search || activeCategory !== "Tümü") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("Tümü");
                    }}
                    className="text-[10px] sm:text-[11px] text-[#ff8c00] font-semibold hover:underline"
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* GTA5 Featured Card */}
              {filteredGames.some((g) => g.featured) && (
                <div className="max-w-6xl mx-auto mb-5 sm:mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-2xl border border-[#ff8c00]/30 bg-gradient-to-br from-[#ff8c00]/15 via-black/80 to-[#ff8c00]/5 p-5 sm:p-6 md:p-8"
                  >
                    {/* Animated RGB border glow */}
                    <div className="absolute inset-0 rounded-2xl rgb-border-glow pointer-events-none" />

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ff8c00] to-transparent rounded-full blur-3xl" />
                    </div>

                    <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-4 sm:gap-5 flex-1">
                        <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-[#ff8c00]/20 border border-[#ff8c00]/30 shadow-lg shadow-[#ff8c00]/10">
                          <img src="/images/games/gta-v.png" alt="GTA V Online" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[16px] sm:text-[20px] md:text-[24px] font-black text-[#ff8c00]">
                              GTA V Online
                            </h3>
                          </div>
                          <p className="text-[10px] sm:text-[12px] text-gray-200 mb-2">
                            Özel sunucu • Hızlı bağlantı • Yüksek FPS
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1">
                              <span className="relative flex h-[5px] w-[5px]">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-emerald-400" />
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                Sunucu Aktif
                              </span>
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/25 px-2.5 py-1">
                              <Server className="h-3 w-3 text-[#ff8c00]" />
                              <span className="text-[9px] sm:text-[10px] font-bold text-[#ff8c00] uppercase tracking-wider">
                                Hızlı Sunucu
                              </span>
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                              <Users className="h-3 w-3 text-gray-200" />
                              <span className="text-[9px] sm:text-[10px] font-bold text-gray-200 uppercase tracking-wider">
                                Çok Oyunculu
                              </span>
                            </span>
                            <span className="flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                              <span className="text-[9px] sm:text-[10px] font-bold text-gray-200 uppercase tracking-wider">
                                Popüler
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shine sweep */}
                    <div className="absolute inset-0 shine-effect pointer-events-none" />
                  </motion.div>
                </div>
              )}

              {/* Game Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                {filteredGames
                  .filter((g) => !g.featured)
                  .map((game, index) => (
                    <GameCard key={`${game.name}-${game.category}`} game={game} index={index} />
                  ))}
              </div>

              {/* No results */}
              {filteredGames.filter((g) => !g.featured).length === 0 && !filteredGames.some((g) => g.featured) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-4">
                    <Search className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="text-[14px] font-bold text-gray-200 mb-1">Sonuç bulunamadı</p>
                  <p className="text-[12px] text-gray-300">
                    &quot;{search}&quot; ile eşleşen oyun yok. Farklı bir arama deneyin.
                  </p>
                </motion.div>
              )}
            </div>

            {/* ── FOOTER BAR ── */}
            <div className="shrink-0 border-t border-white/[0.06] bg-black/60 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-3">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <Monitor className="h-3 w-3 text-gray-100" />
                    <span className="text-[9px] sm:text-[10px] text-gray-100">
                      {games.length}+ Oyun Yüklü
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Server className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9px] sm:text-[10px] text-emerald-500">
                      {activeCount} Aktif Sunucu
                    </span>
                  </div>
                </div>
                <p className="text-[8px] sm:text-[9px] text-gray-300">
                  VERSUS Game Center &copy; {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
