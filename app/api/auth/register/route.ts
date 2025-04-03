import connectToDatabase from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth.model";
import UserDetail from "@/models/UserDetail.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, password } = await request.json();

    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { error: "Required data is missing" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    // localStorage.setItem("userEmail", JSON.stringify(email));
    const existingUser = await UserAuth.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    const userAuth = await UserAuth.create({
      first_name,
      last_name,
      email,
      password,
      
    });

    await UserDetail.create({
      user_id: userAuth._id.toString(),
      email,
      first_name,
      last_name,
    });

    const newUser = await UserAuth.findOne({ email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
