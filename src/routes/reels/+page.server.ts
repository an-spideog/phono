import { getReelCount, getReels } from "$lib/server/db";
import type { ElementCompact } from "xml-js";

export const load = async ({ url }) => {
  let id = url.searchParams.get("id") ?? undefined;
  let text = url.searchParams.get("text") ?? undefined;
  let collectorId = url.searchParams.get("collectorId") ?? undefined;
  let count = await getReelCount(text, id);
  let page = Number(url.searchParams.get("page") ?? 1);

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1;
  }
  if (page > Math.ceil(count / 10)) {
    page = Math.ceil(count / 10);
  }

  console.log("Page: " + page);
  let jsons: ElementCompact[] = await getReels(page, id, text, collectorId);
  console.log(jsons[0].spool.collectors);
  return {
    reelsJson: jsons ?? [],
    page: page ?? 1,
    reelCount: count,
  };
};
