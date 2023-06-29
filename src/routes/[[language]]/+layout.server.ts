import { browser } from "$app/environment"
import { getStaticData, validateSession } from "$lib/server/db.js"
import "$lib/locales/i18n.js"
import { locale, waitLocale } from "svelte-i18n"

export const load = async ({ params, cookies }) => {
  const sessionId = cookies.get("session")
  const email = await validateSession(sessionId ?? "")
  let records: any = await getStaticData()
  let staticCollectors = records[0]
  let staticSpeakers = records[1]
  let staticReels = records[2]
  console.log(staticCollectors)
  console.log(staticSpeakers)
  console.log(staticReels)
  locale.set(params.language)
  await waitLocale()
  return {
    language: params.language ?? "ga",
    email: email ?? "",
    staticCollectors: staticCollectors,
    staticSpeakers: staticSpeakers,
    staticReels: staticReels,
  }
}
