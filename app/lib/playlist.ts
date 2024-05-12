import { shuffle } from "./shuffle";
import { Song } from "./song";

type Element = (Playlist | Song);

export class Playlist {
    // Database 
    rank: number = 0; // Rank/Depth of playlist
    id: number;
    name: string;
    elements: Element[] = [];
    position: number = 0;
    canShuffle: boolean = false;

    // Client only
    idList? : string[]; // Flattened copy of list containing only ids for song indexing 

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

    addDetails(obj: Object) {
        Object.assign(this, obj)
    }

    sort() {
        this.elements.sort((a, b) => a.position - b.position)
    }

    shuffle() {
        this.elements = shuffle(this.elements);
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
            if (e instanceof Song) {
                newArr.push(e);
            } else {
                const subarr = this.flattenAux([...e.elements]);
                newArr = newArr.concat(subarr);
            }
        }

        return newArr;
    }

    flattenId() {
        this.idList = [];
        this.flattenIdAux(this.elements);
    }

    flattenIdAux(array: Element[]) {
        for (const e of array) {
            if (e instanceof Song) {
                this.idList?.push(e.id);
            } else {
                this.flattenIdAux(e.elements);
            }
        }
    }

    updateGlobalPosition(array: Element[] = this.elements, current: {index : number} = {index: 0}) {
        for (const e of array) {
            if (e instanceof Song) {
                e.globalPosition = current.index;
                current.index += 1;
            } else {
                this.updateGlobalPosition(e.elements, current);
            }
        }
    }

    printList(array: Element[] = this.elements) {
        for (const e of array) {
            if (e instanceof Song) {
                console.log(e);
            } else {
                console.log(e)
                this.printList(e.elements);
            }
        }
    }

}


