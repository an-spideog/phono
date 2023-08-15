import {
  addTracksToUser,
  generateOneTimePassword,
  getUser,
  removeTrackFromUser,
} from "$lib/server/db.js"
import { renewTrackForUser } from "$lib/server/db.js"

import type { Track } from "$lib/types.js"

export const load = async ({ params }) => {
  console.log("params.user: " + params.user)
  let { user, tracks, expiredTracks } = await getUser(params.user)
  console.log("LOAD DEBUG")
  console.log("\ntracks")
  console.log(tracks)
  console.log("\nexpiredTracks")
  console.log(expiredTracks)
  return {
    user: user,
    userTracks: <Track[]>tracks,
    expiredTracks: <Track[]>expiredTracks,
  }
}

export const actions = {
  renew: async ({ request }) => {
    const data = await request.formData()
    const trackId = Number(data.get("trackId"))
    const userId = Number(data.get("userId"))
    renewTrackForUser(trackId, userId)
  },
  remove: async ({ request }) => {
    const data = await request.formData()
    const trackId = Number(data.get("trackId"))
    const userId = Number(data.get("userId"))
    removeTrackFromUser(trackId, userId)
  },
  add: async ({ request }) => {
    const data = await request.formData()
    const trackIds = String(data.get("trackIds")).replaceAll(" ", "").split(",")
    console.log("trackIds: ", trackIds)
    const userId = Number(data.get("userId"))
    addTracksToUser(trackIds, userId)
  },
  resetPassword: async ({ request }) => {
    const data = await request.formData()
    const userId = Number(data.get("userId"))
    console.log("User ID:", userId)
    return {
      otp: await generateOneTimePassword(userId),
    }
  },
}
