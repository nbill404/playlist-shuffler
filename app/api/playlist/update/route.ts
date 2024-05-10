import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

// 
export async function POST(req: Request) {
    try {
        const {userId, playlistId, values} = await req.json();


        await db.playlist.update({
            where: {
                userId: Number(userId),
                id: Number(playlistId)
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