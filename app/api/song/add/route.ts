import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {userId, playlist, song} = await req.json();
        const {details, id, platform} = song

        await db.song.create({
            data: {
                id: id,
                platform: platform,
                userId: Number(userId),
                playlistId: playlist.id,
                ...details
            }
        });


        return NextResponse.json({message: "Adding Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Adding Failed"}, {status: 500});
    }
}