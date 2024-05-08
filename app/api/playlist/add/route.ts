import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
    try {
        const {user, playlist, parentPlaylistId} = await req.json();
        const {id, ...newPlaylist} = playlist; // Destructure id as creating new playlist needs unique id

        // Increment rank if parent is found
        if (parentPlaylistId) {
            const parentPlaylist = await db.playlist.findUnique({
                where :{
                    userId: Number(user.id),
                    id: Number(parentPlaylistId)
                }
            })

            if (parentPlaylist) {
                newPlaylist.rank = parentPlaylist.rank + 1;
            }
        }


        const parentId = parentPlaylistId ? Number(parentPlaylistId) : null

        const response = await db.playlist.create({
            data: {
                ...newPlaylist,
                userId: Number(user.id),
                position: 0,
                parentPlaylistId : parentId
            }
        });

        return NextResponse.json({data: {id: response.id}, message: "Adding Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Adding Failed"}, {status: 500});
    }
}