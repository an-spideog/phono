import { validateSession } from "$lib/server/db"
import type { Handle } from "@sveltejs/kit"
import { locale } from "svelte-i18n"

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event)
}
