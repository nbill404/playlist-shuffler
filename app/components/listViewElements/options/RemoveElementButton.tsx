import Image from "next/image"

export default function RemoveElementButton() {

    const handleClick = () => {

    }

    return (
        <button onClick={handleClick}>
            <Image className="hover:bg-sky-800" src="/cross.svg" width="64" height="64" alt=""/>
        </button>
    )


}