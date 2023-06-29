import { getCollectors } from "$lib/server/db"

export const load = async ({ url, cookies, params }) => {
  const language = params.language
  let id = url.searchParams.get("id") ?? ""
  let text = url.searchParams.get("text") ?? ""
  let page = Number(url.searchParams.get("page") ?? 1)

  let result = await getCollectors(page, text, id)
  return {
    jsons: result.jsons,
    hits: result.hits,
    page: page ?? 1,
    language: language,
  }
}
