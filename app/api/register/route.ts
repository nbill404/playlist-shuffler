import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const {email, username, password} = await req.json();

        // Check if email already exists
        const existingUser = await db.user.findUnique({
            where: { email: email}
        });
        if (existingUser) {
            return NextResponse.json( {user: null, message: "User with this email already exists"}, {status: 409});
        }

        // Check if username already exists
        const existingUsername = await db.user.findUnique({
            where: { username: username}
        });

        if (existingUsername) {
            return NextResponse.json( {user: null, message: "User with this username already exists"}, {status: 409});
        }

        // Encrypt password with bcrypt
        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({user: '', message: "Registration error"}, {status: 500})
    }

}

export async function GET() {
    return NextResponse.json({message: "received"});
}
