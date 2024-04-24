import Image from "next/image";

export default function PlayerControls() {
    return (
        <div className="grid grid-cols-4 bg-gray-900 h-12 p-2">
            <Image src="/back-button.svg" width="32" height="32" alt=""></Image>
            <Image src="/play-button.svg" width="32" height="32" alt=""></Image>
            <Image src="/forward-button.svg" width="32" height="32" alt=""></Image>
            <p className="text-sm">0:00 / 4:20</p>
        </div>
    );
}