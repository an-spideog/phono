import { getSpeakers } from "$lib/server/db"

export const load = async ({ url }) => {
  let id = url.searchParams.get("id") ?? ""
  let text = url.searchParams.get("text") ?? ""
  let page = Number(url.searchParams.get("page") ?? 1)

  console.log("Page: " + page)
  let result = await getSpeakers(page, text, id)
  console.log(result.jsons)
  return {
    jsons: result.jsons,
    hits: result.hits,
    page: page ?? 1,
  }
}
