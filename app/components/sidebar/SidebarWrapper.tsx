import { getServerSession } from "next-auth";
import Sidebar from "./Sidebar";
import { authOptions } from "@/app/lib/auth";
import { SidebarProvider } from "@/app/contexts/sidebarPlaylistContext";

// Function to get userid
export default async function SidebarWrapper() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    return  (
        <Sidebar userId={userId}/>
    )
}