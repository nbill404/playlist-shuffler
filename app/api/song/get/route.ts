import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {userId, playlistId} = await req.json();
        
        const songsList = await db.song.findMany({
            where: {
                userId: Number(userId),
                playlistId: Number(playlistId)
            }
        });
        
        return NextResponse.json({data: songsList, message: "Playlist fetch success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }



}