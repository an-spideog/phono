export function clickOutside(node: Node) {
  function handleWindowClick(event: Event) {
    if (!node?.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node))
      console.log("node:", node)
      console.log("other:", event.target)
    } else {
      console.log("node:", node)
      console.log("other:", event.target)
    }
  }
  window.addEventListener("click", handleWindowClick)

  return {
    destroy() {
      window.removeEventListener("click", handleWindowClick)
    },
  }
}
