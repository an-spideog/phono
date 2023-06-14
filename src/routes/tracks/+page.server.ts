import { getTrackCount, getTracks, getTracksNew } from "$lib/server/db";
import type { ElementCompact } from "xml-js";

export const load = async ({ url }) => {
  let id = url.searchParams.get("id") ?? "";
  let text = url.searchParams.get("text") ?? "";
  let page = Number(url.searchParams.get("page") ?? 1);

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1;
  }

  console.log("Page: " + page);
  let result = await getTracksNew(page, text, id);
  console.log(result.jsons);
  return {
    jsons: result.jsons,
    page: page ?? 1,
    hits: result.hits,
  };
};
