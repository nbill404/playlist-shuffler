import { Playlist } from "@/app/lib/playlist";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    playlist: Playlist
    setPlaylistsId: Dispatch<SetStateAction<number>>
}


export default function SelectSubPlaylistArrow({playlist, setPlaylistsId}: Props) {

    const handleSelectSubPlaylist = () => {
        setPlaylistsId(playlist.id);
    }

    return (
        <button className="hover:bg-sky-600" onClick={handleSelectSubPlaylist}>
            <Image src="/right-arrow.svg" width="24" height="24" alt=""></Image>
        </button>
    );
}