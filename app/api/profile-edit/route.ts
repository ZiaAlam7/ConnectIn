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

    const { target, values, targetId, remove } = await request.json();

console.log(remove)
console.log(target)
console.log(values)

    await connectToDatabase();

    let updateQuery = {};
    let options: QueryOptions = { new: true };

    if (remove) {
      updateQuery = {
        $pull: {
          [target]: { _id: targetId },
        },
      };
    } else {
      const addToSetData: Record<string, any> = {};

      for (const key in values) {
        addToSetData[`${target}.$[elem].${key}`] = values[key];
      }

      updateQuery = {
        $set: addToSetData, // You could also use $addToSet, depending on what you're updating
      };

      options.arrayFilters = [{ "elem._id": targetId }];
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
      { error: "Failed to updated language" },
      { status: 500 }
    );
  }
}
