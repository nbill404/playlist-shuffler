'use client'

import { useRouter } from "next/navigation"

export default function TestButton() {
    const router = useRouter();

    return <button className="btn btn-primary" onClick={() => router.push('/test')}>Test</button>
}