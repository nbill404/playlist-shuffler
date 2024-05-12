import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // user id, playlist id
        const {userId, songId} = await req.json();

        await db.playlist.delete({
            where: {
                userId: Number(userId),
                id: songId
            }
        });

        return NextResponse.json({message: "Removing Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Removing Failed"}, {status: 500});
    }
}