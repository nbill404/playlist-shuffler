export class Song {
    id: string;
    platform: string;
    title: string = "";
    artist: string = "";
    length: number = 0;
    thumbnailUrl: string = "";

    constructor(id: string, platform: string) {
        this.id = id;
        this.platform = platform;
    }
}

