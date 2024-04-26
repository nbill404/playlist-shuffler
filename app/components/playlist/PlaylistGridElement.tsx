
interface Props {
    name: string
}


export default function PlaylistGridElement({name} : Props) {
    
    return (
    <div>
        <div className="w-32 h-32  bg-slate-800"/>
        <div>{name}</div>
    </div>
    )


}