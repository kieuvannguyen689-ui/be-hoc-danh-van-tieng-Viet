import { LetterItem, ToneItem, VocabularyWord } from "./types";

export const VIETNAMESE_LETTERS: LetterItem[] = [
  // Vowels (Red/Pink in Montessori)
  { letter: "a", uppercase: "A", name: "a", wordExample: "con cá", imageName: "fish", color: "#FEE2E2", vowelType: "vowel" },
  { letter: "ă", uppercase: "Ă", name: "ă", wordExample: "mắt kính", imageName: "glasses", color: "#FEE2E2", vowelType: "vowel" },
  { letter: "â", uppercase: "Â", name: "â", wordExample: "quả mận", imageName: "fruit", color: "#FEE2E2", vowelType: "vowel" },
  { letter: "e", uppercase: "E", name: "e", wordExample: "em bé", imageName: "baby", color: "#FFDEE2", vowelType: "vowel" },
  { letter: "ê", uppercase: "Ê", name: "ê", wordExample: "quả khế", imageName: "starfruit", color: "#FFDEE2", vowelType: "vowel" },
  { letter: "i", uppercase: "I", name: "i", wordExample: "viên bi", imageName: "marble", color: "#FFE4E6", vowelType: "vowel" },
  { letter: "o", uppercase: "O", name: "o", wordExample: "quả cọ", imageName: "palm", color: "#FFE4E6", vowelType: "vowel" },
  { letter: "ô", uppercase: "Ô", name: "ô", wordExample: "cái ô", imageName: "umbrella", color: "#FFD3D3", vowelType: "vowel" },
  { letter: "ơ", uppercase: "Ơ", name: "ơ", wordExample: "lá cờ", imageName: "flag", color: "#FFD3D3", vowelType: "vowel" },
  { letter: "u", uppercase: "U", name: "u", wordExample: "quả đu đủ", imageName: "papaya", color: "#FFE4E6", vowelType: "vowel" },
  { letter: "ư", uppercase: "Ư", name: "ư", wordExample: "sư tử", imageName: "lion", color: "#FFE4E6", vowelType: "vowel" },
  { letter: "y", uppercase: "Y", name: "y", wordExample: "cái yếm", imageName: "bib", color: "#FEE2E2", vowelType: "vowel" },

  // Consonants (Blue/Indigo in Montessori)
  { letter: "b", uppercase: "B", name: "bờ", wordExample: "búp bê", imageName: "doll", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "c", uppercase: "C", name: "cờ", wordExample: "con cua", imageName: "crab", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "d", uppercase: "D", name: "dờ", wordExample: "quả dừa", imageName: "coconut", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "đ", uppercase: "Đ", name: "đờ", wordExample: "đèn lồng", imageName: "lantern", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "g", uppercase: "G", name: "gờ", wordExample: "con gà", imageName: "chicken", color: "#DBEAFE", vowelType: "consonant" },
  { letter: "h", uppercase: "H", name: "hờ", wordExample: "hoa hồng", imageName: "rose", color: "#DBEAFE", vowelType: "consonant" },
  { letter: "k", uppercase: "K", name: "kờ", wordExample: "cái kéo", imageName: "scissors", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "l", uppercase: "L", name: "lờ", wordExample: "quả lê", imageName: "pear", color: "#DDBEFE", vowelType: "consonant" },
  { letter: "m", uppercase: "M", name: "mờ", wordExample: "mèo con", imageName: "cat", color: "#DDBEFE", vowelType: "consonant" },
  { letter: "n", uppercase: "N", name: "nờ", wordExample: "quả na", imageName: "custard_apple", color: "#DBEAFE", vowelType: "consonant" },
  { letter: "p", uppercase: "P", name: "pờ", wordExample: "đèn pin", imageName: "flashlight", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "q", uppercase: "Q", name: "quờ", wordExample: "quả quýt", imageName: "tangerine", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "r", uppercase: "R", name: "rờ", wordExample: "con rùa", imageName: "turtle", color: "#DBEAFE", vowelType: "consonant" },
  { letter: "s", uppercase: "S", name: "sờ", wordExample: "ngôi sao", imageName: "star", color: "#DBEAFE", vowelType: "consonant" },
  { letter: "t", uppercase: "T", name: "tờ", wordExample: "quả táo", imageName: "apple", color: "#E0F2FE", vowelType: "consonant" },
  { letter: "v", uppercase: "V", name: "vờ", wordExample: "vịt con", imageName: "duck", color: "#DDBEFE", vowelType: "consonant" },
  { letter: "x", uppercase: "X", name: "xờ", wordExample: "xe buýt", imageName: "bus", color: "#E0F2FE", vowelType: "consonant" }
];

