'use client'
import YouTubeEmbed from "../embedPlayers/YoutubeEmbed";

export default function SongImage({songId} : {songId : string}) {
    console.log(songId);

    return (
        <div className="flex justify-center items-center p-2">
            {songId
            ? <YouTubeEmbed videoId={songId}/>
            : <div className="m-5 h-32 w-32 border">
                {songId} 
            </div>
            }
        </div>
    )


}