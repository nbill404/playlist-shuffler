import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const {userId, songId, values} = await req.json();


        await db.song.update({
            where: {
                userId: Number(userId),
                id: songId
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