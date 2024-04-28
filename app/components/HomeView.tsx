import TestButton from "./TestButton";

export default function HomeView() {
    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <h1 className="text-xl">Home Page</h1>
            <br/>
            <p>
                This site allows you to customize your playlists for advanced shuffling.
                <br/>
                <br/>
                Features<br/>
            </p>
            <ul>
                <li> 
                    Playlists within playlists. 
                    Shuffling will shuffle all songs and all songs within playlists
                </li>
                <li> 
                    Lock playlists. 
                    Deactivate shuffling songs for specific playlists. 
                    Useful for albums or songs with multiple parts
                </li>
                <li>
                    Start on song/playlist. Song/Playlist will play first when shuffling
                </li>
                <li>
                    Priority songs. Songs can be favourited so that they will always appear first when shuffling. Unranked songs will be shuffled as normal after the ranked ones</li>
                <li>
                    Mix and match tracks from supported websites
                </li>
            </ul>

            <br/>
            <p>
                Supported sites:
            </p>    
            <ul>
                <li>Youtube</li>
                <li>Spotify</li>
                <li>Soundcloud</li>
            </ul>
            <br/>
            <a className="btn btn-primary" href="/search">Get Started</a>
            <div className="divider divider-primary"></div>
            <TestButton/>
        </div>
    )
}