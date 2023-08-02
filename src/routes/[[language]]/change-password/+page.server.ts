import { changePassword } from "$lib/server/db.js"
import { fail } from "@sveltejs/kit"

export const actions = {
  default: async ({ cookies, request, url }) => {
    const data = await request.formData()
    console.log(url)
    let otp = url.searchParams.get("otp")
    try {
      await changePassword(
        Number(data.get("userId")),
        String(data.get("current-password")),
        String(data.get("new-password"))
      )
    } catch (error: any) {
      // TODO: check error code
      return fail(422, {
        error: error.message,
      })
    }
    return {
      success: true,
    }
  },
}
