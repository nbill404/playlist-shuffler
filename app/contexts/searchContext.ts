import { Dispatch, SetStateAction, createContext } from "react";
import { Playlist } from "../lib/playlist";

interface SearchContextTypes {
    userId: number | undefined,
    playlistId: number | null, 
    playlists: Playlist[] | null,
    setPlaylistsId: Dispatch<SetStateAction<number| null>> | null
}

const defaultValues = {
    userId : undefined,
    playlistId: null,
    playlists: null,
    setPlaylistsId: null
}


export const SearchContext = createContext<SearchContextTypes>(defaultValues);