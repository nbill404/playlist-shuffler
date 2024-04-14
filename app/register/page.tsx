


export default function RegisterPage() {
    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl">Register</h1>
                <input className="input" type="text" placeholder="Username"></input>
                <input className="input" type="text" placeholder="Email"></input>
                <input className="input" type="text" placeholder="Password"></input>
                <input className="input" type="text" placeholder="Confirm password"></input>
                <button className="btn btn-primary">Submit</button>
                <div className="divider"></div>
                <a className="no-underline hover:underline text-sky-400" href="/login">Login</a>
                <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
            </div>
        </main>

    )

}