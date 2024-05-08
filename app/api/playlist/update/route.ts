import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

// For adding new playlists
export async function POST(req: Request) {
    try {
        const {user, playlist, parentPlaylistId} = await req.json();
        const {id, ...newPlaylist} = playlist; // Destructure id as creating new playlist needs unique id
        console.log(parentPlaylistId)
        
        // Update
        const response = await db.playlist.create({
            data: {
                ...newPlaylist,
                userId: Number(user.id),
                position: 0,
                parentPlaylistId: Number(parentPlaylistId)
            }
        });

        if (response) {
            console.log("Created")
        }


        return NextResponse.json({data: {id: response.id}, message: "Added new playlist"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Adding Failed"}, {status: 500});
    }
}