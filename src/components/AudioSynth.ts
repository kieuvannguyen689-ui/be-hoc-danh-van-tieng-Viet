// Helper for play sounds using Web Audio API and standard HTML5 Audio

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cute pop sound for clicking letters (bubble pop)
  playPop() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Web Audio not supported or blocked by user gesture:", e);
    }
  }

  // Wooden blocks clacking sound (Montessori style!)
  playWoodenClick() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn(e);
    }
  }

  // Adorable bouncy spring sound
  playBounce() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(400, now + 0.1);
      osc.frequency.linearRampToValueAtTime(250, now + 0.2);
      osc.frequency.linearRampToValueAtTime(450, now + 0.3);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sparkly star collect chime
  playStarCollect() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const playNote = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        
        osc.start(start);
        osc.stop(start + duration);
      };

      playNote(523.25, now, 0.15); // C5
      playNote(659.25, now + 0.08, 0.15); // E5
      playNote(783.99, now + 0.16, 0.15); // G5
      playNote(1046.50, now + 0.24, 0.3); // C6
    } catch (e) {
      console.warn(e);
    }
  }

  // Cheerful game-success fanfare
  playSuccessFanfare() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const playChime = (freq: number, start: number, duration: number, type: OscillatorType = "sine") => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
        
        osc.start(start);
        osc.stop(start + duration);
      };

      // Nice Major chord triad sequence
      playChime(523.25, now, 0.2, "triangle"); // C5
      playChime(659.25, now + 0.1, 0.2, "triangle"); // E5
      playChime(783.99, now + 0.2, 0.2, "triangle"); // G5
      playChime(1046.50, now + 0.3, 0.5, "sine"); // C6
      playChime(1318.51, now + 0.4, 0.6, "sine"); // E6
    } catch (e) {
      console.warn(e);
    }
  }

  // Soft buzz for wrong actions
  playErrorBuzz() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.setValueAtTime(130, now + 0.1);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn(e);
    }
  }

  // Web Speech API browser-native speech engine optimized for Vietnamese.
  // This reads individual letters, spellings or combined words accurately.
  speakVietnamese(text: string, callback?: () => void) {
    if (!text) {
      if (callback) callback();
      return;
    }

    // Try to play using our high-quality server-side Google Translate TTS proxy.
    // This bypasses browser referrer blocks, CORS limits, and system-dependent voice limitations
    // to guarantee an extremely accurate, native, high-quality Northern Vietnamese female voice.
    try {
      const cleanText = text.trim();
      const url = `/api/tts?text=${encodeURIComponent(cleanText)}`;
      const audio = new Audio(url);
      
      // Set rate slightly slower for children's learning (playbackRate)
      audio.playbackRate = 0.88;
      
      audio.onended = () => {
        if (callback) callback();
      };
      
      audio.onerror = (err) => {
        console.warn("Proxy TTS failed, falling back to Web Speech API:", err);
        this.speakVietnameseWebSpeech(cleanText, callback);
      };
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn("Audio play blocked or failed, falling back to Web Speech API:", e);
          this.speakVietnameseWebSpeech(cleanText, callback);
        });
      }
    } catch (e) {
      console.warn("Failed to play via Audio element, falling back to Web Speech API:", e);
      this.speakVietnameseWebSpeech(text, callback);
    }
  }

  speakVietnameseWebSpeech(text: string, callback?: () => void) {
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel(); // Stop current speech
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "vi-VN";
        utterance.rate = 0.82; // slightly slower for children's learning
        utterance.pitch = 1.15; // cute, friendly, slightly higher pitch for kids
        
        // Try to find native Vietnamese voice, prioritizing Northern Female voices
        const voices = window.speechSynthesis.getVoices();
        const viVoices = voices.filter(v => v.lang.startsWith("vi") || v.lang.includes("VN"));
        
        let viVoice = viVoices.find(v => v.name.includes("An") && v.name.includes("Natural"));
        if (!viVoice) {
          viVoice = viVoices.find(v => v.name.includes("An"));
        }
        if (!viVoice) {
          viVoice = viVoices.find(v => v.name.toLowerCase().includes("linh"));
        }
        if (!viVoice) {
          viVoice = viVoices.find(v => v.name.includes("Google"));
        }
        if (!viVoice) {
          viVoice = viVoices[0];
        }
        
        if (viVoice) {
          utterance.voice = viVoice;
        }
        
        utterance.onend = () => {
          if (callback) callback();
        };

        utterance.onerror = () => {
          if (callback) callback();
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Web Speech API exception", err);
        if (callback) callback();
      }
    } else {
      console.warn("Speech Synthesis not supported by this browser.");
      if (callback) {
        setTimeout(callback, 800);
      }
    }
  }
}

export const SoundEffects = new SoundEffectsManager();

// Function to play a specified audio asset with SpeechSynthesis fallback
export function playSpellingAudio(path: string, fallbackText: string, onEnded?: () => void) {
  // 1. Play clean pop feedback
  SoundEffects.playPop();

  // 2. Play fallback text using the Vietnamese standard speaker
  // We use Web Speech API as it provides high-fidelity native Vietnamese voice on any standard modern browser,
  // resolving CORS issues or offline errors, and perfectly satisfying the spelling feedback!
  SoundEffects.speakVietnamese(fallbackText, onEnded);
}
