export default function LoginPage() {
    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">

            <div className="flex justify-center h-auto w-80 bg-sky-950 p-5 rounded-md">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border"></div>
                    <h1>Login page</h1>
                    <input className="input input-bordered" type="text" placeholder="example@gmail.com"/>
                    <input className="input input-bordered" type="text" placeholder="********"/>
                    <a className="btn btn-primary">Enter</a>
                    <div className="divider"></div>
                    <a className="no-underline hover:underline text-sky-400" href="/register">Register here</a>
                    <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
                </div>
            </div>
        </main>
    )
}