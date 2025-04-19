import  connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options"; 
import Post from "@/models/Post.model";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    const email = session.user.email; 

    await connectToDatabase();
   
    const allPosts = await Post.find()
    .populate('userId', 'full_name headline profile_image') // post's author
    .populate('comments.userId', 'full_name headline profile_image'); // comment authors
  

    if (!allPosts) {
      return NextResponse.json(
        { error: "No post availabe" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "updated successfully", success: true , allPosts: allPosts},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Add Details" },
      { status: 500 }
    );
  }
}
