import  connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserDetail from "@/models/UserDetail.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options"; 

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const userId = session.user.id; 

    const { address, education, work } = await request.json();

    await connectToDatabase();
    console.log(education);
    const updatedUser = await UserDetail.findOneAndUpdate(
      { user_id : userId}, 
      {
        $set: {
          address,
          education,
          work,
        },
      }
    );

    if (!updatedUser) {
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
      { error: "Failed to Add Details" },
      { status: 500 }
    );
  }
}
