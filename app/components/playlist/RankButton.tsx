

export default function RankButton({rank} : {rank : number}) {
    return (
        <button className="btn btn-neutral flex items-center justify-center">
            <p className="text-xl w-4 h-8">{rank}</p>
        </button>
    )

}