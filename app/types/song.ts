export class Details {
    title: string = "";
    artist: string = "";
    length: number = 0;
    thumbnailUrl: string = "";

    constructor() {
    }
}

export class Song {
    id: string;
    platform: string;
    details: Details | null;

    constructor(id: string, platform: string, details: Details | null) {
        this.id = id;
        this.platform = platform;
        this.details = details;
    }
}

