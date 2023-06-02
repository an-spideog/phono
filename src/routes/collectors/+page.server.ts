import { page } from '$app/stores';
import { getCollectorPageCount, getCollectorsJson } from '$lib/server/db';

export const load = async ( {url} ) => {
    let pageCount = await getCollectorPageCount();
    console.log('page count: ' + pageCount);
    let page = Number(url.searchParams.get('page'));
    if (page <= 0) {
        page = 1;
    }
    if (page > pageCount) {
        page = pageCount;
    }
    console.log('Page: ' + page);
    let collectorsObject = await getCollectorsJson(Number(url.searchParams.get('id')), url.searchParams.get('text') ?? undefined, page);
    let collectorsCount = collectorsObject?.count;
    console.log(collectorsCount);
    let collectorsJson = collectorsObject?.json;
    return {
        collectorsJson: (collectorsJson ?? []),
        page: page ?? 1,
        collectorsCount: collectorsCount ?? 0
    }
}
