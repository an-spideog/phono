import "$lib/locales/i18n.js"
import { locale, waitLocale } from "svelte-i18n"
export const load = async ({ params, data }) => {
  // svelte-i18n needs to be run in layout.ts rather than
  // layout.server.ts to avoid errors, so we use both
  if (params.language) {
    locale.set(params.language)
  }
  await waitLocale()

  return {
    language: data.language,
    email: data.email,
    staticCollectors: data.staticCollectors,
    staticSpeakers: data.staticSpeakers,
    staticReels: data.staticReels,
    staticTracks: data.staticTracks,
    isAdmin: data.isAdmin,
  }
}
