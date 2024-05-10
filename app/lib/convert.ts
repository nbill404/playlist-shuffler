import { Playlist } from "./playlist";
import { Song } from "./song";


export const convertJsonToPlaylist = (obj: any) => {
    const playlist = new Playlist(-1, "");
    playlist.addDetails(obj.details)

    for (const item of obj.elements.songList) {
        const song = new Song("", "Youtube")
        song.addDetails(item);
        playlist.push(song)
    }

    for (const item of obj.elements.playlistList) {
        playlist.push(convertJsonToPlaylist(item))    
    }

    playlist.sort()

    return playlist
}