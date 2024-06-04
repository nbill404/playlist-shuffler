import { SearchContext } from "@/app/contexts/searchContext";
import { Playlist } from "@/app/lib/playlist";
import Image from "next/image";
import { useContext } from "react";

interface Props {
    playlist: Playlist
}


export default function SelectSubPlaylistArrow({playlist}: Props) {
    const {setPlaylistsId} = useContext(SearchContext)


    const handleSelectSubPlaylist = () => {
        if (setPlaylistsId) {
            setPlaylistsId(playlist.id);
        }
    }

    return (
        <button className="hover:bg-sky-600" onClick={handleSelectSubPlaylist}>
            <Image src="/right-arrow.svg" width="24" height="24" alt=""></Image>
        </button>
    );
}