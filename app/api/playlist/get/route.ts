import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {id, parentPlaylistId, rank} = await req.json();

        const userPlaylists = await db.playlist.findMany({
            where: {
                userId: Number(id),
                parentPlaylistId: parentPlaylistId,
                rank: rank
            }
        });
        
        return NextResponse.json({data: userPlaylists, message: "Playlist fetch success"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }
}