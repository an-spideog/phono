import { getStaticData, validateSession } from "$lib/server/db.js"

export const load = async ({ params, cookies }) => {
  const sessionId = cookies.get("session")
  const { email, isAdmin, userId } = await validateSession(sessionId ?? "")
  let records: any = await getStaticData()
  let staticCollectors = records[0]
  let staticSpeakers = records[1]
  let staticReels = records[2]
  let staticTracks = records[3]
  console.log("isAdmin: " + isAdmin)
  return {
    language: params.language ?? "ga",
    email: email ?? "",
    staticCollectors,
    staticSpeakers,
    staticReels,
    staticTracks,
    isAdmin,
    userId,
  }
}
