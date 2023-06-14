import { getReelsNewer } from "$lib/server/db";

export const load = async ({ url }) => {
  let id = url.searchParams.get("id") ?? "";
  let text = url.searchParams.get("text") ?? "";
  let collectorId = url.searchParams.get("collectorId") ?? "";
  let page = Number(url.searchParams.get("page") ?? 1);

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1;
  }

  let result = await getReelsNewer(page, text, id);
  return {
    jsons: result.jsons,
    page: page ?? 1,
    hits: result.hits,
  };
};
