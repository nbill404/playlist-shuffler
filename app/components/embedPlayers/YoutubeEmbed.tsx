'use client'
import YouTube, { YouTubeEvent } from "react-youtube"

interface Props {
    videoId: string
}

export default function YouTubeEmbed({videoId} : Props) {
    const handleReady = (event: YouTubeEvent<number>) => {
        event.target.playVideo();
    }

    const opts = {
        width: "320",
        height: "180"
    }

    return (
        <YouTube
            videoId={videoId}
            onReady={handleReady}
            opts={opts}
        >
        </YouTube>



    ) 
}