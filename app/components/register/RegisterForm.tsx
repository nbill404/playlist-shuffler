'use client'
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";

export default function RegisterForm() {
    const router = useRouter();
    const showError = false;
    const schema = z.object({
        username: z.string().min(6, {message: "Username must be at least 6 characters"}),
        email: z.string().email().min(1, {message: "Email is not valid"}),
        password: z.string().min(10, {message: "Password must be at least 10 characters"}),
        cfmPassword: z.string().min(10, {message: "Passwords do not match"})
    }).refine(schema => {
        return schema.password == schema.cfmPassword;
    },
        "Passwords do not match"
    );

    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        
        let success = false;

        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget)
            
            const user = {
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
                cfmPassword: formData.get("cfmPassword")
            }

            const result = schema.safeParse(user);

            if (result.success) {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user),
                });
        
                if (response.ok) {
                    success = true;
                } else {
                    // Should not happen
                    console.log(await response.json());
                }
            } else {
                let messages = []
                
                // Add error messages to array
                for (const [key, value] of Object.entries(result.error.flatten().fieldErrors)) {
                    if (value) {
                        messages.push(value[0]);
                    } 
                }

                if (messages.length === 0) {
                    for (const [key, value] of Object.entries(result.error.flatten().formErrors)) {
                        messages.push(value);
                    }
                }

                setErrorMessages(messages);
            }
            
        } catch (error) {
            console.log(error);
            console.log("Registration failed");
        }

        if (success) {
            router.push('/login')
        }
    }

    return (
        <>
            <h1 className="text-4xl">Register</h1>
            <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                <input className="input" type="text" name="username" placeholder="Username"></input>
                <input className="input" type="text" name="email" placeholder="Email"></input>
                <input className="input" type="password" name="password" placeholder="Password"></input>
                <input className="input" type="password" name="cfmPassword" placeholder="Confirm password"></input>
                <button className="btn btn-primary">Submit</button>
            </form>
            {errorMessages.map((m: string, i: number) => (<p className="text-sm text-red-600" key={"error" + 'i'}>{m}</p>))}
        </>


    )



}