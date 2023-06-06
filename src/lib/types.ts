// The type of returned js objects from xml-js
import type { ElementCompact } from "xml-js"; 

export class Collector {
    id: number;
    firstName: string;
    lastName: string;

    constructor(json: ElementCompact) {
        if (json.collector) {
            this.id = json.collector._attributes.id;
            this.firstName = json.collector.name.firstname._text;
            this.lastName = json.collector.name.surname._text;
        } else {
            throw("json not of a Collector");
        }
    }
}

export class Speaker {
    id: number;
    gender: string;
    firstName: string;
    lastName: string;

    constructor(json: ElementCompact) {
        if (json.speaker) {
            this.id = json.speaker._attributes.id;
            this.gender = json.speaker._attributes.gender;
            this.firstName = json.speaker.name.firstname._text;
            this.lastName = json.speaker.name.surname._text;
        } else {
            throw("json not of Speaker");
        }
    }
}

export class Reel {
    id: number;
    title: string;
    refId: number;
    date: string; 
    collectors: number[];
    note: string;

    constructor(json: ElementCompact) {
        if (json.spool) {
            this.id = json.spool._attributes.id;
            this.title = json.spool.title._text;
            this.refId = json.spool.refID._text;
            this.date = json.spool.dates.date._text;
            this.collectors = getAttributeOrMap(json.spool.collectors.collector, "collectorID");
            this.note = json.spool.note._text;
        } else {
            throw("json not of Reel");
        }
    }
}

export class Track {
    id: number;
    nickname: string;
    catalogueEntry: string;
    places: number[];
    recordingDate: string;
    speakers: [{id: number, primary: boolean}];
    languages: string[];
    reels: number[];
    constructor(json: ElementCompact) {
        if (json.track) {
            this.id = json.track._attributes.id;
            this.nickname = json.track._attributes.nickname;
            this.catalogueEntry = json.track.catalogueEntry._text;
            this.places = json.track.places.place._attributes.placeID;
            this.recordingDate = json.track.recordingDate._text;
            this.speakers = getAttributeOrMap(json.track.speakers.speaker, 'speakerID');
            this.languages = getAttributeOrMap(json.track.languages.language, "languageID");
            this.reels = getAttributeOrMap(json.track.spools.spool, "spoolID");
        } else {
            throw("json not of Track");
        }
    }
}

/* The SQL response either responds with one element or a list of elements so this handles both of those cases */
function getAttributeOrMap(json: any, attribute: string) {
    if (Array.isArray(json)) {
        return json.map((a: any) => a._attributes[attribute]);
    } else {
        return [] + json._attributes[attribute];
    }
}