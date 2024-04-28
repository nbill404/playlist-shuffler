'use client'

import YouTube, { YouTubeEvent } from "react-youtube"

interface Props {
    videoId: string
}

export default function YouTubeEmbed({videoId} : Props) {
    const handleReady = (event: YouTubeEvent<number>) => {
        event.target.playVideo();
    }


    return (
        <YouTube
            videoId={videoId}
            onReady={handleReady}
        >
        </YouTube>



    ) 
}