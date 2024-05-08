import { db } from "@/app/lib/db";
import { Whisper } from "next/font/google";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // user id, playlist id
        const {userId, playlist} = await req.json();

        // Delete all associate songs
        await db.song.deleteMany({
            where: {
                userId: Number(userId),
                playlistId: playlist.id
            }
        }
        );

        // Change to delete
        await db.playlist.delete({
            where: {
                userId: Number(userId),
                id: playlist.id 
            }
        });

        return NextResponse.json({message: "Removing Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Removing Failed"}, {status: 500});
    }
}