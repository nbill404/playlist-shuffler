import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {userId, playlist, song} = await req.json();

        const songsCount = await db.song.count({
            where: {
                userId: Number(userId),
                playlistId: Number(playlist.id)
            }
        })

        const playlistsCount = await db.playlist.count({
            where: {
                userId: Number(userId),
                parentPlaylistId: Number(playlist.id)
            }
        })

        const position = songsCount + playlistsCount;
        song.position = position;

        await db.song.create({
            data: {
                ...song,
                userId: Number(userId),
                playlistId: playlist.id,
            }
        });


        return NextResponse.json({message: "Adding Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Adding Failed"}, {status: 500});
    }
}