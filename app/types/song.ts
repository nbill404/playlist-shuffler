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

    // For use with spread operator from database 
    addDetails(id: string, platform: string, title: string, artist: string, length: number, thumbnailUrl: string) {
        this.id = id;
        this.platform = platform;
        this.title = title;
        this.artist = artist;
        this.length = length;
        this.thumbnailUrl = thumbnailUrl;
    }
}

