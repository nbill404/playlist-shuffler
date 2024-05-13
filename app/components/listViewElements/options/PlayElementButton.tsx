import Image from "next/image"

export default function PlayElementButton() {
    const handleClick = () => {

    }

    return (
        <button onClick={handleClick}>
            <Image className="hover:bg-sky-800" src="/play-button.svg" width="64" height="64" alt=""/>
        </button>
    )


}