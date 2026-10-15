export type Surah = {
  number: number;
  name: string;
  transliteration: string;
  verses: number;
  revelation: "Makkah" | "Madinah";
};

export const surahs: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    transliteration: "Al-Fatihah",
    verses: 7,
    revelation: "Makkah",
  },
  {
    number: 2,
    name: "البقرة",
    transliteration: "Al-Baqarah",
    verses: 286,
    revelation: "Madinah",
  },
  {
    number: 3,
    name: "آل عمران",
    transliteration: "Ali Imran",
    verses: 200,
    revelation: "Madinah",
  },
  {
    number: 4,
    name: "النساء",
    transliteration: "An-Nisa",
    verses: 176,
    revelation: "Madinah",
  },
  {
    number: 5,
    name: "المائدة",
    transliteration: "Al-Ma’idah",
    verses: 120,
    revelation: "Madinah",
  },
];
