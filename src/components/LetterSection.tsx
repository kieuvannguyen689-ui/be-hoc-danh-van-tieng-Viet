import React, { useState } from "react";
import { VIETNAMESE_LETTERS } from "../data";
import { LetterItem } from "../types";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Volume2, ArrowLeft, BookOpen, ToggleLeft, ToggleRight } from "lucide-react";

interface LetterSectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
}

export default function LetterSection({ onBack, onEarnStar }: LetterSectionProps) {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [learnedLetters, setLearnedLetters] = useState<string[]>([]);

  const handleLetterClick = (item: LetterItem) => {
    setSelectedLetter(item);
    playSpellingAudio("", item.name);

    if (!learnedLetters.includes(item.letter)) {
      const updated = [...learnedLetters, item.letter];
      setLearnedLetters(updated);
      onEarnStar(1); // Earn 1 star for exploring a new letter!
      SoundEffects.playStarCollect();
    } else {
      SoundEffects.playWoodenClick();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 bg-white rounded-3xl shadow-sm border-4 border-[#FDE68A] overflow-hidden text-[#4A3428]">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b-4 border-[#FDE68A]">
        <button
          onClick={() => {
            SoundEffects.playBounce();
            onBack();
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-[#FFF7ED] text-[#FF8A8A] font-black rounded-full transition-all border-b-4 border-gray-200 active:scale-95 text-xs tracking-wider uppercase"
          id="btn-back-dashboard"
        >
          <ArrowLeft className="w-5 h-5 text-[#FF8A8A]" />
          <span>Về bảng điều khiển</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-[#FF8A8A] text-white p-2.5 rounded-2xl shadow-[0_3px_0_#E57373]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            Chữ Cái Montessori
          </h2>
        </div>

        {/* Uppercase / Lowercase toggle */}
        <div className="flex items-center gap-2 bg-[#FEF3C7] px-4 py-2 rounded-full border border-[#FDE68A]">
          <span className="text-xs font-black text-[#B45309]">Chữ thường</span>
          <button
            onClick={() => {
              SoundEffects.playBounce();
              setIsUppercase(!isUppercase);
            }}
            className="text-[#FF8A8A] hover:scale-105 transition-transform"
            id="btn-toggle-case"
          >
            {isUppercase ? (
              <ToggleRight className="w-10 h-10 text-[#FF8A8A]" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-amber-900/40" />
            )}
          </button>
          <span className="text-xs font-black text-[#B45309]">Chữ IN HOA</span>
        </div>
      </div>

      {/* Montessori Guide Box */}
      <div className="mb-6 bg-[#FFFBEB] p-4 rounded-2xl border-2 border-dashed border-[#FDE68A] text-center text-sm text-[#6B5140] font-bold leading-relaxed">
        💡 <strong className="text-[#FF8A8A]">Quy tắc Montessori:</strong> Các chữ màu <span className="text-[#E57373] font-black">hồng nhạt</span> là <strong className="text-[#E57373]">nguyên âm</strong>, các chữ màu <span className="text-[#60A5FA] font-black">xanh dương</span> là <strong className="text-[#60A5FA]">phụ âm</strong>. Hãy chạm vào chữ để nghe phát âm nhé!
      </div>

      {/* Letter Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3 md:gap-4 justify-items-center mb-8">
        {VIETNAMESE_LETTERS.map((item) => {
          const isVowel = item.vowelType === "vowel";
          const hasLearned = learnedLetters.includes(item.letter);

          return (
            <motion.button
              key={item.letter}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLetterClick(item)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl border-b-6 flex flex-col items-center justify-between py-2 transition-all cursor-pointer ${
                isVowel
                  ? "bg-[#FFEBEB] hover:bg-[#FED7D7] border-[#FFAAAA] text-[#D32F2F]"
                  : "bg-[#E0F2FE] hover:bg-[#BAE6FD] border-[#93C5FD] text-[#1D4ED8]"
              }`}
              id={`letter-btn-${item.letter}`}
            >
              {hasLearned && (
                <div className="absolute top-1.5 right-1.5 bg-amber-400 text-white rounded-full p-0.5 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                </div>
              )}
              <span className="text-3xl sm:text-4xl font-black font-display leading-none mt-2">
                {isUppercase ? item.uppercase : item.letter}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider opacity-60 font-mono mb-1">
                {item.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between bg-[#FFFBEB] px-6 py-3.5 rounded-2xl mb-2 border-2 border-[#FDE68A]">
        <span className="text-sm font-black text-[#6B5140]">Bé đã thuộc:</span>
        <div className="flex-1 mx-4 bg-white rounded-full h-4 overflow-hidden border-2 border-gray-100">
          <div
            className="bg-[#4ADE80] h-full transition-all duration-500 rounded-full"
            style={{ width: `${(learnedLetters.length / VIETNAMESE_LETTERS.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-black text-[#6B5140]">
          {learnedLetters.length} / {VIETNAMESE_LETTERS.length} chữ cái
        </span>
      </div>

      {/* Interactive Illustration Detail Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 bg-[#4A3428]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[40px] shadow-2xl border-8 border-[#FDE68A] max-w-sm w-full p-6 text-center relative overflow-hidden text-[#4A3428]"
            >
              {/* Confetti effect background */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFF1F2_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

              <button
                onClick={() => {
                  SoundEffects.playWoodenClick();
                  setSelectedLetter(null);
                }}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309] font-black rounded-full z-20 cursor-pointer"
              >
                ✕
              </button>

              <div className="relative z-10 flex flex-col h-full pointer-events-auto">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-black text-[#B45309] uppercase tracking-widest bg-[#FEF3C7] border border-[#FDE68A] mb-4 self-center">
                  Ví dụ minh họa
                </span>

                {/* Display big letters */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className={`w-20 h-24 rounded-2xl flex items-center justify-center border-2 border-b-6 ${
                      selectedLetter.vowelType === "vowel"
                        ? "bg-[#FFEBEB] border-[#FFAAAA] text-[#D32F2F]"
                        : "bg-[#E0F2FE] border-[#93C5FD] text-[#1D4ED8]"
                    }`}>
                      <span className="text-5xl font-black font-display">{selectedLetter.uppercase}</span>
                    </div>
                    <span className="text-xs font-black text-gray-500 mt-1 block">In hoa</span>
                  </div>

                  <div className="text-center">
                    <div className={`w-20 h-24 rounded-2xl flex items-center justify-center border-2 border-b-6 ${
                      selectedLetter.vowelType === "vowel"
                        ? "bg-[#FFEBEB] border-[#FFAAAA] text-[#D32F2F]"
                        : "bg-[#E0F2FE] border-[#93C5FD] text-[#1D4ED8]"
                    }`}>
                      <span className="text-5xl font-black font-display">{selectedLetter.letter}</span>
                    </div>
                    <span className="text-xs font-black text-gray-500 mt-1 block">Chữ thường</span>
                  </div>
                </div>

                {/* Audio and text */}
                <div className="bg-[#FFFBEB] p-4 rounded-2xl border-4 border-dashed border-[#FDE68A] mb-4">
                  <p className="text-xs font-black text-gray-500 mb-1">Cách phát âm của chữ cái:</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-black font-display text-[#4A3428] capitalize">{selectedLetter.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSpellingAudio("", selectedLetter.name);
                      }}
                      className="p-2 bg-amber-400 hover:bg-amber-500 text-white rounded-full shadow-[0_3px_0_#D97706] active:scale-90 transition-transform cursor-pointer relative z-20"
                      id={`btn-play-pronounce-${selectedLetter.letter}`}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Example Picture */}
                <div className="bg-[#F0FDF4] p-4 rounded-2xl border-2 border-[#4ADE80] flex flex-col items-center">
                  {/* Cute animated visual asset representation in CSS/SVG */}
                  <div className="w-24 h-24 mb-2 flex items-center justify-center bg-white rounded-full shadow-inner border border-emerald-100">
                    <span className="text-5xl">
                      {selectedLetter.letter === "a" && "🐟"}
                      {selectedLetter.letter === "ă" && "👓"}
                      {selectedLetter.letter === "â" && "🍎"}
                      {selectedLetter.letter === "b" && "🧸"}
                      {selectedLetter.letter === "c" && "🦀"}
                      {selectedLetter.letter === "d" && "🥥"}
                      {selectedLetter.letter === "đ" && "🏮"}
                      {selectedLetter.letter === "e" && "👶"}
                      {selectedLetter.letter === "ê" && "⭐"}
                      {selectedLetter.letter === "g" && "🐔"}
                      {selectedLetter.letter === "h" && "🌹"}
                      {selectedLetter.letter === "i" && "🔮"}
                      {selectedLetter.letter === "k" && "✂️"}
                      {selectedLetter.letter === "l" && "🍐"}
                      {selectedLetter.letter === "m" && "🐱"}
                      {selectedLetter.letter === "n" && "🌳"}
                      {selectedLetter.letter === "o" && "🥥"}
                      {selectedLetter.letter === "ô" && "⛱️"}
                      {selectedLetter.letter === "ơ" && "🚩"}
                      {selectedLetter.letter === "p" && "🔦"}
                      {selectedLetter.letter === "q" && "🍊"}
                      {selectedLetter.letter === "r" && "🐢"}
                      {selectedLetter.letter === "s" && "🌟"}
                      {selectedLetter.letter === "t" && "🍎"}
                      {selectedLetter.letter === "u" && "🍈"}
                      {selectedLetter.letter === "ư" && "🦁"}
                      {selectedLetter.letter === "v" && "🦆"}
                      {selectedLetter.letter === "x" && "🚌"}
                      {selectedLetter.letter === "y" && "🎗️"}
                    </span>
                  </div>
                  <p className="text-xs font-black text-gray-500">Từ ví dụ chứa chữ:</p>
                  <div className="flex items-center gap-2 justify-center">
                    <p className="text-xl font-black text-emerald-800 uppercase tracking-wide">
                      {selectedLetter.wordExample}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSpellingAudio("", selectedLetter.wordExample);
                      }}
                      className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-[0_2px_0_#047857] active:scale-95 transition-transform cursor-pointer relative z-20"
                      id="btn-play-example-word"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 italic">Nhấn vào khoảng trống để đóng</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
