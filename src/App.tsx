import React, { useState, useEffect } from "react";
import { SoundEffects } from "./components/AudioSynth";
import LetterSection from "./components/LetterSection";
import ToneSection from "./components/ToneSection";
import SpellingSection from "./components/SpellingSection";
import VocabularySection from "./components/VocabularySection";
import GameSection from "./components/GameSection";
import StorySection from "./components/StorySection";
import { motion, AnimatePresence } from "motion/react";
import { Star, Trophy, Sparkles, BookOpen, Waves, Flame, Gamepad2, Compass, ShieldAlert, Heart, Quote } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [stars, setStars] = useState<number>(0);
  
  // State for server-side Gemini game recommendation
  const [recommendation, setRecommendation] = useState<{
    title: string;
    description: string;
    tips: string;
  } | null>(null);
  const [loadingRec, setLoadingRec] = useState<boolean>(false);

  // Initialize Stars count from localStorage to persist progress durably!
  useEffect(() => {
    const savedStars = localStorage.getItem("montessori_spelling_stars");
    if (savedStars) {
      setStars(parseInt(savedStars, 10));
    }
  }, []);

  // Fetch AI game recommendations based on star count
  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoadingRec(true);
      try {
        const response = await fetch("/api/gemini/recommend-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ starsCount: stars, currentProgress: stars > 15 ? "hard" : stars > 5 ? "medium" : "easy" })
        });
        const data = await response.json();
        if (data.success && data.recommendation) {
          setRecommendation(data.recommendation);
        }
      } catch (e) {
        console.error("Failed to fetch AI recommendation:", e);
      } finally {
        setLoadingRec(false);
      }
    };

    fetchRecommendation();
  }, [stars]);

  const earnStar = (count: number) => {
    const updated = stars + count;
    setStars(updated);
    localStorage.setItem("montessori_spelling_stars", updated.toString());
  };

  // Montessori Bento Cards configuration aligned with Geometric Balance palette
  const bentoModules = [
    {
      id: "letters",
      title: "Học Chữ Cái",
      tagline: "Bảng chữ cái",
      description: "Nhấn và tương tác trực quan với các nguyên âm hồng, phụ âm xanh chuẩn Montessori.",
      emoji: "🌸",
      color: "bg-[#FFEBEB] border-[#FF8A8A] hover:bg-[#FED7D7] text-rose-900 shadow-[0_6px_0_#FFAAAA]",
      icon: BookOpen
    },
    {
      id: "tones",
      title: "Học Dấu Thanh",
      tagline: "6 thanh âm điệu",
      description: "Thay đổi cao độ các nguyên âm thú vị kết hợp dấu Sắc, Huyền, Hỏi, Ngã, Nặng.",
      emoji: "🌊",
      color: "bg-[#FFFDF5] border-[#FDE68A] hover:bg-[#FFFbeb] text-amber-900 shadow-[0_6px_0_#FCD34D]",
      icon: Waves
    },
    {
      id: "spelling",
      title: "Học Ghép Vần",
      tagline: "Ghép vần 4 bước",
      description: "Đánh vần từng phụ âm, nguyên âm, hợp âm không dấu rồi hoàn thành tiếng hoàn chỉnh.",
      emoji: "🧩",
      color: "bg-[#E0F2FE] border-[#60A5FA] hover:bg-[#BAE6FD] text-blue-900 shadow-[0_6px_0_#93C5FD]",
      icon: Sparkles
    },
    {
      id: "vocabulary",
      title: "Từ Vựng Chủ Đề",
      tagline: "Gia đình, động vật",
      description: "Tích lũy vốn từ vựng phong phú qua các hình ảnh hoạt hình ngộ nghĩnh, gần gũi.",
      emoji: "🏡",
      color: "bg-[#E8F5E9] border-[#4ADE80] hover:bg-[#C8E6C9] text-emerald-900 shadow-[0_6px_0_#86EFAC]",
      icon: Compass
    },
    {
      id: "games",
      title: "Trò Chơi Vui",
      tagline: "Trải nghiệm kéo thả",
      description: "Đút chữ cái cho khủng long ăn, hoàn thành phép tính ghép vần để giải cứu bức tranh.",
      emoji: "🦖",
      color: "bg-[#F3E5F5] border-purple-400 hover:bg-[#E1BEE7] text-purple-900 shadow-[0_6px_0_#D8B4FE]",
      icon: Gamepad2
    },
    {
      id: "stories",
      title: "Truyện Đọc Thơ",
      tagline: "Kết nối AI sáng tạo",
      description: "Chạm từng từ để nghe phát âm, tô màu thông minh và trả lời trắc nghiệm hiểu biết.",
      emoji: "🪄",
      color: "bg-[#FFF9C4] border-yellow-400 hover:bg-[#FFF59D] text-yellow-900 shadow-[0_6px_0_#FDE047]",
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBEB] py-6 px-4 md:px-8 font-sans antialiased text-[#4A3428] selection:bg-amber-200 selection:text-amber-950">
      
      {/* Absolute top decorative shapes */}
      <div className="absolute top-10 left-10 text-[#FDE68A]/30 text-4xl select-none hidden md:block">★</div>
      <div className="absolute top-24 right-12 text-[#FF8A8A]/30 text-5xl select-none hidden md:block">●</div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        
        {/* Global Floating Kids Scoreboard (Geometric Balance Style) */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white border-b-4 border-[#FDE68A] px-6 py-4 rounded-3xl shadow-sm relative z-10">
          <div className="flex items-center gap-4">
            {/* Round brand mark with custom shadow */}
            <div className="w-12 h-12 bg-[#FF8A8A] rounded-2xl flex items-center justify-center shadow-[0_4px_0_#E57373] shrink-0">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-[#FF8A8A] tracking-tight">
                BÉ HỌC VẦN
              </h1>
              <p className="text-xs text-[#8A7060] font-bold leading-none mt-1">
                Đánh Vần Tiếng Việt Montessori • An toàn & Trực quan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#FEF3C7] px-4 py-2 rounded-full border-2 border-[#FDE68A]">
              <span className="text-xs font-black text-[#B45309]">Cấp độ: Mầm non</span>
            </div>

            {/* Kids Star Progress Counter */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-b-4 border-gray-200 shadow-sm">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 bg-[#60A5FA] rounded-full border border-white flex items-center justify-center text-white font-bold text-xs">★</div>
                <div className="w-6 h-6 bg-[#FACC15] rounded-full border border-white flex items-center justify-center text-white font-bold text-xs">★</div>
                <div className="w-6 h-6 bg-[#4ADE80] rounded-full border border-white flex items-center justify-center text-white font-bold text-xs">★</div>
              </div>
              <span className="font-black text-xl text-[#D97706] ml-1">{stars}</span>
            </div>
          </div>
        </header>

        {/* Section Router Render */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key="dashboard"
              >
                {/* Welcome Banner - Geometric Balance Soft yellow container */}
                <div className="bg-[#FEF3C7] border-4 border-[#FDE68A] text-[#4A3428] p-6 rounded-[32px] mb-8 shadow-sm relative overflow-hidden">
                  {/* Decorative geometric dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#B45309] border border-[#FDE68A]">
                        CHÀO MỪNG BÉ YÊU! 🌸
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black font-display text-[#4A3428] mt-3 tracking-tight">
                        Cùng bé tập đánh vần tiếng Việt chuẩn nhé!
                      </h2>
                      <p className="text-[#6B5140] text-sm mt-2 max-w-2xl font-bold leading-relaxed">
                        Học tập theo phương pháp Montessori tự do khám phá: chạm âm tiết rõ ràng, ghép vần qua 4 bước chuẩn xác và chơi trò chơi lý thú không chứa quảng cáo.
                      </p>
                    </div>
                    <div className="text-6xl animate-pulse select-none hidden lg:block shrink-0">🦕🍎</div>
                  </div>
                </div>

                {/* Main Modules Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {bentoModules.map((module) => {
                    const IconComp = module.icon;
                    return (
                      <motion.div
                        key={module.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          SoundEffects.playBounce();
                          setActiveSection(module.id);
                        }}
                        className={`p-6 rounded-[28px] border-4 flex flex-col justify-between min-h-[230px] transition-all cursor-pointer ${module.color}`}
                        id={`bento-card-${module.id}`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-4xl select-none">{module.emoji}</span>
                            <div className="p-2.5 bg-white/70 rounded-2xl border border-white">
                              <IconComp className="w-5 h-5 text-inherit" />
                            </div>
                          </div>
                          
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-80 block mb-1">
                            {module.tagline}
                          </span>
                          <h3 className="text-2xl font-black font-display mb-2 tracking-tight">
                            {module.title}
                          </h3>
                          <p className="text-xs opacity-90 font-bold leading-relaxed">
                            {module.description}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                          <span>Bắt đầu học</span>
                          <span className="text-lg">➔</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* AI / Parents Montessori Corner (Geometric Balance Solid container) */}
                <div className="bg-white p-6 rounded-[32px] border-4 border-[#FDE68A] shadow-sm relative overflow-hidden mb-4">
                  <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-5 h-5 text-[#FF8A8A] fill-[#FF8A8A]" />
                      </div>

                      <h3 className="text-xl font-black font-display text-[#4A3428] mb-2 leading-tight">
                        Lời khuyên giáo dục & Trò chơi phù hợp độ tuổi
                      </h3>

                      {loadingRec ? (
                        <div className="space-y-2 mt-4">
                          <div className="h-5 bg-[#FFFBEB] animate-pulse rounded w-1/3"></div>
                          <div className="h-4 bg-[#FFFBEB] animate-pulse rounded"></div>
                          <div className="h-4 bg-[#FFFBEB] animate-pulse rounded w-3/4"></div>
                        </div>
                      ) : recommendation ? (
                        <div className="mt-4 space-y-4">
                          <div className="bg-[#FFFBEB] p-4 rounded-2xl border-2 border-[#FDE68A]">
                            <span className="text-xs font-black uppercase text-[#B45309] tracking-wider">Đề xuất bài tập:</span>
                            <h5 className="text-base font-black text-[#4A3428] mt-1">{recommendation.title}</h5>
                            <p className="text-xs text-[#6B5140] mt-1 leading-relaxed font-bold">{recommendation.description}</p>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-[#B45309] bg-[#FEF3C7] p-3 rounded-xl border border-[#FDE68A]">
                            <Quote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span className="font-bold italic"><strong>Lời khuyên dành cho cha mẹ:</strong> {recommendation.tips}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-[#6B5140] mt-1 leading-relaxed font-bold">
                          Nhấn chuông học tập và tích thêm sao vàng để Gemini đề xuất phương pháp Montessori cá nhân hóa phù hợp với lộ trình thông minh của bé yêu.
                        </p>
                      )}
                    </div>

                    {/* Badge */}
                    <div className="shrink-0 bg-[#FEF3C7] border-2 border-[#FDE68A] text-[#4A3428] px-4 py-4 rounded-3xl flex flex-col items-center justify-center text-center max-w-[160px] shadow-sm">
                      <span className="text-3xl mb-1">👩‍🏫</span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">Montessori</span>
                      <span className="text-xs font-bold mt-1 text-[#6B5140] leading-tight">Lời khuyên của Giáo Viên</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {activeSection === "letters" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="letters"
              >
                <LetterSection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                />
              </motion.div>
            )}

            {activeSection === "tones" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="tones"
              >
                <ToneSection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                />
              </motion.div>
            )}

            {activeSection === "spelling" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="spelling"
              >
                <SpellingSection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                />
              </motion.div>
            )}

            {activeSection === "vocabulary" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="vocabulary"
              >
                <VocabularySection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                />
              </motion.div>
            )}

            {activeSection === "games" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="games"
              >
                <GameSection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                  starsCount={stars}
                />
              </motion.div>
            )}

            {activeSection === "stories" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key="stories"
              >
                <StorySection
                  onBack={() => setActiveSection("dashboard")}
                  onEarnStar={earnStar}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Outer Minimalist footer */}
        <footer className="text-center mt-12 mb-4 text-xs font-bold text-[#7D6B58] opacity-60">
          <p>© 2026 Đánh Vần Montessori • Học tập an toàn cho trẻ thơ</p>
        </footer>

      </div>
    </div>
  );
}
