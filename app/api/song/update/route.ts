import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const {userId, songId, playlistId, values} = await req.json();


        await db.song.update({
            where: {
                songPlaylistId : {
                    playlistId: playlistId,
                    id: songId
                },
                userId: Number(userId),
            },
            data: {
                ...values
            }
        })

        return NextResponse.json({message: "Update successful"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Update failed"}, {status: 500});
    }
}