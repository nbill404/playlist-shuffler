import { Dispatch, SetStateAction, createContext } from "react";
import { Playlist } from "../lib/playlist";

export interface GridContextType {
    lists: Playlist[]
    userId: number | undefined
    setPlaylists: Dispatch<SetStateAction<Playlist[]>>
}

export const GridContext = createContext<GridContextType | null>(null);
