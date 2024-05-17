
export function Avatar({name} : {name: string}) {
    return (
        <div className="avatar placeholder">
            <div className="w-12 rounded-full bg-blue-700">
                <span>{name[0]}</span>
            </div>
        </div>
    )
}