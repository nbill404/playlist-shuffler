import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const {user, playlist, parentPlaylistId} = await req.json();
        const {id, ...newPlaylist} = playlist; // Destructure id as creating new playlist needs unique id

        // Increment rank if parent is found
        let playlistCount = 0;
        let songsCount = 0;
        
        if (parentPlaylistId) {
            const parentPlaylist = await db.playlist.findUnique({
                where :{
                    userId: Number(user.id),
                    id: Number(parentPlaylistId)
                }
            })

            if (parentPlaylist) {
                newPlaylist.rank = parentPlaylist.rank + 1;

                if (newPlaylist.rank >= 10) {
                    return NextResponse.json({data: {} , message : "Cannot create any more layers"}, {status: 500});
                }


                songsCount = await db.song.count({
                    where : {
                        userId: Number(user.id),
                        playlistId: Number(parentPlaylistId)
                    }
                })

                playlistCount = await db.playlist.count({
                    where: {
                        userId: Number(user.id),
                        parentPlaylistId: Number(parentPlaylistId)
                    }
                })
            }
        }

        const position = songsCount + playlistCount;
        const parentId = parentPlaylistId ? Number(parentPlaylistId) : null

        const response = await db.playlist.create({
            data: {
                ...newPlaylist,
                userId: Number(user.id),
                position: position,
                parentPlaylistId : parentId
            }
        });

        return NextResponse.json({data: response, message: "Adding Success"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Adding Failed"}, {status: 500});
    }
}