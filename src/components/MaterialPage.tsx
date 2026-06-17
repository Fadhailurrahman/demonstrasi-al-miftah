import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  BookOpen, 
  Sparkles, 
  BookOpenText,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { MaterialDetail, SentenceAnalysis } from '../types';
import { CornerMandala } from './IslamicOrnament';

interface MaterialPageProps {
  material: MaterialDetail;
  onBackToMenu: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  currentIndex: number;
  totalMaterials: number;
}

// Utility to strip Arabic vowels (harakat) for Gundul mode
const removeHarakat = (text: string): string => {
  return text.replace(/[\u064B-\u0652\u0670]/g, "");
};

export const MaterialPage: React.FC<MaterialPageProps> = ({
  material,
  onBackToMenu,
  onNavigate,
  currentIndex,
  totalMaterials,
}) => {
  // Configurable Interactive UI State
  const [fontSize, setFontSize] = useState<number>(34); // larger default font for slides
  const [showHarakat, setShowHarakat] = useState<boolean>(false); // default: false (no harakat - hanya tulisan arab saja)
  const [showTranslation, setShowTranslation] = useState<boolean>(false); // default: false (hidden)
  const [showExplanation, setShowExplanation] = useState<boolean>(false); // default: false (hidden)
  const [activeAnalysis, setActiveAnalysis] = useState<SentenceAnalysis | null>(null);

  // Reset visibility states when changing material to maintain "Arabic Only" as default for every page/slide
  useEffect(() => {
    setShowHarakat(false);
    setShowTranslation(false);
    setShowExplanation(false);
    setActiveAnalysis(null);
  }, [material.id]);

  // Normalization for matching interactive words when Harakat is hidden
  const normalize = (text: string) => removeHarakat(text).trim();

  // Helper to highlight words with grammatical metadata under Al-Miftah method
  const renderInteractiveArabic = () => {
    const rawArabic = material.arabicText;
    const words = rawArabic.split(/(\s+)/);
    
    return (
      <div 
        className="arabic-text text-center select-text text-[#1e433b] leading-[2.6] tracking-wide font-semibold transition-all duration-300" 
        style={{ fontSize: `${fontSize}px` }}
      >
        {words.map((chunk, idx) => {
          const trimmed = chunk.trim();
          if (!trimmed) return chunk;

          // Find if this trimmed word matches any analysis sample entry using normalized (gundul) forms
          const match = material.analysisSample?.find(item => {
            const normSample = normalize(item.word);
            const normChunk = normalize(trimmed);
            return normChunk.includes(normSample) || normSample.includes(normChunk);
          });

          // Display either vowelled or stripped chunk
          const displayText = showHarakat ? chunk : removeHarakat(chunk);

          if (match && trimmed.length > 1) {
            const isActive = activeAnalysis?.word === match.word;
            return (
              <span key={idx} className="relative inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveAnalysis(isActive ? null : match)}
                  className={`cursor-help border-b-2 border-dashed font-bold transition-all duration-300 px-1 rounded ${
                    isActive 
                      ? 'bg-amber-100 text-[#a98139] border-[#d4b26f]' 
                      : 'border-[#d4b26f]/70 bg-emerald-50/40 text-[#275a4e] hover:bg-emerald-100/50'
                  }`}
                  title="Klik untuk analisis Metode Al-Miftah"
                >
                  {displayText}
                </motion.span>
              </span>
            );
          }
          return <span key={idx}>{displayText}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="islamic-bg min-h-screen relative flex flex-col justify-start overflow-y-auto overflow-x-hidden px-4 md:px-8 py-4 select-none bg-[#faf7f0]">
      {/* Corner decorative mandalas */}
      <CornerMandala position="top-left" />
      <CornerMandala position="top-right" />

      {/* Decorative Outer Outlines */}
      <div className="absolute inset-2 md:inset-4 border border-[#d4b26f]/15 pointer-events-none rounded-xl z-0"></div>

      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col min-h-full flex-grow relative pb-24">
        
        {/* ULTRA COMPACT & SPACE-OPTIMIZED NAVIGATION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-2 px-3 bg-white/70 backdrop-blur-md border border-[#d4b26f]/20 rounded-2xl shadow-xs mb-3 z-30">
          
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Quick back to slide 2 menu */}
            <motion.button
              id="btn-kembali"
              onClick={onBackToMenu}
              whileHover={{ scale: 1.03, x: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#275a4e] text-[#faf7f0] hover:bg-[#1e433b] text-xs font-bold shadow-sm cursor-pointer transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Daftar Menu</span>
            </motion.button>

            {/* Compact Indicator */}
            <span className="text-xs font-serif font-extrabold text-[#244f44] bg-[#faf7f0] border border-[#d4b26f]/20 px-3 py-1.5 rounded-lg">
              Materi {currentIndex + 1} S/D {totalMaterials}
            </span>
          </div>

          {/* Minimalist interactive control keys */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            
            {/* Harakat / Gundul Toggle (High utility for lessons) */}
            <button
              onClick={() => {
                setShowHarakat(!showHarakat);
                setActiveAnalysis(null);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all duration-200 ${
                showHarakat 
                  ? 'bg-amber-500 text-white border-transparent shadow-xs' 
                  : 'bg-white text-[#275a4e] border-[#d4b26f]/30 hover:bg-emerald-50/50'
              }`}
              title={showHarakat ? "Sembunyikan Harakat (Kitab Gundul)" : "Tampilkan Harakat"}
            >
              {showHarakat ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showHarakat ? "Harakat: Aktif" : "Harakat: Gundul"}</span>
            </button>

            {/* Translation toggle button */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all duration-200 ${
                showTranslation 
                  ? 'bg-[#275a4e] text-white border-transparent' 
                  : 'bg-white text-emerald-950 border-[#d4b26f]/30 hover:bg-emerald-50/50'
              }`}
            >
              <BookOpenText className="w-3.5 h-3.5" />
              <span>Arti</span>
            </button>

            {/* Explanation toggle button */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all duration-200 ${
                showExplanation 
                  ? 'bg-[#a37934] text-white border-transparent' 
                  : 'bg-white text-amber-900 border-[#d4b26f]/30 hover:bg-amber-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kaidah</span>
            </button>

            {/* Font slider */}
            <div className="flex items-center gap-1.5 bg-white border border-[#d4b26f]/25 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-950">
              <Type className="w-3.5 h-3.5 text-[#d4b26f]" />
              <input 
                type="range" 
                min="24" 
                max="46" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-14 md:w-16 h-1 accent-[#275a4e] cursor-pointer"
              />
              <span className="font-mono text-[10px]">{fontSize}px</span>
            </div>

          </div>
        </div>

        {/* Dynamic Presentation Frame - Heavily highlighting large Arabic source */}
        <AnimatePresence mode="wait">
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-grow flex flex-col py-1"
          >
            {/* Extremely compact title header */}
            <div className="text-center mb-3">
              <h1 className="text-2xl md:text-3.5xl font-serif font-extrabold italic text-[#244f44]">
                {material.title} : <span className="text-base md:text-xl text-[#3b5e55] not-italic font-sans font-semibold mb-1">{material.subTitle}</span>
              </h1>
              <div className="w-16 h-[2.5px] bg-[#d4b26f]/40 mx-auto mt-1"></div>
            </div>

            {/* Arabic Recitation Canvas Container (The absolute star of the page) */}
            <div className="bg-[#fafbf9]/95 border-2 border-[#d4b26f]/40 rounded-2xl p-4 md:p-8 shadow-sm relative overflow-hidden flex-grow flex flex-col justify-center min-h-[180px]">
              
              {/* Star watermark decoration */}
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-32 h-32 text-[#d4b26f]/5 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                  <polygon points="50,5 64,36 95,50 64,64 50,95 36,64 5,50 36,36" />
                </svg>
              </div>

              {/* Informative Help Badge */}
              {material.analysisSample && material.analysisSample.length > 0 && (
                <div className="absolute top-2.5 left-3 text-[10px] text-emerald-800/60 flex items-center gap-1 font-sans">
                  <HelpCircle className="w-3 h-3 text-[#d4b26f]" />
                  <span>Petunjuk Al-Miftah: Tekan kata bergaris bawah</span>
                </div>
              )}

              {/* Progress Bar inside Card */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gray-100">
                <div 
                  className="h-full bg-[#275a4e] transition-all duration-500" 
                  style={{ width: `${((currentIndex + 1) / totalMaterials) * 100}%` }}
                ></div>
              </div>

              {/* Actual Arabic Text */}
              <div className="my-2 md:my-4 relative z-10 select-text leading-relaxed">
                {renderInteractiveArabic()}
              </div>

              {/* Direct interactive reveal controls inside the card */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#d4b26f]/20 flex flex-wrap justify-center items-center gap-2 relative z-10">
                <button
                  onClick={() => setShowHarakat(!showHarakat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-250 ${
                    showHarakat 
                      ? 'bg-amber-100 text-[#a37934] border border-[#d4b26f]/40 font-bold shadow-xs' 
                      : 'bg-[#faf7f0] text-gray-500 hover:text-[#a37934] border border-[#d4b26f]/10 hover:border-[#d4b26f]/30'
                  }`}
                  title={showHarakat ? "Sembunyikan Harakat" : "Tampilkan Harakat"}
                >
                  {showHarakat ? "✓ Harakat Aktif" : "+ Tampilkan Harakat"}
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-250 ${
                    showTranslation 
                      ? 'bg-emerald-100 text-[#275a4e] border border-emerald-300 font-bold shadow-xs' 
                      : 'bg-[#faf7f0] text-gray-500 hover:text-[#275a4e] border border-[#d4b26f]/10 hover:border-emerald-300/30'
                  }`}
                  title={showTranslation ? "Sembunyikan Arti" : "Tampilkan Arti"}
                >
                  {showTranslation ? "✓ Arti Aktif" : "+ Tampilkan Arti"}
                </button>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-250 ${
                    showExplanation 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold shadow-xs' 
                      : 'bg-[#faf7f0] text-gray-500 hover:text-amber-900 border border-[#d4b26f]/10 hover:border-amber-300/30'
                  }`}
                  title={showExplanation ? "Sembunyikan Kaidah" : "Tampilkan Kaidah"}
                >
                  {showExplanation ? "✓ Kaidah Aktif" : "+ Tampilkan Kaidah"}
                </button>
              </div>

              {/* Interactive Word Analysis Popover (Metode Al-Miftah) */}
              <AnimatePresence>
                {activeAnalysis && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-4 p-3 rounded-xl border border-[#d4b26f]/40 bg-amber-50/95 shadow-md relative z-20 font-sans"
                  >
                    <div className="flex justify-between items-start mb-1.5 border-b border-[#d4b26f]/20 pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold font-arabic text-[#275a4e]">
                          {showHarakat ? activeAnalysis.word : removeHarakat(activeAnalysis.word)}
                        </span>
                        {activeAnalysis.transliteration && (
                          <span className="text-[11px] text-gray-500 italic pb-1">({activeAnalysis.transliteration})</span>
                        )}
                      </div>
                      <span className="text-[9px] bg-[#275a4e] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                        {activeAnalysis.grammarRole}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#1e433b] mb-1">
                      Arti: <span className="text-amber-800">"{activeAnalysis.translation}"</span>
                    </p>
                    <p className="text-[11px] text-[#2c4740] leading-relaxed">
                      <span className="font-bold">Kaidah Nahwu: </span>{activeAnalysis.explanation}
                    </p>
                    <button 
                      onClick={() => setActiveAnalysis(null)} 
                      className="absolute top-1.5 right-1.5 text-xs text-gray-405 hover:text-gray-700 focus:outline-none cursor-pointer"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compact Translation and Al-Miftah Rule Cards side-by-side or stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {/* Bilingual Translation Panel */}
              <AnimatePresence>
                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-white/70 border border-emerald-900/5 rounded-xl shadow-xs"
                  >
                    <h3 className="text-xs font-bold text-[#275a4e] flex items-center gap-1.5 mb-1.5 font-sans">
                      <BookOpen className="w-3.5 h-3.5 text-[#d4b26f]" />
                      Terjemah Indonesia (Fathul Qorib)
                    </h3>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed select-text font-sans">
                      {material.translationIndo}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contextual Islamic/Grammar Explanation Detail */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-[#faf6ee]/90 border border-amber-900/10 rounded-xl"
                  >
                    <h3 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1.5 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Pedoman Baca Al-Miftah
                    </h3>
                    <p className="text-xs text-amber-900/90 leading-relaxed select-text font-sans">
                      {material.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Floating Quick Navigation buttons at the absolute bottom */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-between items-center z-15 px-1 py-1 bg-[#faf7f0]/95 backdrop-blur-md select-none border-t border-emerald-930/5">
          <motion.button
            id="btn-materi-sebelumnya"
            disabled={currentIndex === 0}
            onClick={() => {
              setActiveAnalysis(null);
              onNavigate('prev');
            }}
            whileHover={currentIndex > 0 ? { scale: 1.03 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.97 } : {}}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentIndex === 0 
                ? 'opacity-30 bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white hover:bg-emerald-50 text-[#275a4e] border-[#d4b26f]/20 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </motion.button>

          {/* Center progress pager indicators */}
          <div className="hidden sm:flex items-center gap-1">
            {[...Array(totalMaterials)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-4 bg-[#275a4e]' 
                    : 'w-1.5 bg-[#d4b26f]/30'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-[#244f44]/60 font-mono sm:hidden">
            Materi {currentIndex + 1} / {totalMaterials}
          </span>

          <motion.button
            id="btn-materi-berikutnya"
            disabled={currentIndex === totalMaterials - 1}
            onClick={() => {
              setActiveAnalysis(null);
              onNavigate('next');
            }}
            whileHover={currentIndex < totalMaterials - 1 ? { scale: 1.03 } : {}}
            whileTap={currentIndex < totalMaterials - 1 ? { scale: 0.97 } : {}}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentIndex === totalMaterials - 1 
                ? 'opacity-30 bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-[#275a4e] text-white border-transparent shadow-xs hover:bg-[#1e433b]'
            }`}
          >
            Berikutnya
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </div>
  );
};
