import { Song } from "@/app/types/song"
import { NextResponse } from "next/server";

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search"

export async function POST(req: Request) {
    try {
        const {query} = await req.json()
        const parameters = `part=snippet&maxResults=10&q=${query}`
        
        // Youtube API call
        const response = await fetch(`${YOUTUBE_SEARCH_API}?${parameters}&key=${process.env.YOUTUBE_API_KEY}`);

        if (response.ok) {
            const data = await response.json();
            const items = data.items;
            const songs: Song[] = []; 

            for (const item of items) {
                // Filter shorts and channels

                if (item.id.kind === 'youtube#video') {
                    const details = {
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails.medium.url
                    }
                    const song: Song = new Song(item.id.videoId, "Youtube", details);
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