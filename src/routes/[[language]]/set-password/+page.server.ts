import { checkIfOTPExists, setPasswordUsingOTP } from "$lib/server/db.js"
import { fail } from "@sveltejs/kit"

export async function load({ url }) {
  // validate otp
  const email = await checkIfOTPExists(url.searchParams.get("otp") ?? "")
  console.log(email)
  return {
    email: email,
  }
}

export const actions = {
  default: async ({ request, url }) => {
    const data = await request.formData()
    console.log(url)
    let otp = url.searchParams.get("otp")
    console.log(otp, data.get("new-password"))
    try {
      await setPasswordUsingOTP(String(data.get("new-password")), String(otp))
    } catch (error: any) {
      return fail(422, {
        error: error.message,
      })
    }
    return {
      success: true,
    }
  },
}
