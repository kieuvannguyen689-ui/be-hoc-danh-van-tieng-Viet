import React, { useState } from "react";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Sparkles, RefreshCw, Star, Trophy, Gamepad2 } from "lucide-react";

interface GameSectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
  starsCount: number;
}

export default function GameSection({ onBack, onEarnStar, starsCount }: GameSectionProps) {
  const [activeGame, setActiveGame] = useState<"feed" | "match">("feed");
  
  // Feed Game States
  const feedLevels = [
    { targetWord: "BÉ", lettersNeeded: ["B", "E", "SẮC"], currentLetterIndex: 0, clue: "Em bé nhỏ" },
    { targetWord: "CÁ", lettersNeeded: ["C", "A", "SẮC"], currentLetterIndex: 0, clue: "Con cá vàng bơi" },
    { targetWord: "GÀ", lettersNeeded: ["G", "A", "HUYỀN"], currentLetterIndex: 0, clue: "Chú gà trống gáy" }
  ];
  const [feedLevelIdx, setFeedLevelIdx] = useState<number>(0);
  const [feedCurrentIndex, setFeedCurrentIndex] = useState<number>(0);
  const [feedDinoState, setFeedDinoState] = useState<"idle" | "happy" | "eating">("idle");
  const [feedFinished, setFeedFinished] = useState<boolean>(false);

  const activeFeedLevel = feedLevels[feedLevelIdx];
  const nextTargetLetter = activeFeedLevel.lettersNeeded[feedCurrentIndex];

  // Scrambled choices for the feeding game
  const feedChoices = ["B", "C", "G", "A", "E", "SẮC", "HUYỀN", "NẶNG"].sort(() => Math.random() - 0.5);

  // Match Game States
  const matchQuestions = [
    { formula: "B + A", answer: "BA", choices: ["BA", "BÉ", "CÁ"], emoji: "👨", text: "Ba yêu quý" },
    { formula: "C + A + SẮC", answer: "CÁ", choices: ["BA", "BÉ", "CÁ"], emoji: "🐟", text: "Con cá vàng" },
    { formula: "B + E + SẮC", answer: "BÉ", choices: ["BA", "BÉ", "GÀ"], emoji: "👶", text: "Em bé yêu" }
  ];
  const [matchIdx, setMatchIdx] = useState<number>(0);
  const [matchUnlocked, setMatchUnlocked] = useState<boolean>(false);

  const activeMatch = matchQuestions[matchIdx];

  const handleFeedLetter = (letter: string) => {
    if (feedFinished) return;

    if (letter === nextTargetLetter) {
      // Correct!
      playSpellingAudio("", letter);
      setFeedDinoState("eating");
      SoundEffects.playPop();

      setTimeout(() => {
        setFeedDinoState("happy");
        if (feedCurrentIndex < activeFeedLevel.lettersNeeded.length - 1) {
          setFeedCurrentIndex(feedCurrentIndex + 1);
        } else {
          // Finished level!
          setFeedFinished(true);
          onEarnStar(5); // Give 5 stars reward!
          SoundEffects.playSuccessFanfare();
        }
      }, 600);
    } else {
      // Incorrect letter
      setFeedDinoState("idle");
      SoundEffects.playErrorBuzz();
      // Small vibration
      playSpellingAudio("", "chưa đúng");
    }
  };

  const handleMatchChoice = (choice: string) => {
    if (matchUnlocked) return;

    if (choice === activeMatch.answer) {
      // Correct!
      setMatchUnlocked(true);
      playSpellingAudio("", activeMatch.answer);
      SoundEffects.playSuccessFanfare();
      onEarnStar(4); // Give 4 stars reward!
    } else {
      SoundEffects.playErrorBuzz();
      playSpellingAudio("", "chưa đúng");
    }
  };

  const resetFeedGame = () => {
    SoundEffects.playBounce();
    setFeedCurrentIndex(0);
    setFeedDinoState("idle");
    setFeedFinished(false);
  };

  const nextFeedLevel = () => {
    SoundEffects.playBounce();
    if (feedLevelIdx < feedLevels.length - 1) {
      setFeedLevelIdx(feedLevelIdx + 1);
    } else {
      setFeedLevelIdx(0);
    }
    setFeedCurrentIndex(0);
    setFeedDinoState("idle");
    setFeedFinished(false);
  };

  const nextMatchLevel = () => {
    SoundEffects.playBounce();
    if (matchIdx < matchQuestions.length - 1) {
      setMatchIdx(matchIdx + 1);
    } else {
      setMatchIdx(0);
    }
    setMatchUnlocked(false);
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
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            Trò Chơi Montessori
          </h2>
        </div>

        {/* Game Mode switchers */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              SoundEffects.playWoodenClick();
              setActiveGame("feed");
            }}
            className={`px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-b-4 ${
              activeGame === "feed"
                ? "bg-[#FF8A8A] border-[#E57373] text-white shadow-sm"
                : "bg-white text-[#4A3428] border-2 border-b-4 border-[#FDE68A] hover:bg-[#FFFBEB]"
            }`}
            id="btn-game-feed"
          >
            🍕 Cho khủng long ăn
          </button>
          <button
            onClick={() => {
              SoundEffects.playWoodenClick();
              setActiveGame("match");
            }}
            className={`px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-b-4 ${
              activeGame === "match"
                ? "bg-[#FF8A8A] border-[#E57373] text-white shadow-sm"
                : "bg-white text-[#4A3428] border-2 border-b-4 border-[#FDE68A] hover:bg-[#FFFBEB]"
            }`}
            id="btn-game-match"
          >
            🧩 Ghép tranh mở khóa
          </button>
        </div>
      </div>

      {/* GAME 1: CHO KHỦNG LONG ĂN CHỮ CÁI */}
      {activeGame === "feed" && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          
          {/* Dino animation chamber */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm flex flex-col items-center justify-between min-h-[360px] relative text-center">
            <span className="absolute top-4 left-4 bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">
              Chủ đề: Đánh vần vui
            </span>

            {/* Clue box */}
            <div className="mt-8 bg-[#FFFBEB] border-2 border-[#FDE68A] px-4 py-2 rounded-xl text-center text-xs font-black text-amber-950 uppercase tracking-wide">
              Gợi ý từ ghép: <strong className="text-[#FF8A8A] font-display">{activeFeedLevel.targetWord}</strong> ({activeFeedLevel.clue})
            </div>

            {/* Character Drawing */}
            <div className="my-6 relative">
              {feedDinoState === "eating" && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="text-8xl select-none"
                >
                  🦕😋
                </motion.div>
              )}
              {feedDinoState === "happy" && (
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-8xl select-none"
                >
                  🦕🎉
                </motion.div>
              )}
              {feedDinoState === "idle" && (
                <div className="text-8xl select-none animate-bounce">
                  🦕
                </div>
              )}

              {/* Speech bubble */}
              <div className="absolute -top-12 -right-24 bg-[#FEF3C7] border-2 border-[#FDE68A] px-3.5 py-2 rounded-2xl text-[10px] font-black text-amber-950 shadow-sm leading-tight">
                {feedFinished ? (
                  <span>Ngon quá! Cảm ơn bé! 😍</span>
                ) : (
                  <span>
                    Cho tớ ăn chữ <strong className="text-[#FF8A8A] text-xs uppercase font-display">"{nextTargetLetter}"</strong> nhé!
                  </span>
                )}
                <div className="absolute bottom-[-6px] left-4 w-2 h-2 bg-[#FEF3C7] border-r-2 border-b-2 border-[#FDE68A] rotate-45"></div>
              </div>
            </div>

            {/* Letter tracker */}
            <div className="flex gap-2">
              {activeFeedLevel.lettersNeeded.map((letItem, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 border-b-4 transition-all ${
                    idx < feedCurrentIndex
                      ? "bg-[#4ADE80] text-white border-[#22C55E]"
                      : "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]"
                  }`}
                >
                  {idx < feedCurrentIndex ? letItem : "?"}
                </div>
              ))}
            </div>

            {/* Finish Dialog */}
            <AnimatePresence>
              {feedFinished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#FF8A8A]/95 border-4 border-[#E57373] rounded-[28px] flex flex-col items-center justify-center text-white p-6 z-20 text-center"
                >
                  <Trophy className="w-16 h-16 text-amber-300 mb-3 animate-pulse" />
                  <h3 className="text-2xl font-black uppercase mb-1 font-display">MĂM MĂM MĂM!</h3>
                  <p className="text-xs font-black mb-4 leading-relaxed">
                    Bé giỏi quá! Đã đút thành công từ <strong className="text-yellow-200 uppercase underline font-display">{activeFeedLevel.targetWord}</strong> cho chú khủng long đó!
                  </p>
                  <div className="flex items-center gap-1 text-[#B45309] font-black text-xs mb-6 bg-[#FEF3C7] px-4 py-1.5 rounded-full border border-[#FDE68A]">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>Nhận ngay +5 Sao Vàng!</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={resetFeedGame}
                      className="px-5 py-2.5 bg-white/20 hover:bg-white/35 text-white font-black rounded-full border-b-4 border-white/10 text-xs uppercase"
                      id="btn-replay-feed"
                    >
                      <RefreshCw className="w-4 h-4 inline mr-1" /> Chơi lại
                    </button>
                    <button
                      onClick={nextFeedLevel}
                      className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-[#4A3428] font-black rounded-full border-b-4 border-yellow-600 text-xs uppercase shadow-sm active:translate-y-0.5 transition-all"
                      id="btn-next-feed-level"
                    >
                      Màn tiếp theo ➜
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scrambled food letter tray */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#FFFBEB] p-5 rounded-[32px] border-4 border-dashed border-[#FDE68A] text-center min-h-[360px] flex flex-col justify-center">
              <h4 className="text-xs font-black text-[#B45309] mb-6 uppercase tracking-wider">
                🌟 Chạm vào đĩa thức ăn đúng để bón cho khủng long nhé:
              </h4>

              <div className="grid grid-cols-4 gap-3">
                {feedChoices.map((letter, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFeedLetter(letter)}
                    className="aspect-square bg-white border-2 border-b-6 border-[#FDE68A] hover:border-[#FF8A8A] rounded-2xl shadow-sm text-2xl font-black font-display text-[#4A3428] flex items-center justify-center transition-all cursor-pointer relative"
                    id={`feed-choice-${letter}`}
                  >
                    {/* Small plate visual detail */}
                    <div className="absolute inset-1.5 border border-dashed border-[#FFFBEB] rounded-xl pointer-events-none"></div>
                    <span className="relative z-10 uppercase">{letter}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: GHÉP VẦN MỞ KHÓA TRANH */}
      {activeGame === "match" && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          
          {/* Locked/Unlocked Picture Frame */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm flex flex-col items-center justify-between min-h-[350px] relative overflow-hidden text-center">
            <span className="absolute top-4 left-4 bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">
              Công Thức Ghép Vần
            </span>

            {/* Formula display */}
            <div className="my-8 bg-[#FFFBEB] px-6 py-3 rounded-2xl border-4 border-[#FDE68A] text-center">
              <span className="text-2xl font-black font-display text-amber-950 uppercase">
                {activeMatch.formula} = ?
              </span>
            </div>

            {/* Locked vs Unlocked picture visual representation */}
            <div className="my-4 flex flex-col items-center">
              {matchUnlocked ? (
                <motion.div
                  initial={{ scale: 0.7, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-40 h-40 rounded-[32px] bg-[#FFFBEB] border-4 border-[#FDE68A] shadow-sm flex items-center justify-center text-8xl relative"
                >
                  <span>{activeMatch.emoji}</span>
                  <div className="absolute top-2 right-2 bg-amber-400 text-white rounded-full p-1 animate-ping">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              ) : (
                <div className="w-40 h-40 rounded-[32px] bg-gray-50 border-4 border-dashed border-gray-300 shadow-inner flex items-center justify-center text-7xl grayscale select-none relative">
                  <span>{activeMatch.emoji}</span>
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-xs rounded-[28px] flex items-center justify-center">
                    <span className="text-white text-3xl font-black">🔒</span>
                  </div>
                </div>
              )}
              <h4 className="text-sm font-black text-[#4A3428] mt-4 uppercase tracking-wider">
                {matchUnlocked ? activeMatch.text : "Đang bị khóa"}
              </h4>
            </div>

            {/* Unlock Star claim banner */}
            {matchUnlocked && (
              <div className="bg-[#FEF3C7] text-amber-950 border border-[#FDE68A] px-4 py-2 rounded-xl text-xs font-black text-center mb-4">
                🎉 Mở khóa thành công! Nhận +4 Sao Vàng!
              </div>
            )}

            {/* Next buttons */}
            <div className="w-full flex justify-end">
              <button
                onClick={nextMatchLevel}
                disabled={!matchUnlocked}
                className={`px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider shadow-sm border-b-4 active:scale-95 transition-all ${
                  matchUnlocked
                    ? "bg-[#FF8A8A] border-[#E57373] text-white cursor-pointer"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed border-2 border-gray-200 border-b-2"
                }`}
                id="btn-next-match-level"
              >
                Tranh tiếp theo ➜
              </button>
            </div>
          </div>

          {/* Interactive choices catalog */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#FFFBEB] p-5 rounded-[32px] border-4 border-dashed border-[#FDE68A] text-center min-h-[350px] flex flex-col justify-center">
              <h4 className="text-xs font-black text-[#B45309] mb-6 uppercase tracking-wider leading-relaxed">
                🧩 Chọn kết quả ghép vần thích hợp để mở bức tranh bí ẩn:
              </h4>

              <div className="flex flex-col gap-3">
                {activeMatch.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMatchChoice(choice)}
                    className={`w-full py-4 rounded-2xl font-black text-2xl font-display border-2 border-b-6 shadow-sm cursor-pointer transition-all uppercase ${
                      matchUnlocked && choice === activeMatch.answer
                        ? "bg-[#4ADE80] text-white border-[#22C55E]"
                        : "bg-white text-[#4A3428] border-[#FDE68A] hover:border-[#FF8A8A]"
                    }`}
                    id={`match-choice-${choice}`}
                  >
                    {choice}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
