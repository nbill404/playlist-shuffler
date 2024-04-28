import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // user id, playlist id
        const {userId, playlist} = await req.json();

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