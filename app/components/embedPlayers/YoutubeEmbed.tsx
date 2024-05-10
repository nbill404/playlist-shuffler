'use client'
import { Dispatch, SetStateAction } from "react"
import YouTube, { YouTubeEvent } from "react-youtube"

interface Props {
    videoId: string
    setSongEnded : Dispatch<SetStateAction<boolean>>
}

export default function YouTubeEmbed({videoId, setSongEnded} : Props) {
    const handleReady = (event: YouTubeEvent<number>) => {
        event.target.playVideo();
    }

    const handleEnd = (event: YouTubeEvent<number>) => {
        setSongEnded(true)
    }

    const opts = {
        width: "320",
        height: "180"
    }

    return (
        <YouTube
            videoId={videoId}
            onReady={handleReady}
            onEnd={handleEnd}
            opts={opts}
        >
        </YouTube>
    ) 
}