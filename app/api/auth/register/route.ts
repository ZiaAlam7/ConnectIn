import { connectToDatabase } from "@/lib/mongodb";
import UserAuth from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    try {
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error: "Email or Password is missing" },
                {status: 400}
            )
        }

        await connectToDatabase()

        const existingUser = await UserAuth.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error: "User is already registered"},
                {status: 400}
            )
        }

        await UserAuth.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
         return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}