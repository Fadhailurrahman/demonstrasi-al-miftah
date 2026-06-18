import React from 'react';
import { motion } from 'motion/react';
import { CornerMandala, SideBorder } from './IslamicOrnament';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="islamic-bg min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-4 py-6 sm:py-12 md:px-16 select-none bg-[#faf7f0]">
      {/* Framed Ornamental Border Layers */}
      <CornerMandala position="top-left" />
      <CornerMandala position="top-right" />
      <CornerMandala position="bottom-left" />
      <CornerMandala position="bottom-right" />

      {/* Sided Pillars for Presentation Vibe */}
      <SideBorder align="left" />
      <SideBorder align="right" />

      {/* Decorative Gold Inner Frame lines */}
      <div className="absolute inset-4 md:inset-8 border border-[#d4b26f]/30 pointer-events-none rounded-xl"></div>
      <div className="absolute inset-5 md:inset-9 border border-[#275a4e]/10 pointer-events-none rounded-xl"></div>

      {/* Core Presentation Content Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-20 text-center max-w-2xl px-4 py-8 sm:px-6 sm:py-12 bg-white/45 backdrop-blur-md border border-[#d4b26f]/20 rounded-2xl shadow-xl shadow-[#275a4e]/5"
      >
        {/* Top Mini Islamic Emblem */}
        <div className="mx-auto w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-[#275a4e]/10 border border-[#d4b26f]">
          <svg className="w-6 h-6 text-[#275a4e]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Brushed Script Title Area */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold italic text-[#244f44] tracking-tight mb-2 leading-tight drop-shadow-sm">
          Materi Demonstrasi
        </h1>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold italic text-[#244f44] tracking-tight mb-4 drop-shadow-sm">
          Program Baca Kitab
        </h2>

        {/* Subtitle Accent */}
        <div className="w-32 h-[2px] bg-[#d4b26f] mx-auto my-6 relative">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#275a4e] rotate-45 border border-[#d4b26f] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        <p className="text-lg md:text-2xl font-semibold text-[#3b5e55] tracking-wide uppercase mb-10 font-sans">
          Metode Al-Miftah lil Ulum
        </p>

        {/* Start Button - Matches Sage Green PPT Pill Styling */}
        <motion.button
          id="btn-mulai"
          onClick={onStart}
          whileHover={{ scale: 1.06, backgroundColor: '#1d433b' }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 text-lg md:text-xl font-bold tracking-wider text-[#faf7f0] bg-[#3a6e61] border-2 border-[#d4b26f]/40 hover:border-[#d4b26f] rounded-full shadow-lg shadow-[#1e433b]/20 cursor-pointer transition-all duration-300"
        >
          Mulai
        </motion.button>
      </motion.div>

      {/* Little Footer Note (humble, human labels) */}
      <div className="absolute bottom-6 md:bottom-10 text-center font-serif text-sm text-[#4d6660]/60 z-20">
        Pasca-Tahapan Metode Al-Miftah Sidogiri
      </div>
    </div>
  );
};
