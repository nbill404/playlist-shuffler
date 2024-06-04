import { Playlist } from "./playlist";
import { Song } from "./song";

// Get all layers
export const convertJsonToPlaylist = (obj: any) => {
    const playlist = new Playlist();
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

// Get single layer
export const convertJsonToPlaylistSingle = (obj: any) => {
    const playlist = new Playlist();
    playlist.addDetails(obj.details)

    for (const item of obj.elements.songList) {
        const song = new Song("", "Youtube")
        song.addDetails(item);
        playlist.push(song)
    }

    for (const item of obj.elements.playlistList) {
        const newPlaylist = new Playlist();
        newPlaylist.addDetails(item)
        playlist.push(newPlaylist)
    }

    playlist.sort()

    return playlist
}