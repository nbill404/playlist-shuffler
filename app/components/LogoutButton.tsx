'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return <button onClick={() => signOut()} className="btn bg-red-300 text-xl text-white border-2 border-slate-600 navbar-end w-fit">Logout</button>
}