import { error } from "@sveltejs/kit";
import { getMushafPagesForSurah, getSurahBySlug } from "$lib/quran";

export function load({ params }) {
  const surah = getSurahBySlug(params.surah_name);
  if (!surah) error(404, "Surah not found");
  return { surah, pages: getMushafPagesForSurah(surah) };
}
