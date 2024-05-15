import { array } from "zod";
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
    starred: boolean = false;

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

    remove(id: number | string) {
        // Playlist id is a number, song id is a string
        
        try {
            let index = 0;

            for (; index < this.elements.length; index++) {
                // Explicit comparison will filter out wrong type
                if (id === this.elements[index].id) {
                    break;
                }
            }

            if (index === this.elements.length) {
                throw Error("Element not found in list");
            } else {
                this.elements.splice(index, 1);

                // Update positions
                index = 0;
                for (; index < this.elements.length; index++) {
                    this.elements[index].position = index
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    setMode(mode: number) {
        switch (mode) {
            case 1: // Shuffle all unconditional
                this.shuffleUnconditional();
                break;
            case 2: // Shuffle with user settings
                this.shuffleWithSettings();
                break;
            case 3: // Flatten to single list and shuffle
                this.flatten();
                this.shuffleUnconditional();
                break;
            default: // Play normally
                break;
        }

        this.updateGlobalPosition()
        this.flattenId();   
    }

    shuffleWithSettings() {
        this.elements = this.shuffleWithSettingsAux([...this.elements], this.canShuffle);
    }

    shuffleWithSettingsAux(array: Element[], setting : boolean) {    
        if (setting) {
            let priorityArr = array.filter((e) => e.starred);
            let nonPriorityArr = array.filter((e) => !e.starred);
            let currentIndex = priorityArr.length, randomIndex;

            for (const element of priorityArr) {
                if (element instanceof Playlist) {
                    element.elements = this.shuffleWithSettingsAux([...element.elements], element.canShuffle);
                }
            }

            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [priorityArr[currentIndex], priorityArr[randomIndex]] = [priorityArr[randomIndex], priorityArr[currentIndex]];
                [priorityArr[currentIndex].position, priorityArr[randomIndex].position] = [priorityArr[randomIndex].position, priorityArr[currentIndex].position]
            }

            currentIndex = nonPriorityArr.length;

            for (const element of nonPriorityArr) {
                if (element instanceof Playlist) {
                    element.elements = this.shuffleWithSettingsAux([...element.elements], element.starred);
                }
            }

            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [nonPriorityArr[currentIndex], nonPriorityArr[randomIndex]] = [nonPriorityArr[randomIndex], nonPriorityArr[currentIndex]];
                [nonPriorityArr[currentIndex].position, nonPriorityArr[randomIndex].position] = [nonPriorityArr[randomIndex].position, nonPriorityArr[currentIndex].position]
            }


            return priorityArr.concat(nonPriorityArr);
        } else {
            for (const element of array) {
                if (element instanceof Playlist) {
                    element.elements = this.shuffleWithSettingsAux([...element.elements], element.starred);
                }
            }

            return array;
        }
    }


    shuffleUnconditional() {
        this.elements = this.shuffleUnconditionalAux([...this.elements]);
    }

    shuffleUnconditionalAux(array : Element[]) {
        let newArr = [...array]
        let currentIndex = array.length, randomIndex;
        
        // Recursive call before shuffling
        for (const element of newArr) {
            if (element instanceof Playlist) {
                element.elements = this.shuffleUnconditionalAux([...element.elements])
            }
        }

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
            [newArr[currentIndex].position, newArr[randomIndex].position] = [newArr[randomIndex].position, newArr[currentIndex].position]
        }

        return newArr;
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


