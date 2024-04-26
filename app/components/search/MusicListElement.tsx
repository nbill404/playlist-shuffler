import Image from "next/image"
import { Song } from "../../types/song"

interface Props {
    song: Song
    num: number
}

export default function MusicListElement({song, num} : Props) {
    const handleAdd = async () => {
        try {

            const data = {}

            const response = await fetch("/api/song/add", {
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.ok) {

            }



        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-row gap-5 p-3 hover:bg-sky-800">
            <p className="text-xl text-bold flex items-center">{num + 1}</p>
            <Image src="/youtube.svg" width="20" height="10" alt=""/>
            <Image src={song.details.thumbnail} width={200} height={200} alt=""/>
            <p className="text-xl font-semibold">{song.details.title}</p>
            <Image src={"/plus.svg"} width={32} height={32} alt=""/>
        </div>
    )

}