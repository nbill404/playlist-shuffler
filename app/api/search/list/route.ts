import { Song } from "@/app/lib/song"
import { NextResponse } from "next/server";

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search"

export async function POST(req: Request) {
    try {
        const {query, token} = await req.json();

        const parameters = `part=snippet&maxResults=10&q=${query}` + (token ? `&pageToken=${token}` : "");
        
        // Youtube API call
        const response = await fetch(`${YOUTUBE_SEARCH_API}?${parameters}&key=${process.env.YOUTUBE_API_KEY}`);

        if (response.ok) {
            const data = await response.json();
            const items = data.items;
            const songs: Song[] = []; 

            for (const item of items) {
                // Filter shorts and channels

                if (item.id.kind === 'youtube#video') {
                    const song: Song = new Song(item.id.videoId, "Youtube");
                    song.title = item.snippet.title,
                    song.thumbnailUrl = item.snippet.thumbnails.medium.url

                    songs.push(song);
                }
            }

            return NextResponse.json({results: songs, token: data.nextPageToken, message: "Search successful"}, {status: 201});
        } else {
            console.log(response)
            return NextResponse.json({results: [], message: "Search failed"}, {status: 500})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({results: [], message: "Search failed"}, {status: 500})
    }

}