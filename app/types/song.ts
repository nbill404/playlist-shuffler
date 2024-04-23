
export class Song {
    id: string;
    platform: string;
    
    
    // Details should contain
    // title: string
    // artist: string
    // length: number
    // thumbnail: string
    
    details: Object;
    


    constructor(id: string, platform: string, details: Object) {
        this.id = id;
        this.platform = platform;
        this.details = details;

    }


}