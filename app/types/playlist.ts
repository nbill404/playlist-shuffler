import { Song } from "./song";

type Element = (Playlist | Song);

export class Playlist {
    rank: number = 0; // Rank/Depth of playlist
    id: number;
    name: string;
    elements: Element[] = [];
    position: number = 0;

    constructor(id: number, name: string) {
        this.id = id
        this.name = name;
    }

    add(e: Element) {
        if (typeof e === typeof Playlist) {
            e.rank = this.rank + 1;
        }

        this.elements.push(e);
    }

    remove(id: number | string) {
        // Playlist id is a number, song id is a string
        
        try {
            let index = 0;

            for (; index < this.elements.length; index) {
                // Explicit comparison will filter out wrong type
                if (id === this.elements[index].id) {
                    break;
                }
            }

            if (index == this.elements.length) {
                throw Error("Element not found in list");
            } else {
                this.elements.splice(index, index);
            }
        } catch (error) {
            console.log(error);
        }
    }

    addDetails(obj: Object) {
        Object.assign(this, obj)
    }
}