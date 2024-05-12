export class Song {
    // Database
    id: string;
    platform: string;
    title: string = "";
    artist: string = "";
    length: number = 0;
    thumbnailUrl: string = "";
    position: number = 0;
    
    // Client only
    globalPosition? : number; // Used to determine overall index regardless of being in subplaylist

    constructor(id: string, platform: string) {
        this.id = id;
        this.platform = platform;
    }

    addDetails(obj: Object) {
        Object.assign(this, obj);
    }
}
