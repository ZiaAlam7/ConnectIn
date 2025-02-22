import connectToDatabase  from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

        const registeredUser = await UserAuth.findOne({email})

        if(!registeredUser){
            return NextResponse.json(
                {message: "User does not exist"},
                {status: 400}
            )
        }

        const passValid = await bcrypt.compare(password , registeredUser.password)
        if(!passValid){
            return NextResponse.json(
                {message: "Incorrect Credentials"},
                {status: 400}
            )
        }

        return NextResponse.json(
            { message: "Sign In Successfully", success:true, userId: registeredUser._id},
            { status: 201 }
        );

    } catch (error) {
         return NextResponse.json(
            { message: "Failed to authenticate the user" },
            { status: 500 }
        );
    }
}