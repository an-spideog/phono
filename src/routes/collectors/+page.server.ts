import { page } from '$app/stores';
import { getCollectorCount, getCollectors } from '$lib/server/db';
import type { ElementCompact } from 'xml-js';

export const load = async ( {url} ) => {
    let id = url.searchParams.get('id');
    let text = url.searchParams.get('text');
    let count = await getCollectorCount();
    let page = Number(url.searchParams.get('page') ?? 1);

    if (page < 1) {
        page = 1;
    } 
    // check max

    console.log('Page: ' + page);
    let jsons: ElementCompact[] = await getCollectors(page, text ?? '', id ?? '');
    console.log(jsons);
    return {
        collectorsJson: (jsons ?? []),
        page: page ?? 1,
        collectorsCount: count
    }
}
