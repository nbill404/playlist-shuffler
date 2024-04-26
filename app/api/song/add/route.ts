import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {user, playlist, song} = await req.json();
        const {id, ...newPlaylist} = playlist; // Destructure id as creating new playlist needs unique id

        const newData = await db.playlist.create({
            data: {
                ...newPlaylist,
                userId: user.id,
                position: 0
            }
        });

        return NextResponse.json({message: "Adding Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Adding Failed"}, {status: 500});
    }
}