export function clickOutside(node: Node) {
  function handleWindowClick(event: Event) {
    if (!node?.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node))
    }
  }
  document.addEventListener("click", handleWindowClick)

  return {
    destroy() {
      document.removeEventListener("click", handleWindowClick)
    },
  }
}
