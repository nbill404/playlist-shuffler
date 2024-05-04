import { array } from "zod";
import { Song } from "../types/song";

// https://stackoverflow.com/a/48083382
export function shuffle(songs: Song[]) {
    let currentIndex = songs.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [songs[currentIndex], songs[randomIndex]] = [songs[randomIndex], songs[currentIndex]];
    }

    return songs;
}