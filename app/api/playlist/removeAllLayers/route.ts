import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const deleteElements = async (userId: number, playlistId: number) => {
    
    // Delete all songs 
    await db.song.deleteMany({
        where: {
            userId: userId,
            playlistId: playlistId
        }
    })

    // Find all sublists
    const playlists = await db.playlist.findMany({
        where : {
            userId: userId,
            parentPlaylistId: playlistId
        }
    })

    // Delete recursively
    for (const playlist of playlists) {
        await deleteElements(userId, playlist.id)
    }

    // Delete root 
    await db.playlist.delete({
        where: {
            userId: Number(userId),
            id: Number(playlistId)
        }
    }
    );

}

export async function POST(req: Request) {
    try {
        // user id, playlist id
        const {userId, playlistId} = await req.json();

        console.log(playlistId)
        // Delete recursive
        await deleteElements(Number(userId), Number(playlistId));

        return NextResponse.json({message: "Removing Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Removing Failed"}, {status: 500});
    }
}