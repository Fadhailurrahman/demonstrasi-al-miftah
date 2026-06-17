import React from 'react';
import { motion } from 'motion/react';
import { CornerMandala, SideBorder } from './IslamicOrnament';

interface MenuPageProps {
  onSelect: (id: string) => void;
  materials: { id: string; title: string; subTitle: string }[];
}

export const MenuPage: React.FC<MenuPageProps> = ({ onSelect, materials }) => {
  return (
    <div className="islamic-bg min-h-screen relative flex flex-col items-center justify-start overflow-hidden px-4 py-16 md:px-16 select-none bg-[#faf7f0]">
      {/* Decorative Ornaments */}
      <CornerMandala position="top-left" />
      <CornerMandala position="top-right" />
      <CornerMandala position="bottom-left" />
      <CornerMandala position="bottom-right" />

      <SideBorder align="left" />
      <SideBorder align="right" />

      {/* Decorative Gold Inner Frame lines */}
      <div className="absolute inset-4 md:inset-8 border border-[#d4b26f]/30 pointer-events-none rounded-xl"></div>
      <div className="absolute inset-5 md:inset-9 border border-[#275a4e]/10 pointer-events-none rounded-xl"></div>

      <div className="z-20 w-full max-w-5xl flex flex-col items-center">
        {/* Header - Styled to match "Daftar Materi:" from slide 2 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 mt-6"
        >
          <span className="text-[#d4b26f] text-sm uppercase tracking-widest font-bold font-sans block mb-1">
            Materi Pembelajaran
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold italic text-[#244f44] tracking-wide relative inline-block">
            Daftar Materi:
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#d4b26f]/40"></span>
          </h1>
        </motion.div>

        {/* 10 Star Grid (2 rows of 5 on wide screens, 2 cols on mobile) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 lg:gap-10 justify-items-center py-6 px-4 bg-white/30 backdrop-blur-sm border border-emerald-900/5 rounded-2xl max-w-4xl shadow-md"
        >
          {materials.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * idx + 0.1, type: 'spring', stiffness: 100 }}
              className="flex flex-col items-center"
            >
              {/* rub el hizb star button */}
              <button
                id={`star-${m.id}`}
                onClick={() => onSelect(m.id)}
                className="relative group w-24 h-24 md:w-32 md:h-32 flex items-center justify-center focus:outline-none cursor-pointer"
                title={`${m.title}`}
              >
                {/* SVG 8-pointed star */}
                <svg 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  className="absolute inset-0 w-full h-full transform group-hover:rotate-45 group-hover:scale-110 transition-all duration-500 ease-out filter drop-shadow-md"
                >
                  {/* Outer shadow/outline layer */}
                  <polygon
                    points="50,3 65,35 97,50 65,65 50,97 35,65 3,50 35,35"
                    className="fill-[#4d7e73]/10 stroke-[#d4b26f] stroke-[2]"
                  />
                  {/* Star Polygon path */}
                  <polygon
                    points="50,5 64,36 95,50 64,64 50,95 36,64 5,50 36,36"
                    className="fill-[#537e74] group-hover:fill-[#1e433b] stroke-[#d4b26f]/80 group-hover:stroke-[#e9ca91] stroke-[2.5] transition-all duration-300"
                  />
                  {/* Inner secondary star border */}
                  <polygon
                    points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40"
                    className="fill-none stroke-[#faf7f0]/30 stroke-[1]"
                  />
                </svg>

                {/* Star center number */}
                <span className="relative z-10 text-2xl md:text-3xl font-serif font-extrabold text-[#faf7f0] group-hover:text-white transition-all duration-300">
                  {m.id}
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Small instructive banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-sm md:text-base text-[#4d6660]/70 font-sans italic flex items-center gap-2"
        >
          <svg className="w-4 h-4 text-[#d4b26f] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Klik nomor materi untuk memulai demonstrasi membaca kitab.
        </motion.div>
      </div>
    </div>
  );
};
