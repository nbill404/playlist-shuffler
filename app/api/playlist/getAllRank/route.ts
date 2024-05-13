import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// Gets the songs and subplaylists of all playlists in the array
const getElements = async (array : any, userId: number) => {
    let playlistRankList = [];

    for (const item of array) {
        const songList = await db.song.findMany({
            where: {
                userId: Number(userId),
                playlistId: Number(item.id)
            }
        });

        const playlistList = await db.playlist.findMany({
            where: {
                userId: Number(userId),
                parentPlaylistId: Number(item.id),
            }
        })
        
        const playlist = {
            details: {...item},
            elements: {
                songList: songList,
                playlistList: playlistList
            }
        }


        playlistRankList.push(playlist)
    }

    return playlistRankList;
}




// Retrieves details of all playlists with a specific rank
export async function POST(req: Request) {
    try {
        const {userId, rank} = await req.json();
            
        const playlists = await db.playlist.findMany({
            where: {
                userId: Number(userId),
                rank: Number(rank)
            }
        })

        const playlistRankList = await getElements(playlists, userId);
        
        return NextResponse.json({data: playlistRankList, message: "Playlist fetch success"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({data: {}, message: "Playlist get failed"}, {status: 500});
    }
}