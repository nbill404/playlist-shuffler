

async function login(formData: FormData) {
    const user = {email: formData.get("email"), password: formData.get("password")};
    

}


export default async function LoginPage() {

    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">

            <div className="flex justify-center h-auto w-80 bg-sky-950 p-5 rounded-md">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border"></div>
                    <h1>Login page</h1>

                    <form className="flex flex-col gap-3" action={async (e) => {
                        'use server'
                        await login(e)
                    }}>
                        <input className="input input-bordered" name="email" type="email" placeholder="example@gmail.com" value="Hello@gmail.com"/>
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