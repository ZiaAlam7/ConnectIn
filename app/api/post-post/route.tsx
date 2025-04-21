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

    const { target, values, postId, commentId, userId } = await request.json();

    console.log("This is target: ",target);
    console.log("This is values: ",values);
    console.log("This is postId: ",postId);
    console.log("This is commentId: ",commentId);
    console.log("This is userId: ",userId);




    await connectToDatabase();

    if (target === "new post") {
      const newPost = await Post.create(values);
    }

    try {
      if (target === "comments" && String(values.text).trim() !== "") {
        await Post.findByIdAndUpdate(postId, {
          $push: {
            comments: {
              userId: values.userId,
              text: values.text,
              createdAt: new Date(),
            },
          },
        });
      }
    } catch (error) {
      console.error("Error while adding comment:", error);
    }



    try {
      if (target === "like") {
        await Post.findByIdAndUpdate(postId, {
          $addToSet: {
            likes: values.userId,
          },
        });
        await UserDetail.findOneAndUpdate(
          { email },
          {
            $addToSet: {
              liked: postId,
            },
          }
        );
        console.log("Liked");
      }
    } catch (error) {
      console.error("Error while liking the post:", error);
    }


    try {
      if (target === "delete comment") {
       
        const post = await Post.findOne({
          _id: postId,
          comments: {
            $elemMatch: {
              _id: commentId,
              userId: userId,
            },
          },
        });
  
        if (!post) {
          return NextResponse.json(
            { message: "Unauthorized or comment not found", success: false },
            { status: 403 }
          );
        }
  
      
        await Post.findByIdAndUpdate(postId, {
          $pull: { comments: { _id: commentId } },
        });
  
        console.log("Comment deleted");
  
        return NextResponse.json(
          { message: "Comment deleted successfully", success: true },
          { status: 200 }
        );
      }
  
    } catch (error) {
      console.error("Error while deleting comment:", error);
      return NextResponse.json(
        { message: "Server error", success: false },
        { status: 500 }
      );
    }
  





    try {
      if (target === "delete post") {
        const post = await Post.findById(postId);

        if (String(post.userId) !== userId) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 403 }
          );
        }

        await Post.findByIdAndDelete(postId);
        console.log("Post deleted");
        return NextResponse.json(
          { message: "Post deleted successfully", success: true },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
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
