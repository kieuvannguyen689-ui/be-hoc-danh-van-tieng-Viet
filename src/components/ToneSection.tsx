import React, { useState } from "react";
import { VIETNAMESE_TONES } from "../data";
import { ToneItem } from "../types";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Volume2, Waves } from "lucide-react";

interface ToneSectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
}

export default function ToneSection({ onBack, onEarnStar }: ToneSectionProps) {
  const [selectedVowel, setSelectedVowel] = useState<string>("a");
  const [playedTones, setPlayedTones] = useState<string[]>([]);

  const vowels = [
    { letter: "a", label: "A" },
    { letter: "o", label: "O" },
    { letter: "e", label: "E" },
    { letter: "u", label: "U" },
    { letter: "i", label: "I" }
  ];

  // Helper to construct the spelled vowel with the accent
  const applyTone = (vowel: string, accent: string) => {
    if (accent === "") return vowel;
    if (vowel === "a") {
      if (accent === "´") return "á";
      if (accent === "`") return "à";
      if (accent === "?") return "ả";
      if (accent === "~") return "ã";
      if (accent === ".") return "ạ";
    }
    if (vowel === "o") {
      if (accent === "´") return "ó";
      if (accent === "`") return "ò";
      if (accent === "?") return "ỏ";
      if (accent === "~") return "õ";
      if (accent === ".") return "ọ";
    }
    if (vowel === "e") {
      if (accent === "´") return "é";
      if (accent === "`") return "è";
      if (accent === "?") return "ẻ";
      if (accent === "~") return "ẽ";
      if (accent === ".") return "ẹ";
    }
    if (vowel === "u") {
      if (accent === "´") return "ú";
      if (accent === "`") return "ù";
      if (accent === "?") return "ủ";
      if (accent === "~") return "ũ";
      if (accent === ".") return "ụ";
    }
    if (vowel === "i") {
      if (accent === "´") return "í";
      if (accent === "`") return "ì";
      if (accent === "?") return "ỉ";
      if (accent === "~") return "ĩ";
      if (accent === ".") return "ị";
    }
    return vowel;
  };

  const handleToneClick = (item: ToneItem) => {
    const pronouncedWord = applyTone(selectedVowel, item.accent);
    playSpellingAudio("", pronouncedWord);

    // Dynamic wave feedback or click sound
    SoundEffects.playPop();

    const uniqueKey = `${selectedVowel}-${item.name}`;
    if (!playedTones.includes(uniqueKey)) {
      setPlayedTones([...playedTones, uniqueKey]);
      onEarnStar(1); // Give a star for trying a new tone combo!
      SoundEffects.playStarCollect();
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
            <Waves className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            6 Thanh Điệu Tiếng Việt
          </h2>
        </div>

        <div className="w-5"></div> {/* placeholder for layout symmetry */}
      </div>

      {/* Choose Vowel to practice */}
      <div className="bg-[#FFFBEB] p-5 rounded-2xl border-4 border-dashed border-[#FDE68A] mb-8">
        <h3 className="text-xs font-black text-[#B45309] mb-4 text-center uppercase tracking-wider">
          👉 1. Chọn nguyên âm để ghép dấu thanh:
        </h3>
        <div className="flex justify-center gap-4">
          {vowels.map((v) => (
            <button
              key={v.letter}
              onClick={() => {
                SoundEffects.playWoodenClick();
                setSelectedVowel(v.letter);
              }}
              className={`w-14 h-14 rounded-2xl font-display font-black text-2xl flex items-center justify-center transition-all cursor-pointer shadow-sm border-2 ${
                selectedVowel === v.letter
                  ? "bg-[#FF8A8A] text-white border-[#E57373] scale-110 shadow-[0_4px_0_#E57373]"
                  : "bg-white hover:bg-[#FFF7ED] text-[#4A3428] border-gray-200 shadow-[0_2px_0_rgba(0,0,0,0.05)]"
              }`}
              id={`vowel-selector-${v.letter}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {VIETNAMESE_TONES.map((item) => {
          const combinedWord = applyTone(selectedVowel, item.accent);
          const toneNameWithAccent = item.name;

          return (
            <motion.div
              key={item.name}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleToneClick(item)}
              className="bg-white rounded-3xl border-4 border-[#FDE68A] hover:bg-[#FFFDF5] p-5 transition-all cursor-pointer shadow-[0_4px_0_#FCD34D] text-center flex flex-col items-center justify-between min-h-[230px]"
              id={`tone-card-${item.name}`}
            >
              <div className="w-full flex justify-between items-center mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-black text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {toneNameWithAccent}
                </span>
                <span className="text-xs font-black font-mono text-[#8A7060]/70">
                  {item.accent ? `Dấu ${item.accent}` : "Không"}
                </span>
              </div>

              {/* Big combined vowel display with dynamic scale up of accent */}
              <div className="my-3">
                <span className="text-6xl font-black font-display text-[#4A3428] tracking-tight relative">
                  {combinedWord}
                  {item.accent && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl text-[#FF8A8A] font-black animate-pulse">
                      {item.accent}
                    </span>
                  )}
                </span>
              </div>

              {/* Guide how to read */}
              <div className="w-full bg-[#FFFBEB] py-2.5 px-3 rounded-2xl border-2 border-dashed border-[#FDE68A]">
                <p className="text-xs text-[#6B5140] font-bold leading-tight italic">
                  {item.description}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[#B45309]">
                  <Volume2 className="w-4 h-4 text-[#FF8A8A]" />
                  <span className="text-xs font-black uppercase font-display">
                    {combinedWord}
                  </span>
                </div>
              </div>

              {/* Small indicator if practiced */}
              <div className="mt-3 flex items-center justify-center gap-1 text-[11px] font-black text-gray-400">
                {playedTones.includes(`${selectedVowel}-${item.name}`) ? (
                  <span className="text-emerald-500 flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Đã luyện tập
                  </span>
                ) : (
                  <span className="opacity-60">Chưa chạm</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progressive rewards banner */}
      <div className="text-center p-4 bg-[#FEF3C7] rounded-2xl border-2 border-[#FDE68A]">
        <p className="text-sm text-[#B45309] font-black">
          🌟 Luyện đọc đủ các dấu thanh của các chữ khác nhau để thu thập thật nhiều sao vàng nhé!
        </p>
      </div>
    </div>
  );
}
