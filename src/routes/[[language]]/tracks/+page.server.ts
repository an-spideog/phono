import {
  getTracks,
  getTracksWithoutSound,
  getUser,
  validateSession,
} from "$lib/server/db"
import type { Track } from "$lib/types.js"

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
  const { email, userId } = await validateSession(sessionId ?? "")
  let { tracks } = await getUser(userId)

  // Clamp the page value within the number of pages
  if (page < 1) {
    page = 1
  }

  let result

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
  return {
    jsons: result.jsons,
    page: page ?? 1,
    hits: result.hits,
    email: email, // TODO: this is not good from a security perspective, I'm just mimicking the original site for now
    allowedTrackIds: tracks.map((t: Track) => t.ID),
  }
}
