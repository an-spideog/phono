import {
  validateCredentials,
  testSession,
  createSession,
  logout,
  validateSession,
} from "$lib/server/db.js"

export async function load({ cookies }) {
  let sessionId = cookies.get("session")
  let email = ""
  if (sessionId) {
    email = await validateSession(sessionId)
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
      console.log("success")
      const id = await createSession(email)
      console.log("test")
      cookies.set("session", id, {
        path: "/",
        secure: true,
        httpOnly: true,
      })
      console.log("test 2")
    } else {
      console.log("failure")
    }
  },
  logout: async ({ cookies }) => {
    logout(cookies.get("session") ?? "")
    cookies.delete("session", { path: "/" })
  },
}
