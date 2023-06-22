import { browser } from "$app/environment"
import "$lib/locales/i18n.js"
import { locale, waitLocale } from "svelte-i18n"

export const load = async ({ params }) => {
  locale.set(params.language)
  await waitLocale()
  return {
    language: params.language ?? "ga",
  }
}
