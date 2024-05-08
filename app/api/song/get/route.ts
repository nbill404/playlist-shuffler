import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {userId, playlistId, parentPlaylistId} = await req.json();
        
        const songList = await db.song.findMany({
            where: {
                userId: Number(userId),
                playlistId: Number(playlistId)
            }
        });

        const playlistList = await db.playlist.findMany({
            where: {
                userId: Number(userId),
                parentPlaylistId: Number(playlistId),
            }
        })

        const data = {
            songList: songList,
            playlistList: playlistList
        }
        
        return NextResponse.json({data: data, message: "Playlist fetch success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }



}