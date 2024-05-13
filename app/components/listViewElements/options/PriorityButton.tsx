'use client'
import Image from "next/image"
import { useState } from "react"

export default function PriorityButton() {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(!isPressed);
    }

    return (
        <button  onClick={handleClick}>
            {isPressed 
                ? <Image className="hover:bg-sky-800" src="/star-gold.svg" width="64" height="64" alt=""/>
                : <Image className="hover:bg-sky-800" src="/star.svg" width="64" height="64" alt=""/>
            }
        </button>
    )

}