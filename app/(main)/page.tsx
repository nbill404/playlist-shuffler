import Link from "next/link";
import Image from "next/image";

export default function Home() {

    const featuresList = [
        [],
        ["Lock playlists: ", "Deactivate shuffling songs for specific playlists (Useful for albums or songs with multiple parts)."],
        ["Priority songs: ", "Songs/Playlists can be favourited so that they will always appear first when shuffling. Unfavourited songs/playlists will be shuffled as normal after the favourited ones"]
    ]

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1 text-white max-h-[85vh] overflow-auto">
            <h1 className="text-2xl">Welcome!</h1>
            <br/>
            <p>
                This site allows you to customize your youtube playlists for advanced shuffling. It is intended to be used with music tracks but will still work with regular videos.
            </p>
            <br/>
            <div>
                <p className="text-lg">Features:</p>
                <ul>
                    <li>
                        <p className="font-bold">Playlists within playlists:</p>
                        <ul className="ps-3">
                            <li>You can combine playlists and songs within a single playlist.</li>
                            <li>Shuffling will shuffle all songs and all songs within playlists.</li>
                            <li>You can create subplaylists up to 10 layers deep.</li>
                            <li>Organise your playlists by artist/genre/mood or however you like</li>
                        </ul>
                    </li>
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
                    <li>Shuffle with user settings (Playlist locks and favourited songs)</li>
                    <li>Flatten and shuffle (Converts all songs into a single list)</li>
                </ol>
            </div>

            <br/>
            <p>Important Notes: Ensure that your browser has autoplay enabled for this site. Songs also may not autoplay correctly when this tab is not the main active tab</p>
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
                    <a href="https://github.com/nbill404">https://github.com/nbill404</a>
                </div>
            </div>

        </div>
    );
}
