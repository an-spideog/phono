/* 
 * Does it make sense to have constructors here? do I need constructors in the first place? 
 * if not, we can remove them later, and use interfaces instead, but I think we may need them? 
 */


class Collector {
    id: number;
    name: {
        first: string, 
        last: string,
    };

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.name = {
            first: firstName,
            last: lastName,
        };
    }
}

class Speaker {
    id: number;
    gender: string;
    name: {
        full: string,
        first: string,
        last: string
    };

    constructor(id: number, gender: string, firstName: string, lastName: string) {
        this.id = id;
        this.gender = gender;
        this.name = {
            full: firstName + " " + lastName,
            first: firstName,
            last: lastName,
        };
    }
}

class Reel {
    id: number;
    title: string;
    refId: number;
    dates: string;
    collectors: number[];
    note: string;

    constructor(id: number, title: string, refId: number, dates: string, collectors: number[], note: string) {
        this.id = id;
        this.title = title;
        this.refId = refId;
        this.dates = dates;
        this.collectors = collectors;
        this.note = note;
    }
}

class Track {
    id: number;
    nickname: string;
    catalogueEntry: string;
    places: number[];
    recordingDate: string;
    speakers: number[];
    languages: string[];
    reels: number[];

    constructor(id: number, nickname: string, catalogueEntry: string, places: number[], 
        recordingDate: string, speakers: number[], languages: string[], reels: number[]) {
        this.id = id;
        this.nickname = nickname;
        this.catalogueEntry = catalogueEntry;
        this.places = places;
        this.recordingDate = recordingDate;
        this.speakers = speakers;
        this.languages = languages
        this.reels = reels;
    }
}

