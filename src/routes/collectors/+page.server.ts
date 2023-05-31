import { getCollectorsJson } from '$lib/server/db';

export const load = async ( {url} ) => {
    let collectorsJson = await getCollectorsJson(Number(url.searchParams.get('id')), url.searchParams.get('text') ?? undefined, Number(url.searchParams.get('page')) ?? 1);
    console.log(url.searchParams.get('page'));
    return {
        collectorsJson: (collectorsJson ?? []),
        page: Number(url.searchParams.get('page')) ?? 1
    }
}
