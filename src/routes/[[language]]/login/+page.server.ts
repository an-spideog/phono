import {
  validateCredentials,
  createSession,
  logout,
  validateSession,
} from "$lib/server/db.js"
import { redirect } from "@sveltejs/kit"

export async function load({ cookies }) {
  let sessionId = cookies.get("session")
  let email = ""
  if (sessionId) {
    ;({ email } = await validateSession(sessionId))
  }

  return {
    email: email,
  }
}

export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData()
    const email = String(data.get("email"))
    const password = String(data.get("password"))
    if (await validateCredentials(email, password)) {
      const id = await createSession(email)
      cookies.set("session", id, {
        path: "/",
        secure: true,
        httpOnly: true,
      })
    } else {
    }
  },
  logout: async ({ cookies }) => {
    logout(cookies.get("session") ?? "")
    cookies.delete("session", { path: "/" })
    throw redirect(302, "/en/introduction")
  },
}
