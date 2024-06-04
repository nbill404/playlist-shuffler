import { createContext } from "react";
import { Playlist } from "../lib/playlist";

const emptyFunction = (e : any) => {
}

const defaultValues = {
    playlist : <Playlist | null> null,
    playlistId: -1,
    songNum: 0,
    songPaused : false,
    setSongNum : emptyFunction, 
    setPlaylist : emptyFunction,
    setSongEnded : emptyFunction, 
    setSelectedSongId : emptyFunction,
    setSongPaused : emptyFunction,
    setIsShuffling: emptyFunction
}

export const SidebarContext = createContext(defaultValues);