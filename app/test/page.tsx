import MainLayout from "../components/MainLayout";
import { Playlist } from "../types/playlist";
import { Song } from "../types/song";

function TestView() {



    return (
        <>
            <p>test page don't worry about it</p>
            <form>
                <button type="submit" className="btn btn-primary">Click</button>
            </form>
        </>
    );
}



export default function Test () {
    return (
        <MainLayout>{TestView}</MainLayout>
    )


}