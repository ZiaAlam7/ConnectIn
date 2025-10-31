import { NextResponse } from "next/server";
import  connectToDatabase from "@/lib/mongodb";
import UserDetail from "@/models/UserDetail.model";
// import User from "@/models/User";

// GET /api/profile/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
      await connectToDatabase();

    const { id } = params;
    const user = await UserDetail.findOne({user_id: id}).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
