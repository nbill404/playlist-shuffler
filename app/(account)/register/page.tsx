'use client'
import RegisterForm from "@/app/components/register/RegisterForm";

export default function RegisterPage() {


    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">
            <div className="flex flex-col gap-3">
                <RegisterForm/>
                <div className="divider"></div>
                <a className="no-underline hover:underline text-sky-400" href="/login">Login</a>
                <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
            </div>
        </main>

    )

}