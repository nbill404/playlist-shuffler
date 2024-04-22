import { redirect } from "next/navigation";


export default function RegisterPage() {

    const handleRegister = async (formData: FormData) => {
        'use server'
        var success = false;

        try {

            const user = {
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password")
            }
    
            const response = await fetch(process.env.URL + '/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (response.ok) {
                console.log("success");
                success = true;
            } else {
                console.log(await response.json())
            }
            
        } catch (error) {
            console.log(error)
            console.log("Registration failed");
        }

        if (success) {
            redirect('/login')
        }
    }

    return (
        <main className="grid bg-slate-800 min-h-screen place-items-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl">Register</h1>
                <form className="flex flex-col gap-3" action={handleRegister}>
                    <input className="input" type="text" name="username" placeholder="Username"></input>
                    <input className="input" type="text" name="email" placeholder="Email"></input>
                    <input className="input" type="text" name="password" placeholder="Password"></input>
                    <input className="input" type="text" name="cfmPassword" placeholder="Confirm password"></input>
                    <button className="btn btn-primary">Submit</button>
                </form>
                <div className="divider"></div>
                <a className="no-underline hover:underline text-sky-400" href="/login">Login</a>
                <a className="no-underline hover:underline text-sky-400" href="/">Return home</a>
            </div>
        </main>

    )

}