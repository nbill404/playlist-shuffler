class Details {
    title: string = "";
    artist: string = "";
    length: number = 0;
    thumbnail: string = "";

    constructor(title: string, artist: string, length: number, thumbnail: string) {
        this.title = title;
        this.artist = artist;
        this.length = length;
        this.thumbnail = thumbnail;
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

