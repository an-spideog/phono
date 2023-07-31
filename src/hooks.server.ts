import { validateSession } from "$lib/server/db"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  let { isAdmin } = await validateSession(event.cookies.get("session") ?? "")
  if (!isAdmin && event.url.pathname.includes("/admin")) {
    throw redirect(303, "introduction")
  }
  if (event.url.pathname === "/") {
    throw redirect(302, "/introduction")
  }
  return resolve(event)
}
