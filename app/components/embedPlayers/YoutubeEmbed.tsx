'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import YouTube, { YouTubeEvent } from "react-youtube"

interface Props {
    videoId: string
    nextVideoId: string | null
    songPaused: boolean
    setSongEnded : Dispatch<SetStateAction<boolean>>
    setSongPaused : Dispatch<SetStateAction<boolean>>
}

// https://stackoverflow.com/questions/69579941/using-react-youtube-is-there-any-way-to-reference-the-player-other-than-with-an
var cElement = null; // Stores player event

export default function YouTubeEmbed({videoId, nextVideoId, songPaused, setSongEnded, setSongPaused} : Props) {
    
    const [bufferCheck, setBufferCheck] = useState(false);

    const handleReady = (event: YouTubeEvent<number>) => {
        cElement = event;
    }

    const handleEnd = (event: YouTubeEvent<number>) => {
        setSongEnded(true);
    }

    const handlePaused = (event: YouTubeEvent<number>) => {
        setSongPaused(event.data === 2);
    }

    const handleStateChange = (event: YouTubeEvent<number>) => {
        if (event.data === 3 && !bufferCheck) {
            event.target.pauseVideo();
            event.target.playVideo();
            setBufferCheck(true);
        }

    }

    // Pause/Play
    useEffect(() => {
        if (cElement) {
            if (songPaused) {
                cElement.target.pauseVideo();
            } else {
                cElement.target.playVideo();
            }
        }
    }
    , [songPaused])

    const opts = {
        width: "320",
        height: "180",
        playerVars: {
            autoplay: 1
        }
    }

    return (
        <YouTube
            videoId={videoId}
            onReady={handleReady}
            onEnd={handleEnd}
            onPlay={handlePaused}
            onPause={handlePaused}
            onStateChange={handleStateChange}
            opts={opts}
        >
        </YouTube>
    ) 
}