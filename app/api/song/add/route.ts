import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {userId, playlist, song} = await req.json();

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