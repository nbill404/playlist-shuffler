import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import SongImage from "./SongImage";


export default function Sidebar() {
    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            <SongImage/>
            <div className="divider"/>
            <PlayerControls/>
            <SidebarPlaylist/>
        </div>
    )
}