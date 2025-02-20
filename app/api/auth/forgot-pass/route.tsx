import connectToDatabase from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth.model";
import ForgotPassword from "@/models/ResetPassword.model";
import { sendMail } from "@/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await UserAuth.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User does not exists",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    const userForget = await ForgotPassword.findOneAndUpdate(
      { user_id: user._id },
      {
        $set: {
          token,
          expires,
        },
      }
    );

    if (!userForget) {
      await ForgotPassword.create({
        user_id: user._id,
        token,
        expires,
      });
    }
    const resetLink = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/reset-password?token=${token}`;
    await sendMail({
      email,
      subject: "Password Reset",
      message: `Hi ${user.first_name}! Click on the reset button to reset your password`,
      resetLink: resetLink,
    });

    return NextResponse.json(
      { message: "Password reset link sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send recovery mail" },
      { status: 500 }
    );
  }
}
