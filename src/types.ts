export interface LetterItem {
  letter: string;
  uppercase: string;
  name: string; // e.g. "a", "ă", "â", "bờ", "cờ"...
  wordExample: string; // e.g. "con cá", "mắt", "cây"...
  imageName: string; // descriptive icon name
  color: string; // custom Montessori pastel color coding
  vowelType: "vowel" | "consonant"; // red for vowels, blue for consonants (Montessori style!)
}

export interface ToneItem {
  name: string; // "Không dấu", "Sắc", "Huyền", "Hỏi", "Ngã", "Nặng"
  symbol: string; // "a", "á", "à", "ả", "ã", "ạ"
  accent: string; // "", "´", "`", "?", "~", "."
  example: string; // "ba", "bá", "bà", "bả", "bã", "bạ"
  color: string;
  description: string;
}

export interface VocabularyWord {
  word: string;
  image: string; // icon descriptive string or custom SVG key
  audio: string; // e.g. "be.mp3"
  letters: string[]; // e.g. ["b.mp3", "e.mp3"]
  syllable: string; // e.g. "be.mp3"
  translation: string; // e.g. "Em bé" (friendly label)
  category: "Gia đình" | "Động vật" | "Trái cây" | "Rau củ" | "Màu sắc" | "Đồ vật" | "Trường học" | "Thiên nhiên";
}

export interface Story {
  title: string;
  storyLines: {
    text: string;
    words: string[];
  }[];
  question: {
    text: string;
    options: string[];
    answer: string;
  };
}

export interface ChildProgress {
  stars: number;
  unlockedWords: string[];
  completedLetters: string[];
  currentSection: string; // e.g. "dashboard", "letters", "tones", "spelling", "vocabulary", "games", "stories"
}
