import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 60;

// Retrieves details of all playlists with a specific rank
export async function POST(req: Request) {
    try {
        const {userId, rank} = await req.json();
            
        const playlists = await db.playlist.findMany({
            where: {
                userId: Number(userId),
            }
        })
        
        return NextResponse.json({data: playlists, message: "Playlist fetch success"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }
}