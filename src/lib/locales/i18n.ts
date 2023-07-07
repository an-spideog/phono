import { register, init, addMessages } from "svelte-i18n"
import en from "./en.json"
import ga from "./ga.json"
console.log("started initialising svelte-i18n")

register("en", () => import("./en.json"))
register("ga", () => import("./ga.json"))

init({
  fallbackLocale: "ga",
  initialLocale: "ga",
})

console.log("svelte-i18n initialised")
