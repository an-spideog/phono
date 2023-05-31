export const load = (({ url }) => {
    return {
        id: url.searchParams.get('id')
    }
})