'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter();

    return <button 
        className="btn bg-red-300 text-xl text-white border-2 border-slate-600 navbar-end w-fit"
        onClick={() => {
            signOut()
            router.push("/");
            router.refresh();
        }}>
            Logout
        </button>
}