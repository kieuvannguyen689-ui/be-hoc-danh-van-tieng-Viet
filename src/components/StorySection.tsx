import React, { useState, useEffect } from "react";
import { SoundEffects, playSpellingAudio } from "./AudioSynth";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, Volume2, Sparkles, Wand2, Star, CheckCircle2, AlertTriangle } from "lucide-react";
import { Story } from "../types";

interface StorySectionProps {
  onBack: () => void;
  onEarnStar: (count: number) => void;
}

export default function StorySection({ onBack, onEarnStar }: StorySectionProps) {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [loadingStory, setLoadingStory] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Predefined stories list
  const sampleStories = [
    {
      title: "Bé và Quả Cam 🍊",
      storyLines: [
        { text: "Mẹ cho bé quả cam chín.", words: ["mẹ", "cho", "bé", "quả", "cam", "chín"] },
        { text: "Quả cam ngọt có màu cam.", words: ["quả", "cam", "ngọt", "có", "màu", "cam"] },
        { text: "Bé chia quả cam cho bà.", words: ["bé", "chia", "quả", "cam", "cho", "bà"] }
      ],
      question: {
        text: "Quả cam ngọt có màu gì?",
        options: ["Màu đỏ", "Màu cam", "Màu vàng"],
        answer: "Màu cam"
      }
    },
    {
      title: "Chú Gà Trống Gáy 🐔",
      storyLines: [
        { text: "Chú gà trống dậy sớm gáy vang.", words: ["chú", "gà", "trống", "dậy", "sớm", "gáy", "vang"] },
        { text: "Ò ó o o reo vui!", words: ["ò", "ó", "o", "o", "reo", "vui"] },
        { text: "Bé nghe tiếng gà liền thức dậy.", words: ["bé", "nghe", "tiếng", "gà", "liền", "thức", "dậy"] }
      ],
      question: {
        text: "Chú gà trống gáy reo vui thế nào?",
        options: ["Ò ó o o", "Cục tác", "Cạp cạp"],
        answer: "Ò ó o o"
      }
    }
  ];

  useEffect(() => {
    // Select the first story by default
    setActiveStory(sampleStories[0]);
  }, []);

  const handleWordClick = (word: string) => {
    // strip punctuation for pronunciation
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase();
    setSelectedWord(word);
    playSpellingAudio("", cleanWord);
  };

  const handleGenerateAIStory = async () => {
    SoundEffects.playBounce();
    setLoadingStory(true);
    setQuizAnswered(false);
    setQuizCorrect(null);
    setSelectedOption(null);
    setSelectedWord(null);

    try {
      const response = await fetch("/api/gemini/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          words: ["bé", "mèo", "bố", "cá", "mẹ", "ông", "gà", "nho"],
          level: "mầm non"
        })
      });
      const data = await response.json();
      if (data.success && data.story) {
        setActiveStory(data.story);
        SoundEffects.playStarCollect();
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setActiveStory(sampleStories[Math.floor(Math.random() * sampleStories.length)]);
    } finally {
      setLoadingStory(false);
    }
  };

  const handleAnswerQuiz = (option: string) => {
    if (quizAnswered || !activeStory) return;

    setSelectedOption(option);
    setQuizAnswered(true);

    if (option === activeStory.question.answer) {
      setQuizCorrect(true);
      onEarnStar(5); // Reward 5 stars for correct answer!
      SoundEffects.playSuccessFanfare();
    } else {
      setQuizCorrect(false);
      SoundEffects.playErrorBuzz();
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
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
            Truyện Đọc Đánh Vần
          </h2>
        </div>

        {/* AI generator triggers */}
        <button
          onClick={handleGenerateAIStory}
          disabled={loadingStory}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#FF8A8A] hover:bg-[#E57373] disabled:bg-gray-200 disabled:text-gray-400 text-white font-black rounded-full transition-all border-b-4 border-[#E57373] active:scale-95 text-xs tracking-wider uppercase cursor-pointer"
          id="btn-generate-ai-story"
        >
          <Wand2 className="w-4 h-4" />
          <span>{loadingStory ? "Đang viết..." : "Tự viết truyện (AI)"}</span>
        </button>
      </div>

      {/* Montessori Guide */}
      <div className="mb-6 bg-[#FFFBEB] p-4 rounded-2xl border-2 border-dashed border-[#FDE68A] text-center text-xs text-amber-950 font-black uppercase tracking-wide leading-relaxed">
        💡 <strong className="text-[#FF8A8A]">Học tương tác:</strong> Chạm vào <strong className="text-amber-700 underline font-display">từng chữ</strong> trong câu chuyện để nghe cô giáo phát âm chuẩn nhé!
      </div>

      {/* Main story panel */}
      {activeStory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Storyboard Card */}
          <div className="lg:col-span-7 bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#FDE68A_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none"></div>

            {loadingStory ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
                <div className="text-6xl animate-spin mb-4">🪄</div>
                <h4 className="text-xl font-black text-amber-950 font-display uppercase tracking-wide">Đang sáng tác thơ...</h4>
                <p className="text-xs text-gray-400 mt-2 max-w-xs font-bold leading-relaxed">
                  Gemini đang kết hợp các chữ cái bé đã thuộc để sáng tạo một câu chuyện mầm non dễ thương!
                </p>
              </div>
            ) : (
              <div className="relative z-10 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-[#FF8A8A] font-display border-b-4 border-dashed border-[#FDE68A] pb-3 text-center uppercase tracking-wide">
                    {activeStory.title}
                  </h3>

                  {/* Story lines */}
                  <div className="mt-6 flex flex-col gap-5 items-center">
                    {activeStory.storyLines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex flex-wrap justify-center gap-1.5 py-1">
                        {line.words.map((word, wordIdx) => {
                          const isHighlighted = selectedWord === word;
                          return (
                            <motion.button
                              key={wordIdx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleWordClick(word)}
                              className={`px-3.5 py-2 rounded-xl font-black text-lg md:text-xl font-display tracking-wide transition-all border-2 border-b-4 active:translate-y-0.5 shadow-sm cursor-pointer ${
                                isHighlighted
                                  ? "bg-[#FF8A8A] border-[#E57373] text-white scale-105"
                                  : "bg-white border-[#FDE68A] hover:bg-[#FFFBEB] text-[#4A3428]"
                              }`}
                              id={`word-button-${word}`}
                            >
                              {word}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speaker voice illustration info */}
                <div className="flex items-center justify-center gap-2 mt-6 py-2 bg-[#FFFBEB] rounded-2xl text-[#B45309] text-xs font-black uppercase tracking-wider border border-[#FDE68A]">
                  <Volume2 className="w-5 h-5 text-[#FF8A8A]" />
                  <span>Chạm vào chữ để cô giáo phát âm chuẩn nhé!</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Quiz Frame */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                <h4 className="text-xs font-black text-[#B45309] uppercase tracking-wider">
                  Trắc nghiệm thông minh
                </h4>
              </div>

              {loadingStory ? (
                <div className="space-y-3 mt-6">
                  <div className="h-6 bg-gray-100 animate-pulse rounded-md w-3/4"></div>
                  <div className="h-10 bg-gray-50 animate-pulse rounded-md"></div>
                  <div className="h-10 bg-gray-50 animate-pulse rounded-md"></div>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-base font-black text-[#4A3428] mb-4">
                    ❓ {activeStory.question.text}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {activeStory.question.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      let optionStyle = "bg-white border-[#FDE68A] text-[#4A3428] hover:bg-[#FFFBEB]";
                      
                      if (quizAnswered) {
                        if (option === activeStory.question.answer) {
                          optionStyle = "bg-[#4ADE80] border-[#22C55E] text-white";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-500 border-rose-600 text-white";
                        } else {
                          optionStyle = "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed border-b-2";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswered}
                          onClick={() => handleAnswerQuiz(option)}
                          className={`w-full text-left py-3.5 px-4 rounded-xl font-black text-xs border-2 border-b-4 shadow-sm cursor-pointer transition-all uppercase tracking-wider ${optionStyle}`}
                          id={`quiz-option-${idx}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Result banner */}
            <AnimatePresence>
              {quizAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-2xl flex items-center gap-2 border-2 ${
                    quizCorrect
                      ? "bg-green-50 border-green-200 text-green-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  {quizCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <div className="text-xs font-bold leading-normal">
                        <strong className="block text-sm font-black uppercase text-green-700 mb-0.5">Tuyệt vời ông mặt trời!</strong>
                        Nhận thưởng <strong className="text-green-800 font-extrabold">+5 Sao Vàng</strong>. Bé có trí nhớ cực kì siêu phàm đó!
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                      <div className="text-xs font-bold leading-normal">
                        <strong className="block text-sm font-black uppercase text-rose-700 mb-0.5">Tiếc quá chưa đúng rồi!</strong>
                        Đừng nản lòng nhé! Chạm vào các từ khóa trong bài thơ để học thêm từ mới nhé!
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}
    </div>
  );
}
