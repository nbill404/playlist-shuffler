import Link from "next/link";
import Image from "next/image";

export default function Home() {

    const featuresList = [
        ["Playlists within playlists: ", "Shuffling will shuffle all songs and all songs within playlists"],
        ["Lock playlists: ", "Deactivate shuffling songs for specific playlists (Useful for albums or songs with multiple parts)."],
        ["Start on song/playlist: ", "Song/Playlist will play first when shuffling"],
        ["Priority songs: ", "Songs can be favourited so that they will always appear first when shuffling. Unranked songs will be shuffled as normal after the ranked ones"]
    ]

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <h1 className="text-2xl">Welcome!</h1>
            <br/>
            <p>
                This site allows you to customize your youtube playlists for advanced shuffling. It is intended to be used with music tracks but will still work with regular videos.
            </p>
            <br/>
            <div>
                <p className="text-lg">Features:</p>
                <ul>
                    {featuresList.map((e, i) => 
                    <li className="flex flex-row gap-2"key={`li-${i}`}>
                        <p className="font-bold">{e[0]} </p>
                        <p>{e[1]}</p>
                    </li>
                    )}
                </ul>
            </div>
            
            <br/>

            <div>
                <p className="text-lg">Playlist Options:</p>
                <ol className="list-decimal list-inside">
                    <li>Play</li>
                    <li>Shuffle everything</li>
                    <li>Shuffle with user settings</li>
                    <li>Flatten and shuffle</li>
                </ol>
            </div>

            <br/>

            <p>Create an account to get started</p><br/>
            <Link className="btn btn-primary" href="/register">Get Started</Link>
            
            <div className="divider divider-primary"></div>
            

            <div className="flex flex-col">
                <p>Contact Details</p>
                <div className="flex flex-row gap-2">
                    <Image src="user.svg" width="24" height="24" alt=""></Image>
                    <p>Bill Nguyen</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Image src="email.svg" width="24" height="24" alt=""></Image>
                    <p>nbill404@gmail.com</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Image src="github-mark.svg" width="24" height="24" alt=""></Image>
                    <p>https://github.com/nbill404</p>
                </div>
            </div>

        </div>
    );
}
