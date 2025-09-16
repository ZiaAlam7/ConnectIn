import  connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options"; 
// import Post from "@/models/Post.model";
import UserDetail from "@/models/UserDetail.model";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const email = session.user.email; 

    await connectToDatabase();
   
    // const page = Math.max(Number(request.nextUrl.searchParams.get('page')) || 1, 1); // Ensure page is at least 1
    // const limit = 10;
    // const skip = (page - 1) * limit;

  

    const allUsers = await UserDetail.find({}, "user_id full_name profile_image");


  

    if (!allUsers) {
      return NextResponse.json(
        { error: "No post availabe" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "updated successfully", success: true , allUsers: allUsers},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Add Details" },
      { status: 500 }
    );
  }
}
