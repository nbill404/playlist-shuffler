import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// Retrieves get details of sub playlists given parent
export async function POST(req: Request) {
    try {
        const {userId, playlistId} = await req.json();

        const playlistList = await db.playlist.findMany({
            where: {
                userId: Number(userId),
                parentPlaylistId: Number(playlistId),
            }
        })

        let subPlaylistList = []

        for (const item of playlistList) {
            const playlist = await db.playlist.findUnique({
                where: {
                    userId: Number(userId),
                    id: item.id
                }
            })

            const songList = await db.song.findMany({
                where: {
                    userId: Number(userId),
                    playlistId: Number(item.id)
                }
            });
    
            const subPlaylistElements = await db.playlist.findMany({
                where: {
                    userId: Number(userId),
                    parentPlaylistId: Number(item.id),
                }
            })

            const data = {
                details: playlist,
                elements: {
                    songList: songList,
                    playlistList: subPlaylistElements
                }
            }

            subPlaylistList.push(data);
        }

        return NextResponse.json({data: subPlaylistList, message: "Playlist fetch success"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }
}