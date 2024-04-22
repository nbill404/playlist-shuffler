'use client'
import { signIn } from "next-auth/react";
import { FormEvent } from "react";



export default function LoginPage() {
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const formData = new FormData(event.currentTarget);

            const signInData = await signIn('credentials', {
                username: formData.get("username"),
                password: formData.get("password"),
                redirect: true,
                callbackUrl: '/'
            })

            if (signInData?.error) {
                console.log("test")
            }


        } catch (error) {
            console.log(error);
            console.log("signin failed");
        }
    }

    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">

            <div className="flex justify-center h-auto w-80 bg-sky-950 p-5 rounded-md">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border"></div>
                    <h1>Login page</h1>

                    <form className="flex flex-col gap-3" onSubmit={handleLogin} name="Credentials">
                        <input className="input input-bordered" name="username" type="text" placeholder="Username"/>
                        <input className="input input-bordered" name="password" type="password" placeholder="********"/>
                        <button className="btn btn-primary" type="submit">Enter</button>
                    </form>
                    
                    <div className="divider"></div>
                    <a className="no-underline hover:underline text-sky-400" href="/register">Register here</a>
                    <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
                </div>
            </div>
        </main>
    )
}