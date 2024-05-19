import { Song } from "@/app/lib/song"
import { NextResponse } from "next/server";

const YOUTUBE_VIDEO_API = "https://www.googleapis.com/youtube/v3/videos"

export async function POST(req: Request) {
    try {
        const {id} = await req.json();
        const parameters = `part=snippet&id=${id}`
        
        // Youtube API call
        const response = await fetch(`${YOUTUBE_VIDEO_API}?${parameters}&key=${process.env.YOUTUBE_API_KEY}`);

        if (response.ok) {
            const data = await response.json();
            const items = data.items;
            const songs: Song[] = []; 

            for (const item of items) {
                // Filter shorts and channels

                if (item.kind === 'youtube#video') {
                    const song: Song = new Song(item.id, "Youtube");
                    song.title = item.snippet.title,
                    song.thumbnailUrl = item.snippet.thumbnails.medium.url

                    songs.push(song);
                }
            }

            return NextResponse.json({results: songs, message: "Search successful"}, {status: 201});
        } else {
            return NextResponse.json({results: [], message: "Search failed"}, {status: 500})
        }
    } catch (error) {
        return NextResponse.json({results: [], message: "Search failed"}, {status: 500})
    }

}