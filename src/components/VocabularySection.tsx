import React, { useState } from "react";
import { VOCABULARY_LIST } from "../data";
import { VocabularyWord } from "../types";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, Volume2, Sparkles } from "lucide-react";

interface VocabularySectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
}

export default function VocabularySection({ onBack, onEarnStar }: VocabularySectionProps) {
  const categories = [
    { name: "Tất cả", emoji: "🌈" },
    { name: "Gia đình", emoji: "🏡" },
    { name: "Động vật", emoji: "🐶" },
    { name: "Trái cây", emoji: "🍇" },
    { name: "Rau củ", emoji: "🎃" },
    { name: "Màu sắc", emoji: "🎨" },
    { name: "Đồ vật", emoji: "🪑" },
    { name: "Trường học", emoji: "🏫" },
    { name: "Thiên nhiên", emoji: "🍃" }
  ];

  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  const filteredWords = activeCategory === "Tất cả"
    ? VOCABULARY_LIST
    : VOCABULARY_LIST.filter(w => w.category === activeCategory);

  const handleWordClick = (wordObj: VocabularyWord) => {
    playSpellingAudio(wordObj.audio, wordObj.word);

    if (!learnedWords.includes(wordObj.word)) {
      setLearnedWords([...learnedWords, wordObj.word]);
      onEarnStar(2); // 2 stars for learning a vocabulary word!
      SoundEffects.playStarCollect();
    } else {
      SoundEffects.playWoodenClick();
    }
  };

  const handleDetailedSpell = (letter: string) => {
    const cleanLetter = letter.replace(".mp3", "");
    
    // Play pronunciation of that phonetic character
    let soundName = cleanLetter;
    if (cleanLetter === "b") soundName = "bờ";
    if (cleanLetter === "c") soundName = "cờ";
    if (cleanLetter === "d") soundName = "dờ";
    if (cleanLetter === "đ") soundName = "đờ";
    if (cleanLetter === "g") soundName = "gờ";
    if (cleanLetter === "h") soundName = "hờ";
    if (cleanLetter === "k") soundName = "kờ";
    if (cleanLetter === "l") soundName = "lờ";
    if (cleanLetter === "m") soundName = "mờ";
    if (cleanLetter === "n") soundName = "nờ";
    if (cleanLetter === "p") soundName = "pờ";
    if (cleanLetter === "q") soundName = "quờ";
    if (cleanLetter === "r") soundName = "rờ";
    if (cleanLetter === "s") soundName = "sờ";
    if (cleanLetter === "t") soundName = "tờ";
    if (cleanLetter === "v") soundName = "vờ";
    if (cleanLetter === "x") soundName = "xờ";
    if (cleanLetter === "sac") soundName = "sắc";
    if (cleanLetter === "huyen") soundName = "huyền";
    if (cleanLetter === "hoi") soundName = "hỏi";
    if (cleanLetter === "nga") soundName = "ngã";
    if (cleanLetter === "nang") soundName = "nặng";

    playSpellingAudio("", soundName);
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
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            Từ Vựng Chủ Đề
          </h2>
        </div>

        <div className="w-10"></div>
      </div>

      {/* Bento style category slider */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-[#FDE68A]">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              SoundEffects.playWoodenClick();
              setActiveCategory(cat.name);
            }}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer shadow-sm transition-all border-b-4 ${
              activeCategory === cat.name
                ? "bg-[#FF8A8A] border-[#E57373] text-white scale-105"
                : "bg-white text-[#4A3428] border-[#FDE68A] hover:bg-[#FFFBEB]"
            }`}
            id={`category-btn-${cat.name}`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Vocabulary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {filteredWords.map((item) => {
          const hasLearned = learnedWords.includes(item.word);
          return (
            <motion.div
              key={item.word}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleWordClick(item)}
              className="bg-white rounded-3xl border-4 border-b-8 border-[#FDE68A] hover:border-[#FF8A8A] p-4 transition-all cursor-pointer text-center flex flex-col items-center relative overflow-hidden"
              id={`vocab-card-${item.word}`}
            >
              {hasLearned && (
                <div className="absolute top-2 right-2 bg-amber-400 text-white rounded-full p-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-white fill-white" />
                </div>
              )}
              
              {/* Category tag */}
              <span className="text-[10px] uppercase tracking-wider text-[#B45309] font-black bg-[#FEF3C7] border border-[#FDE68A] px-2.5 py-0.5 rounded-full mb-3">
                {item.category}
              </span>

              {/* Display emoji illustration */}
              <div className="w-20 h-20 mb-3 bg-[#FFFBEB] rounded-2xl flex items-center justify-center text-4xl border border-[#FDE68A]">
                <span>
                  {item.image === "father" && "👨"}
                  {item.image === "mother" && "👩"}
                  {item.image === "grandmother" && "👵"}
                  {item.image === "grandfather" && "👴"}
                  {item.image === "baby" && "👶"}
                  {item.image === "fish" && "🐟"}
                  {item.image === "chicken" && "🐔"}
                  {item.image === "cat" && "🐱"}
                  {item.image === "cow" && "🐮"}
                  {item.image === "duck" && "🦆"}
                  {item.image === "orange" && "🍊"}
                  {item.image === "avocado" && "🥑"}
                  {item.image === "grape" && "🍇"}
                  {item.image === "apricot" && "🍑"}
                  {item.image === "pumpkin" && "🎃"}
                  {item.image === "chives" && "🌱"}
                  {item.image === "tuber" && "🥕"}
                  {item.image === "red" && "🔴"}
                  {item.image === "yellow" && "🟡"}
                  {item.image === "green" && "🟢"}
                  {item.image === "chair" && "🪑"}
                  {item.image === "table" && "🪵"}
                  {item.image === "notebook" && "📒"}
                  {item.image === "pen" && "✏️"}
                  {item.image === "leaf" && "🍃"}
                  {item.image === "lake" && "🏞️"}
                  {item.image === "cloud" && "☁️"}
                </span>
              </div>

              {/* Word display */}
              <h4 className="text-2xl font-black font-display text-[#4A3428] tracking-tight mb-1 uppercase">
                {item.word}
              </h4>
              <p className="text-xs text-gray-400 font-bold">{item.translation}</p>

              {/* Details and interactive spelling link */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  SoundEffects.playBounce();
                  setSelectedWord(item);
                }}
                className="mt-4 px-4 py-1.5 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#FF8A8A] text-[10px] font-black rounded-full uppercase tracking-wider border border-[#FDE68A] border-b-3 active:translate-y-0.5 transition-transform"
                id={`btn-spell-details-${item.word}`}
              >
                🔍 Xem chi tiết
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Progress banner */}
      <div className="flex items-center justify-between bg-[#FEF3C7] border-4 border-[#FDE68A] px-6 py-3.5 rounded-[24px] mb-2 shadow-sm">
        <span className="text-sm font-black text-[#B45309] uppercase tracking-wide">Bé đã khám phá:</span>
        <div className="flex-1 mx-4 bg-white rounded-full h-4 overflow-hidden border-2 border-[#FDE68A]">
          <div
            className="bg-[#FF8A8A] h-full transition-all duration-500 rounded-full"
            style={{ width: `${(learnedWords.length / VOCABULARY_LIST.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-black text-[#B45309]">
          {learnedWords.length} / {VOCABULARY_LIST.length} từ
        </span>
      </div>

      {/* Detail Dialog */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWord(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] shadow-sm border-8 border-[#FDE68A] max-w-sm w-full p-6 text-center relative overflow-hidden text-[#4A3428]"
            >
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309] font-black rounded-full border border-[#FDE68A]"
              >
                ✕
              </button>

              <span className="inline-block px-4 py-1 rounded-full text-xs font-black text-white uppercase tracking-wider bg-[#FF8A8A] mb-4 border-b-3 border-[#E57373]">
                {selectedWord.category}
              </span>

              {/* Big Word and illustration */}
              <div className="w-24 h-24 mx-auto mb-4 bg-[#FFFBEB] rounded-3xl flex items-center justify-center text-5xl border-4 border-[#FDE68A]">
                <span>
                  {selectedWord.image === "father" && "👨"}
                  {selectedWord.image === "mother" && "👩"}
                  {selectedWord.image === "grandmother" && "👵"}
                  {selectedWord.image === "grandfather" && "👴"}
                  {selectedWord.image === "baby" && "👶"}
                  {selectedWord.image === "fish" && "🐟"}
                  {selectedWord.image === "chicken" && "🐔"}
                  {selectedWord.image === "cat" && "🐱"}
                  {selectedWord.image === "cow" && "🐮"}
                  {selectedWord.image === "duck" && "🦆"}
                  {selectedWord.image === "orange" && "🍊"}
                  {selectedWord.image === "avocado" && "🥑"}
                  {selectedWord.image === "grape" && "🍇"}
                  {selectedWord.image === "apricot" && "🍑"}
                  {selectedWord.image === "pumpkin" && "🎃"}
                  {selectedWord.image === "chives" && "🌱"}
                  {selectedWord.image === "tuber" && "🥕"}
                  {selectedWord.image === "red" && "🔴"}
                  {selectedWord.image === "yellow" && "🟡"}
                  {selectedWord.image === "green" && "🟢"}
                  {selectedWord.image === "chair" && "🪑"}
                  {selectedWord.image === "table" && "🪵"}
                  {selectedWord.image === "notebook" && "📒"}
                  {selectedWord.image === "pen" && "✏️"}
                  {selectedWord.image === "leaf" && "🍃"}
                  {selectedWord.image === "lake" && "🏞️"}
                  {selectedWord.image === "cloud" && "☁️"}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-4xl font-black font-display text-[#4A3428] tracking-tight uppercase">
                  {selectedWord.word}
                </h3>
                <button
                  onClick={() => playSpellingAudio(selectedWord.audio, selectedWord.word)}
                  className="p-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-full shadow-md border-b-4 border-amber-500 active:scale-95 transition-transform"
                  id="btn-play-word-pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs font-bold text-gray-400 mb-6">({selectedWord.translation})</p>

              {/* Phonetic spelled structure */}
              <div className="bg-[#FFFBEB] p-4 rounded-2xl border-4 border-dashed border-[#FDE68A] mb-4 text-left">
                <h5 className="text-[10px] font-black text-[#B45309] mb-3 uppercase tracking-wider text-center">
                  🧩 Nhấp để nghe âm tiết đánh vần:
                </h5>
                <div className="flex justify-center gap-2">
                  {selectedWord.letters.map((letter, idx) => {
                    const cleanLetter = letter.replace(".mp3", "");
                    return (
                      <button
                        key={idx}
                        onClick={() => handleDetailedSpell(letter)}
                        className="px-3.5 py-2.5 bg-white hover:bg-[#FFFBEB] text-[#FF8A8A] font-black text-lg rounded-xl border-2 border-b-4 border-[#FDE68A] active:translate-y-0.5 transition-transform uppercase"
                        id={`btn-phonetic-spell-${idx}`}
                      >
                        {cleanLetter}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nhấp bên ngoài để đóng</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
