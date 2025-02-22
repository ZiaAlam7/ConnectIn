import connectToDatabase from "@/lib/mongodb";
import ForgotPassword from "@/models/ForgotPassword.model";
import UserAuth from "@/models/UserAuth.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { password, token } = await request.json();

    await connectToDatabase();

    const user = await ForgotPassword.findOne({ token });

    if (!token) {
      return console.log("Token: ", token);
    }
    if (!user) {
      return NextResponse.json(
        { message: "Unable to authenticate user" },
        { status: 401 }
      );
    }
    if (Date.now() > user.expires) {
      return NextResponse.json(
        { message: "Request has expired, make a new request" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userReset = await UserAuth.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(user.user_id) },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: false }
    );
    console.log(userReset);
    if (userReset) {
      return NextResponse.json(
        { message: "Password changed successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while reseting the password" },
      { status: 500 }
    );
  }
}
