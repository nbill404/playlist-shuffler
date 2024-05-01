'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [detailsIncorrect, setDetailsIncorrect] = useState(false)

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        try {
            // Prevent page from reloading
            event.preventDefault()
            const formData = new FormData(event.currentTarget);
            
            // Compare form to database
            const signInData = await signIn('credentials', {
                username: formData.get("username"),
                password: formData.get("password"),
                redirect: false,
            })

            if (signInData?.error) {
                // Will display incorrect input message
                setDetailsIncorrect(true);
            } else {
                // Redirect to home on successful login (router is used for client component)
                router.push('/');
            }

        } catch (error) {
            console.log(error);
            console.log("Signin failed");
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
                        {detailsIncorrect && <p className="text text-s text-red-600">*Username or password is incorrect</p>}
                    </form>
                    
                    <div className="divider"></div>
                    <a className="no-underline hover:underline text-sky-400" href="/register">Register here</a>
                    <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
                </div>
            </div>
        </main>
    )
}