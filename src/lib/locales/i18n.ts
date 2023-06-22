import { register, init } from "svelte-i18n"

register("en", () => import("./en.json"))
register("ga", () => import("./ga.json"))

init({
  fallbackLocale: "ga",
  initialLocale: "ga",
})
