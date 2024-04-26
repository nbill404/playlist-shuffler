import MainLayout from "../components/MainLayout";
import Navbar from "../components/navbar/Navbar";
import PlaylistsView from "../components/playlist/PlaylistsView";
import Sidebar from "../components/sidebar/Sidebar";

export default function PlaylistsPage() {

    

    return (
        <MainLayout>{PlaylistsView}</MainLayout>
    )

}