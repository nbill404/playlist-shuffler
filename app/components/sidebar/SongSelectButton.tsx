import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { Song } from "@/app/types/song";



export default function SongSelectButton({index, song} : { 
    index : number 
    song : Song
}) {
    const { setSongNum } = useContext(SidebarContext);

    return (
        <li className="text-left hover:bg-slate-600 rounded">
            <button onClick={() => setSongNum(index)}>{song.title}</button>
        </li>
    )
}