export const VIETNAMESE_TONES: ToneItem[] = [
  { name: "Không dấu", symbol: "a", accent: "", example: "ba", color: "#E2E8F0", description: "Cao độ phẳng, đều đặn" },
  { name: "Dấu Sắc", symbol: "á", accent: "´", example: "bá", color: "#FEE2E2", description: "Lên giọng nhanh" },
  { name: "Dấu Huyền", symbol: "à", accent: "`", example: "bà", color: "#E0F2FE", description: "Xuống giọng nhẹ nhàng" },
  { name: "Dấu Hỏi", symbol: "ả", accent: "?", example: "bả", color: "#FEF3C7", description: "Hơi xuống giọng rồi nhấc cao lên" },
  { name: "Dấu Ngã", symbol: "ã", accent: "~", color: "#E0F2FE", example: "bã", description: "Lên cao đột ngột rồi dốc giọng" },
  { name: "Dấu Nặng", symbol: "ạ", accent: ".", color: "#F1F5F9", example: "bạ", description: "Nấc giọng thật thấp và ngắt âm" }
];

export const VOCABULARY_LIST: VocabularyWord[] = [
  // Gia đình
  {
    word: "ba",
    image: "father",
    audio: "/audio/vocab/ba.mp3",
    letters: ["b.mp3", "a.mp3"],
    syllable: "ba.mp3",
    translation: "Ba",
    category: "Gia đình"
  },
  {
    word: "bố",
    image: "father",
    audio: "/audio/vocab/bo.mp3",
    letters: ["b.mp3", "o.mp3", "sac.mp3"],
    syllable: "bo.mp3",
    translation: "Bố",
    category: "Gia đình"
  },
  {
    word: "mẹ",
    image: "mother",
    audio: "/audio/vocab/me.mp3",
    letters: ["m.mp3", "e.mp3", "nang.mp3"],
    syllable: "me.mp3",
    translation: "Mẹ",
    category: "Gia đình"
  },
  {
    word: "bà",
    image: "grandmother",
    audio: "/audio/vocab/ba_huyen.mp3",
    letters: ["b.mp3", "a.mp3", "huyen.mp3"],
    syllable: "ba.mp3",
    translation: "Bà nội / bà ngoại",
    category: "Gia đình"
  },
  {
    word: "ông",
    image: "grandfather",
    audio: "/audio/vocab/ong.mp3",
    letters: ["o.mp3", "ng.mp3"],
    syllable: "ong.mp3",
    translation: "Ông nội / ông ngoại",
    category: "Gia đình"
  },
  {
    word: "bé",
    image: "baby",
    audio: "/audio/vocab/be.mp3",
    letters: ["b.mp3", "e.mp3", "sac.mp3"],
    syllable: "be.mp3",
    translation: "Em bé nhỏ",
    category: "Gia đình"
  },

  // Động vật
  {
    word: "cá",
    image: "fish",
    audio: "/audio/vocab/ca.mp3",
    letters: ["c.mp3", "a.mp3", "sac.mp3"],
    syllable: "ca.mp3",
    translation: "Con cá vàng bơi",
    category: "Động vật"
  },
  {
    word: "gà",
    image: "chicken",
    audio: "/audio/vocab/ga.mp3",
    letters: ["g.mp3", "a.mp3", "huyen.mp3"],
    syllable: "ga.mp3",
    translation: "Chú gà trống gáy",
    category: "Động vật"
  },
  {
    word: "mèo",
    image: "cat",
    audio: "/audio/vocab/meo.mp3",
    letters: ["m.mp3", "e.mp3", "o.mp3", "huyen.mp3"],
    syllable: "meo.mp3",
    translation: "Mèo con kêu meo meo",
    category: "Động vật"
  },
  {
    word: "bò",
    image: "cow",
    audio: "/audio/vocab/bo_cow.mp3",
    letters: ["b.mp3", "o.mp3", "huyen.mp3"],
    syllable: "bo.mp3",
    translation: "Con bò ăn cỏ",
    category: "Động vật"
  },
  {
    word: "vịt",
    image: "duck",
    audio: "/audio/vocab/vit.mp3",
    letters: ["v.mp3", "i.mp3", "t.mp3", "nang.mp3"],
    syllable: "vit.mp3",
    translation: "Con vịt kêu cạp cạp",
    category: "Động vật"
  },

  // Trái cây
  {
    word: "cam",
    image: "orange",
    audio: "/audio/vocab/cam.mp3",
    letters: ["c.mp3", "a.mp3", "m.mp3"],
    syllable: "cam.mp3",
    translation: "Quả cam mọng nước",
    category: "Trái cây"
  },
  {
    word: "bơ",
    image: "avocado",
    audio: "/audio/vocab/bo_fruit.mp3",
    letters: ["b.mp3", "ơ.mp3"],
    syllable: "bơ.mp3",
    translation: "Quả bơ béo ngậy",
    category: "Trái cây"
  },
  {
    word: "nho",
    image: "grape",
    audio: "/audio/vocab/nho.mp3",
    letters: ["n.mp3", "h.mp3", "o.mp3"],
    syllable: "nho.mp3",
    translation: "Chùm nho tím ngọt",
    category: "Trái cây"
  },
  {
    word: "mơ",
    image: "apricot",
    audio: "/audio/vocab/mo.mp3",
    letters: ["m.mp3", "ơ.mp3"],
    syllable: "mơ.mp3",
    translation: "Quả mơ chín vàng",
    category: "Trái cây"
  },

  // Rau củ
  {
    word: "bí",
    image: "pumpkin",
    audio: "/audio/vocab/bi.mp3",
    letters: ["b.mp3", "i.mp3", "sac.mp3"],
    syllable: "bi.mp3",
    translation: "Quả bí ngô",
    category: "Rau củ"
  },
  {
    word: "hẹ",
    image: "chives",
    audio: "/audio/vocab/he.mp3",
    letters: ["h.mp3", "e.mp3", "nang.mp3"],
    syllable: "he.mp3",
    translation: "Cọng lá hẹ xanh",
    category: "Rau củ"
  },
  {
    word: "củ",
    image: "tuber",
    audio: "/audio/vocab/cu.mp3",
    letters: ["c.mp3", "u.mp3", "hoi.mp3"],
    syllable: "cu.mp3",
    translation: "Củ cải trắng",
    category: "Rau củ"
  },

  // Màu sắc
  {
    word: "đỏ",
    image: "red",
    audio: "/audio/vocab/do.mp3",
    letters: ["đ.mp3", "o.mp3", "hoi.mp3"],
    syllable: "đo.mp3",
    translation: "Màu đỏ rực rỡ",
    category: "Màu sắc"
  },
  {
    word: "vàng",
    image: "yellow",
    audio: "/audio/vocab/vang.mp3",
    letters: ["v.mp3", "a.mp3", "ng.mp3", "huyen.mp3"],
    syllable: "vang.mp3",
    translation: "Màu vàng nắng ấm",
    category: "Màu sắc"
  },
  {
    word: "lục",
    image: "green",
    audio: "/audio/vocab/luc.mp3",
    letters: ["l.mp3", "u.mp3", "c.mp3", "nang.mp3"],
    syllable: "luc.mp3",
    translation: "Màu xanh lá cây",
    category: "Màu sắc"
  },

  // Đồ vật
  {
    word: "ghế",
    image: "chair",
    audio: "/audio/vocab/ghe.mp3",
    letters: ["g.mp3", "h.mp3", "ê.mp3", "sac.mp3"],
    syllable: "ghe.mp3",
    translation: "Cái ghế ngồi học",
    category: "Đồ vật"
  },
  {
    word: "bàn",
    image: "table",
    audio: "/audio/vocab/ban.mp3",
    letters: ["b.mp3", "a.mp3", "n.mp3", "huyen.mp3"],
    syllable: "ban.mp3",
    translation: "Cái bàn gỗ",
    category: "Đồ vật"
  },

  // Trường học
  {
    word: "vở",
    image: "notebook",
    audio: "/audio/vocab/vo.mp3",
    letters: ["v.mp3", "ơ.mp3", "hoi.mp3"],
    syllable: "vơ.mp3",
    translation: "Quyển vở vẽ tranh",
    category: "Trường học"
  },
  {
    word: "bút",
    image: "pen",
    audio: "/audio/vocab/but.mp3",
    letters: ["b.mp3", "u.mp3", "t.mp3", "sac.mp3"],
    syllable: "but.mp3",
    translation: "Cái bút sáp màu",
    category: "Trường học"
  },

  // Thiên nhiên
  {
    word: "lá",
    image: "leaf",
    audio: "/audio/vocab/la.mp3",
    letters: ["l.mp3", "a.mp3", "sac.mp3"],
    syllable: "la.mp3",
    translation: "Chiếc lá xanh tươi",
    category: "Thiên nhiên"
  },
  {
    word: "hồ",
    image: "lake",
    audio: "/audio/vocab/ho.mp3",
    letters: ["h.mp3", "ô.mp3", "huyen.mp3"],
    syllable: "ho.mp3",
    translation: "Hồ nước trong veo",
    category: "Thiên nhiên"
  },
  {
    word: "mây",
    image: "cloud",
    audio: "/audio/vocab/may.mp3",
    letters: ["m.mp3", "â.mp3", "y.mp3"],
    syllable: "mây.mp3",
    translation: "Đám mây trắng bồng bềnh",
    category: "Thiên nhiên"
  }
];
