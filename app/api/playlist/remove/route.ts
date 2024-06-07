import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        // user id, playlist id
        const {userId, playlistId} = await req.json();

        // Delete all associate songs
        await db.song.deleteMany({
            where: {
                userId: Number(userId),
                playlistId: playlistId
            }
        }
        );

        // Change to delete
        await db.playlist.delete({
            where: {
                userId: Number(userId),
                id: playlistId 
            }
        });

        return NextResponse.json({message: "Removing Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Removing Failed"}, {status: 500});
    }
}