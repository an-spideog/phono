import {
  getTracks,
  getTracksWithoutSound,
  validateSession,
} from "$lib/server/db"

export const load = async ({ url, cookies }) => {
  let id = url.searchParams.get("id") ?? ""
  let text = url.searchParams.get("text") ?? ""
  let collectorId = url.searchParams.get("collectorId") ?? ""
  let speakerId = url.searchParams.get("speakerId") ?? ""
  let placeId = url.searchParams.get("placeId") ?? ""
  let nickname = url.searchParams.get("nickname") ?? ""
  let reelId = url.searchParams.get("reelId") ?? ""
  let page = Number(url.searchParams.get("page") ?? 1)

  const sessionId = cookies.get("session")
  const email = await validateSession(sessionId ?? "")

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1
  }

  let result

  if (email) {
    result = await getTracks(
      page,
      text,
      id,
      collectorId,
      speakerId,
      placeId,
      nickname,
      reelId
    )
  } else {
    result = await getTracksWithoutSound(
      page,
      text,
      id,
      collectorId,
      speakerId,
      placeId,
      nickname,
      reelId
    )
  }
  console.log(result.jsons)
  return {
    jsons: result.jsons,
    page: page ?? 1,
    hits: result.hits,
    soundTrackMessage: email ? "Ar fáil" : "Ar fáil d'úsáideoirí cláraithe",
  }
}
