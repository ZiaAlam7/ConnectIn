import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserDetail from "@/models/UserDetail.model";
import Post from "@/models/Post.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    console.log(email);

    const { target, values, postId } = await request.json();
    console.log(target);
    console.log(values);
    console.log(postId);
    await connectToDatabase();

    if(target === 'new post')
    {
      const newPost = await Post.create(values);
    }

   try {
     if(target === 'comments')
     {
     await Post.findByIdAndUpdate(postId,
         {
           $push: {
             comments: {
               userId: values.userId,
               text: values.text,
               createdAt: new Date(),
             }
           }
         },
       )
     }
   } catch (error) {
    console.error("Error while adding comment:", error);
   }

    // if (!newPost) {
    //   return NextResponse.json(
    //     { error: "User does not exists" },
    //     { status: 404 }
    //   );
    // }

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
