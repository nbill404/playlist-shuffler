import Link from "next/link";


export default function RankButton({rank} : {rank : number}) {
    return (
        <Link className="btn btn-neutral flex items-center justify-center" href={`${process.env.URL}/playlists?r=${rank}`}>
            <p className="text-xl w-4 h-8">{rank + 1}</p>
        </Link>
    )

}