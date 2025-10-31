import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import connectToDatabase from "@/lib/mongodb";
import UserDetail from "@/models/UserDetail.model";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const { first_name, last_name, address } = await request.json();

    await connectToDatabase();

    const updatedUser = await UserDetail.findOneAndUpdate(
      { email },
      {
        $set: {
          first_name,
          last_name,
          address,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile info updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile info" },
      { status: 500 }
    );
  }
}
