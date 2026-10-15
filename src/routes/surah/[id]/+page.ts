import { error } from "@sveltejs/kit";
import { surahs } from "$lib/quran";

export function load({ params }) {
  const surah = surahs.find((item) => item.number === Number(params.id));
  if (!surah) error(404, "Surah not found");
  return { surah };
}
