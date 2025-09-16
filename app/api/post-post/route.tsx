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

    console.log("This is target: ", target);
    console.log("This is values: ", values);
    console.log("This is postId: ", postId);
    console.log("This is commentId: ", commentId);
    console.log("This is userId: ", userId);

    await connectToDatabase();

    if (target === "new post") {
      if (!values.content && !values.image) {
        return NextResponse.json(
          { message: "Cannot add empty post", success: false },
          { status: 403 }
        );
      }

      try {
        const newPost = await Post.create(values);
        await newPost.save();
        const populatedPost = await Post.findOne(newPost.postId)
          .populate("userId", "full_name headline profile_image")
          .populate("comments.userId", "full_name headline profile_image");

        return NextResponse.json({
          message: "Post created successfully",
          success: true,
          data: populatedPost,
        });
      } catch (error) {
        console.error("Post creation error:", error);
        return NextResponse.json(
          { message: "Failed to create post", success: false },
          { status: 500 }
        );
      }
    }

    try {
      if (target === "comments" && String(values.text).trim() !== "") {
        const newComment = await Post.findOneAndUpdate(
          { postId },
          {
            $push: {
              comments: {
                userId: values.userId,
                text: values.text,
                createdAt: new Date(),
              },
            },
          },
          { new: true }
        )
          .populate("userId", "full_name headline profile_image")
          .populate("comments.userId", "full_name headline profile_image");


        await UserDetail.findOneAndUpdate(
          { email },
          { $addToSet: { commented: postId } }
        );
        return NextResponse.json({
          message: "Comment Added Successfully",
          success: true,
          data: newComment,
        });
      }
    } catch (error) {
      console.error("Error while adding comment:", error);
    }

    
    try {
      if (target === "delete comment") {
        const post = await Post.findOne({
          postId,
          comments: {
            $elemMatch: {
              _id: commentId,
              userId: userId,
            },
          },
        });

         await UserDetail.findOneAndUpdate(
          { email },
          { $pull: { commented: postId } }
        );

        if (!post) {
          return NextResponse.json(
            { message: "Unauthorized or comment not found", success: false },
            { status: 403 }
          );
        }

        await Post.findOneAndUpdate(
          { postId },
          {
            $pull: { comments: { _id: commentId } },
          }
        );

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



      // Code for liking and unliking a post
    try {
      if (target === "like") {
        // Add like
        await Post.findOneAndUpdate(
          { postId },
          { $addToSet: { likes: values.userId } }
        );
        await UserDetail.findOneAndUpdate(
          { email },
          { $addToSet: { liked: postId } }
        );
        console.log("Liked");
      } else if (target === "unlike") {
        // Remove like
        await Post.findOneAndUpdate(
          { postId },
          { $pull: { likes: values.userId } }
        );
        await UserDetail.findOneAndUpdate(
          { email },
          { $pull: { liked: postId } }
        );
        console.log("Unliked");
      }
    } catch (error) {
      console.error("Error while updating like/unlike:", error);
    }

    
    try {
      if (target === "delete post") {
        const post = await Post.findOne({ postId });

        if (String(post.userId) !== userId) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 403 }
          );
        }

        await Post.findOneAndDelete({ postId });
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
