import { getTracks } from "$lib/server/db"
import { MAX_PER_PAGE } from "$lib/server/db"

export const load = async ({ url }) => {
  let id = url.searchParams.get("id") ?? ""
  let text = url.searchParams.get("text") ?? ""
  let collectorId = url.searchParams.get("collectorId") ?? ""
  let speakerId = url.searchParams.get("speakerId") ?? ""
  let placeId = url.searchParams.get("placeId") ?? ""
  let nickname = url.searchParams.get("nickname") ?? ""
  let reelId = url.searchParams.get("reelId") ?? ""
  let page = Number(url.searchParams.get("page") ?? 1)

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1
  }

  console.log("Page: " + page)
  let result = await getTracks(
    page,
    text,
    id,
    collectorId,
    speakerId,
    placeId,
    nickname,
    reelId
  )
  console.log(result.jsons)
  let maxNumberOfPages = Math.ceil(result.hits / MAX_PER_PAGE)
  return {
    jsons: result.jsons,
    page: page ?? 1,
    hits: result.hits,
    maxNumberOfPages: maxNumberOfPages,
  }
}
