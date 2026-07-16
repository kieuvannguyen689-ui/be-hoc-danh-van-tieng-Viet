import React, { useState, useEffect } from "react";
import { VOCABULARY_LIST } from "../data";
import { VocabularyWord } from "../types";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Play, Sparkles, Volume2 } from "lucide-react";

interface SpellingSectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
}

export default function SpellingSection({ onBack, onEarnStar }: SpellingSectionProps) {
  // Use a subset of vocabulary that has clear phonetic 4-step spelling patterns
  const practiceWords = VOCABULARY_LIST.filter(w => 
    w.word === "ba" || 
    w.word === "bố" || 
    w.word === "mẹ" || 
    w.word === "bà" || 
    w.word === "bé" || 
    w.word === "cá" || 
    w.word === "gà" || 
    w.word === "bò" || 
    w.word === "bí" || 
    w.word === "lá" || 
    w.word === "hồ"
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1); // 1 to 4 spelling steps
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  const activeWord: VocabularyWord = practiceWords[currentIndex];

  // Derive spelling phonics parts based on current active word
  // e.g., "bé" -> first: "b" (bờ), second: "e" (e), third: "be" (be), fourth: "bé" (bé)
  const getPhonicsParts = (wordObj: VocabularyWord) => {
    const word = wordObj.word;
    if (word === "ba") {
      return { p1: "b", p1Pronounce: "bờ", p2: "a", p2Pronounce: "a", p3: "ba", p3Pronounce: "ba", p4: "ba", p4Pronounce: "ba" };
    }
    if (word === "bố") {
      return { p1: "b", p1Pronounce: "bờ", p2: "ô", p2Pronounce: "ô", p3: "bô", p3Pronounce: "bô", p4: "bố", p4Pronounce: "bố" };
    }
    if (word === "mẹ") {
      return { p1: "m", p1Pronounce: "mờ", p2: "e", p2Pronounce: "e", p3: "me", p3Pronounce: "me", p4: "mẹ", p4Pronounce: "mẹ" };
    }
    if (word === "bà") {
      return { p1: "b", p1Pronounce: "bờ", p2: "a", p2Pronounce: "a", p3: "ba", p3Pronounce: "ba", p4: "bà", p4Pronounce: "bà" };
    }
    if (word === "bé") {
      return { p1: "b", p1Pronounce: "bờ", p2: "e", p2Pronounce: "e", p3: "be", p3Pronounce: "be", p4: "bé", p4Pronounce: "bé" };
    }
    if (word === "cá") {
      return { p1: "c", p1Pronounce: "cờ", p2: "a", p2Pronounce: "a", p3: "ca", p3Pronounce: "ca", p4: "cá", p4Pronounce: "cá" };
    }
    if (word === "gà") {
      return { p1: "g", p1Pronounce: "gờ", p2: "a", p2Pronounce: "a", p3: "ga", p3Pronounce: "ga", p4: "gà", p4Pronounce: "gà" };
    }
    if (word === "bò") {
      return { p1: "b", p1Pronounce: "bờ", p2: "o", p2Pronounce: "o", p3: "bo", p3Pronounce: "bo", p4: "bò", p4Pronounce: "bò" };
    }
    if (word === "bí") {
      return { p1: "b", p1Pronounce: "bờ", p2: "i", p2Pronounce: "i", p3: "bi", p3Pronounce: "bi", p4: "bí", p4Pronounce: "bí" };
    }
    if (word === "lá") {
      return { p1: "l", p1Pronounce: "lờ", p2: "a", p2Pronounce: "a", p3: "la", p3Pronounce: "la", p4: "lá", p4Pronounce: "lá" };
    }
    if (word === "hồ") {
      return { p1: "h", p1Pronounce: "hờ", p2: "ô", p2Pronounce: "ô", p3: "hô", p3Pronounce: "hô", p4: "hồ", p4Pronounce: "hồ" };
    }
    return { p1: "b", p1Pronounce: "bờ", p2: "e", p2Pronounce: "e", p3: "be", p3Pronounce: "be", p4: "bé", p4Pronounce: "bé" };
  };

  const phonics = getPhonicsParts(activeWord);

  useEffect(() => {
    // Reset steps when shifting active word
    setCurrentStep(1);
    setSuccessAnimation(false);
  }, [currentIndex]);

  const executeStep = (step: number) => {
    if (step > currentStep) {
      SoundEffects.playErrorBuzz();
      return; // prevent skipping ahead
    }

    if (step === 1) {
      playSpellingAudio("", phonics.p1Pronounce);
      SoundEffects.playWoodenClick();
      if (currentStep === 1) setCurrentStep(2);
    } else if (step === 2) {
      playSpellingAudio("", phonics.p2Pronounce);
      SoundEffects.playWoodenClick();
      if (currentStep === 2) setCurrentStep(3);
    } else if (step === 3) {
      playSpellingAudio("", phonics.p3Pronounce);
      SoundEffects.playWoodenClick();
      if (currentStep === 3) setCurrentStep(4);
    } else if (step === 4) {
      playSpellingAudio("", phonics.p4Pronounce);
      SoundEffects.playSuccessFanfare();
      setSuccessAnimation(true);

      if (!completedWords.includes(activeWord.word)) {
        setCompletedWords([...completedWords, activeWord.word]);
        onEarnStar(3); // Earn 3 stars for completing spelling!
        SoundEffects.playStarCollect();
      }
    }
  };

  const handleNextWord = () => {
    SoundEffects.playBounce();
    if (currentIndex < practiceWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 bg-white rounded-3xl shadow-sm border-4 border-[#FDE68A] overflow-hidden text-[#4A3428]">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b-4 border-[#FDE68A]">
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
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            Ghép Vần Montessori
          </h2>
        </div>

        <div className="w-10"></div>
      </div>

      {/* Montessori Phonic Workbook Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-center">
        
        {/* Left Side: Word Card & Picture */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm flex flex-col items-center relative min-h-[350px] justify-center text-center">
          <span className="absolute top-4 left-4 bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">
            {activeWord.category}
          </span>

          {/* Picture frame */}
          <div className="w-36 h-36 mb-6 rounded-3xl bg-[#FFFBEB] border-4 border-[#FDE68A] flex items-center justify-center text-7xl relative overflow-hidden">
            <span className="relative z-10">
              {activeWord.word === "ba" && "👨"}
              {activeWord.word === "bố" && "👨"}
              {activeWord.word === "mẹ" && "👩"}
              {activeWord.word === "bà" && "👵"}
              {activeWord.word === "bé" && "👶"}
              {activeWord.word === "cá" && "🐟"}
              {activeWord.word === "gà" && "🐔"}
              {activeWord.word === "bò" && "🐮"}
              {activeWord.word === "bí" && "🎃"}
              {activeWord.word === "lá" && "🍃"}
              {activeWord.word === "hồ" && "🏞️"}
            </span>
          </div>

          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Từ đang học:</p>
          <h3 className="text-5xl font-black font-display text-[#4A3428] tracking-tight mb-1 uppercase">
            {activeWord.word}
          </h3>
          <p className="text-xs text-[#8A7060] font-bold">({activeWord.translation})</p>

          {/* Success star drop */}
          <AnimatePresence>
            {successAnimation && (
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 bg-[#4ADE80] border-4 border-[#22C55E] rounded-[28px] flex flex-col items-center justify-center text-white p-6 z-20"
              >
                <div className="text-6xl mb-2 animate-bounce">⭐</div>
                <h4 className="text-2xl font-black uppercase mb-1 font-display">BÉ THẬT GIỎI!</h4>
                <p className="text-xs font-black text-center leading-relaxed">
                  Bé đã đánh vần chính xác từ <strong className="underline">{activeWord.word.toUpperCase()}</strong>!
                </p>
                <button
                  onClick={() => setSuccessAnimation(false)}
                  className="mt-6 px-6 py-2.5 bg-white text-[#22C55E] font-black rounded-full border-b-4 border-gray-200 shadow-md hover:scale-105 transition-all text-xs uppercase"
                  id="btn-dismiss-success"
                >
                  Tiếp tục ghép vần
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Interactive Phonics Engine */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#FFFBEB] p-5 rounded-[28px] border-4 border-dashed border-[#FDE68A]">
            <h4 className="text-xs font-black text-[#B45309] mb-4 text-center uppercase tracking-wider">
              👉 Hãy chạm lần lượt từ vòng số 1 đến 4:
            </h4>

            {/* Spelling Circle Row */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => executeStep(1)}
                  className={`w-16 h-16 rounded-2xl font-display font-black text-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-b-6 border-2 relative ${
                    currentStep >= 1
                      ? "bg-[#E0F2FE] text-[#1D4ED8] border-[#93C5FD] scale-105 hover:bg-[#BAE6FD]"
                      : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed border-b-2"
                  }`}
                  id="btn-step-1"
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter text-[#1D4ED8]/60 absolute top-1 font-black">1</span>
                  <span className="mt-2.5 uppercase">{phonics.p1}</span>
                </button>
                <span className="text-xs font-bold text-[#8A7060] mt-2 font-display italic">"{phonics.p1Pronounce}"</span>
              </div>

              <div className="text-gray-300 font-bold text-xl hidden sm:block">+</div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => executeStep(2)}
                  className={`w-16 h-16 rounded-2xl font-display font-black text-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-b-6 border-2 relative ${
                    currentStep >= 2
                      ? "bg-[#FFEBEB] text-[#D32F2F] border-[#FFAAAA] scale-105 hover:bg-[#FED7D7]"
                      : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed border-b-2"
                  }`}
                  id="btn-step-2"
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter text-[#D32F2F]/60 absolute top-1 font-black">2</span>
                  <span className="mt-2.5 uppercase">{phonics.p2}</span>
                </button>
                <span className="text-xs font-bold text-[#8A7060] mt-2 font-display italic">"{phonics.p2Pronounce}"</span>
              </div>

              <div className="text-gray-300 font-bold text-xl hidden sm:block">=</div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => executeStep(3)}
                  className={`w-16 h-16 rounded-2xl font-display font-black text-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-b-6 border-2 relative ${
                    currentStep >= 3
                      ? "bg-purple-50 text-purple-700 border-purple-200 scale-105 hover:bg-purple-100"
                      : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed border-b-2"
                  }`}
                  id="btn-step-3"
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter text-purple-700/60 absolute top-1 font-black">3</span>
                  <span className="mt-2.5 uppercase">{phonics.p3}</span>
                </button>
                <span className="text-xs font-bold text-[#8A7060] mt-2 font-display italic">"{phonics.p3Pronounce}"</span>
              </div>

              {/* Step 4 (with tone, if any) */}
              <div className="text-gray-300 font-bold text-xl hidden sm:block">➔</div>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => executeStep(4)}
                  className={`w-20 h-20 rounded-2xl font-display font-black text-3xl flex flex-col items-center justify-center transition-all cursor-pointer border-b-8 border-4 relative ${
                    currentStep >= 4
                      ? "bg-amber-400 text-amber-950 border-amber-500 scale-110 hover:bg-amber-500"
                      : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed border-b-2"
                  }`}
                  id="btn-step-4"
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter text-amber-950/60 absolute top-1 font-black">4</span>
                  <span className="mt-2 uppercase">{phonics.p4}</span>
                </button>
                <span className="text-xs font-black text-[#B45309] mt-2 font-display uppercase">Trọn Từ!</span>
              </div>
            </div>
          </div>

          {/* Guidelines box */}
          <div className="bg-[#FEF3C7] p-5 rounded-[24px] border-2 border-[#FDE68A]">
            <h5 className="text-xs font-black text-[#B45309] uppercase tracking-wide mb-1.5">Cô hướng dẫn bé:</h5>
            <ol className="text-xs text-amber-950 list-decimal pl-4 space-y-1 font-bold leading-relaxed">
              <li>Nhấn phím phụ âm <strong>{phonics.p1.toUpperCase()}</strong> nghe âm: <em>"{phonics.p1Pronounce}"</em>.</li>
              <li>Nhấn phím nguyên âm <strong>{phonics.p2.toUpperCase()}</strong> nghe âm: <em>"{phonics.p2Pronounce}"</em>.</li>
              <li>Hợp âm 2 chữ cái lại thành: <strong>{phonics.p3.toUpperCase()}</strong> nghe âm: <em>"{phonics.p3Pronounce}"</em>.</li>
              <li>Cuối cùng đánh vần kết hợp dấu thanh được: <strong>{phonics.p4.toUpperCase()}</strong> phát âm chuẩn: <em>"{phonics.p4Pronounce}"</em>!</li>
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-2 gap-4">
            <span className="text-xs font-black text-gray-400">
              Đã ghép đúng: {completedWords.length} / {practiceWords.length} từ
            </span>
            <button
              onClick={handleNextWord}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#FF8A8A] hover:bg-[#E57373] text-white font-black rounded-full border-b-4 border-[#E57373] active:scale-95 transition-all text-xs uppercase"
              id="btn-next-word-spelling"
            >
              <span>Từ tiếp theo</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
