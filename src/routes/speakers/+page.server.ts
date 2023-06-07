import { getSpeakerCount, getSpeakers } from '$lib/server/db';
import type { ElementCompact } from 'xml-js';

export const load = async ( {url} ) => {
    let id = url.searchParams.get('id') ?? '';
    let text = url.searchParams.get('text') ?? '';
    let count = await getSpeakerCount(text, id);
    let page = Number(url.searchParams.get('page') ?? 1);

    // Clamp the page value within the number of pages
    if (page < 1) {
        page = 1;
    } 
    if (page > Math.ceil(count / 10)) {
        page = Math.ceil(count / 10);
    }

    console.log('Page: ' + page);
    let jsons: ElementCompact[] = await getSpeakers(page, text, id);
    console.log(jsons);
    return {
        speakersJson: (jsons ?? []),
        page: page ?? 1,
        speakerCount: count
    }
}
