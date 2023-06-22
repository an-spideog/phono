export const load = ({ params }) => {
  return {
    language: params.language ?? "ga",
  }
}
