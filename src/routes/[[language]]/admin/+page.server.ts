import { createUser, getUsers, renewTrackForUser } from "$lib/server/db"

export async function load() {
  const users = await getUsers()
  return {
    users: users,
  }
}

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData()
    const email = String(data.get("email"))
    const password = String(data.get("password"))
    const isAdmin = Boolean(data.get("isAdmin"))
    if (email) {
      let link = await createUser(email, isAdmin)
      return {
        link,
      }
    }
  },
}

// Will this only be run by admins by nature of it being in /admin?
// TODO: investigate
