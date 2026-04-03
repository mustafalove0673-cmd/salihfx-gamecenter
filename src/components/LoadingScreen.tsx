"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center gap-4 z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border border-white/10"
            >
              <img src="/images/salihfx-logo.png" alt="SF" className="h-full w-full object-cover" />
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-[20px] sm:text-[24px] font-black tracking-[0.2em] text-white"
            >
              SALİH FX
            </motion.p>

            {/* Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-8 h-8 border-2 border-white/10 border-t-[#ff8c00] rounded-full animate-spin"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
