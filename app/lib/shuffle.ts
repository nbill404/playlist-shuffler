import { Playlist } from "./playlist";
import { Song } from "./song";

// https://stackoverflow.com/a/48083382
export function shuffle(array: (Playlist | Song)[]) {
    let newArray = [...array];
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        console.log(randomIndex);

        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }

    return newArray;
}