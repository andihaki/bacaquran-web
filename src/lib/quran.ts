import surahData from "../data/surahs.json";
import mushafData from "../data/madani-mushaf.json";

export type Surah = {
  id: number; nameSimple: string; nameArabic: string; versesCount: number;
  revelationPlace: "makkah" | "madinah"; bismillahPre: boolean; pages: [number, number];
};
export type MushafWord = { id: number; text: string; charType: "word" | "end"; surah: number; verse: number };
export type MushafLine = {
  lineNumber: number; lineType: "text" | "header" | "bismillah"; isCentered: boolean;
  surahNumber?: number; metadata: { chapterId: number }; words: MushafWord[];
};
export type MushafPage = { pageNumber: number; lines: MushafLine[] };

export const surahs = surahData as unknown as Surah[];
const mushafPages = mushafData as MushafPage[];

export function slugifySurah(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getSurahBySlug(slug: string) {
  return surahs.find((surah) => slugifySurah(surah.nameSimple) === slug.toLowerCase());
}

/** Returns complete physical pages; a page is never trimmed or reflowed. */
export function getMushafPagesForSurah(surah: Surah): MushafPage[] {
  return mushafPages
    .filter((page) => page.pageNumber >= surah.pages[0] && page.pageNumber <= surah.pages[1]);
}
