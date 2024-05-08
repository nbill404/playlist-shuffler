export class Song {
    id: string;
    platform: string;
    title: string = "";
    artist: string = "";
    length: number = 0;
    thumbnailUrl: string = "";
    position: number = 0;

    constructor(id: string, platform: string) {
        this.id = id;
        this.platform = platform;
    }

    addDetails(obj: Object) {
        Object.assign(this, obj);
    }
}

export const isSong = (obj: Object) => {
    return typeof obj.title !== typeof undefined
};