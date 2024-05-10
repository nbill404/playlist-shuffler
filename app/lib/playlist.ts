import { shuffle } from "./shuffle";
import { Song, isSong } from "./song";

type Element = (Playlist | Song);

export class Playlist {
    rank: number = 0; // Rank/Depth of playlist
    id: number;
    name: string;
    elements: Element[] = [];
    position: number = 0;
    canShuffle: boolean = false;

    constructor(id: number, name: string) {
        this.id = id
        this.name = name;
    }

    push(e: Element) {
        this.elements.push(e);
    }

    empty() {
        return this.elements.length === 0;
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

    // Flattens all subplaylists into single list
    flatten() {
        this.elements = this.flattenAux([...this.elements])
    }

    flattenAux(array: Element[]) {
        let newArr : Element[] = []

        for (const e of array) {
            if (isSong(e)) {
                newArr.push(e);
            } else {
                const subarr = this.flattenAux([...e.elements]);
                newArr = newArr.concat(subarr);
            }
        }

        return newArr;
    }

    addDetails(obj: Object) {
        Object.assign(this, obj)
    }

    sort() {
        this.elements.sort((a, b) => a.position - b.position)
    }

    shuffle() {
        this.elements = shuffle(this.elements);
    }
}