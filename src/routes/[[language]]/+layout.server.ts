import { browser } from "$app/environment"
import { validateSession } from "$lib/server/db.js"
import "$lib/locales/i18n.js"
import { locale, waitLocale } from "svelte-i18n"

export const load = async ({ params, cookies }) => {
  const sessionId = cookies.get("session")
  const email = await validateSession(sessionId ?? "")

  locale.set(params.language)
  await waitLocale()
  return {
    language: params.language ?? "ga",
    email: email ?? "",
  }
}
