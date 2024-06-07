import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// Recursively gets all layers of a playlist
const getPlaylists = async (userId: number , playlistId: number) => {
    try {
        // Get parent
        const songList = await db.song.findMany({
            where: {
                userId: Number(userId),
                playlistId: Number(playlistId)
            }
        });

        const playlistList = await db.playlist.findMany({
            where: {
                userId: Number(userId),
                parentPlaylistId: Number(playlistId),
            }
        })

        const data =  {
            songList: songList,
            playlistList: Array()
        }
        
        
        for (const playlist of playlistList) {
            const subPlaylist = {
                details : playlist,
                elements: await getPlaylists(userId, playlist.id)
            }

            data.playlistList.push(subPlaylist)
        }


        return data;
    } catch (error) {
        console.log(error);
        return {
            details: null,
            elements: Array()
        };
    }
}

export async function POST(req: Request) {
    try {
        const {userId, playlistId} = await req.json();
        
        // Details of root playlist
        const details = await db.playlist.findUnique({
            where : {
                userId: Number(userId),
                id: Number(playlistId)
            }
        })

        const data = {
            details: details,
            elements: await getPlaylists(userId, playlistId) // Recursively get data of sub playlists
        }
        
        return NextResponse.json({data: data, message: "Playlist fetch success"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }
}

