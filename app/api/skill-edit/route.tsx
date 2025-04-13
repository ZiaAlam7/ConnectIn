import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserDetail from "@/models/UserDetail.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import mongoose, { QueryOptions } from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    console.log(email);

    const { target, values, remove, skillIndex } = await request.json();

    await connectToDatabase();

    let updateQuery = {};
    let options: QueryOptions = { new: true };

    if (remove) {
      updateQuery = {
        $pull: {
          [target]: values,
        },
      };
    } else {
      updateQuery = { $addToSet: { [`${target}.${skillIndex}`]: values } };
    }

    const User = await UserDetail.findOneAndUpdate(
      { email: email },
      updateQuery,
      options
    );

    if (!User) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to updated skill" },
      { status: 500 }
    );
  }
}
