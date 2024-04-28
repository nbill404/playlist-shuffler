import MainLayout from "../components/MainLayout";
import YouTubeEmbed from "../components/embedPlayers/YoutubeEmbed";

function TestView() {

    const youtubeID = "Va1Pv7JvE2g";

    return (
        <>
            <p>test page don't worry about it</p>
            <YouTubeEmbed videoId={youtubeID}/>

        </>
    );
}



export default function Test () {
    return (
        <MainLayout>{TestView}</MainLayout>
    )


}