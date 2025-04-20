import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  FaThumbsUp,
  FaRegCommentDots,
  FaShare,
  FaPaperPlane,
} from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";
import { usePost } from "@/context/PostContext";
import CommentComponent from "./commentComponent";
import { useState } from "react";
import axios from "axios";
import { Playwrite_BE_VLG } from "next/font/google";

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Comment {
  _id: string;
  text: string;
  userId: User;
  createdAt: string;
}

export interface PostType {
  _id: string;
  content: string;
  image: string;
  userId: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostListProps {
  posts: PostType[];
}

export default function PostList() {
  const { user, setUser }: any = useUser();
  const user_id = user?._id;
  const PostUserLiked = user?.liked;
  const { post, setPost }: any = usePost();

  const [commentPostId, setCommentPostId] = useState();
  const [likePostId, setLikePostId] = useState();
  const [commentText, setCommentText] = useState("");

  if (!post || !Array.isArray(post)) {
    return <p className="text-center">No posts to show.</p>;
  }

  const handleComment = async () => {
    const values = {
      userId: user_id,
      text: commentText,
    };
    const target = "comments";
    const postId = commentPostId;

    try {
      const response = await axios.post(
        "/api/post-post",
        { target, values, postId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("comment addded:", response.data);

      const newComment = {
        _id: "temp_" + Math.random(),
        userId: user,
        text: commentText,
        createdAt: new Date().toISOString(),
      };

      const updatedPosts = post.map((p) =>
        p._id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      );

      setPost(updatedPosts);
      setCommentText("");
    } catch (error: any) {
      console.error(
        "Error while adding comment:",
        error.response?.data || error.message
      );
    }
  };

  const handleLike = async (postId: string, target: string) => {
    const values = {
      userId: user_id,
    };
    console.log("clientside ", postId);

    try {
      const response = await axios.post(
        "/api/post-post",
        { target, values, postId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post Liked:", response.data);


      // Like and Unlike Local Update the Posts
      const updatedPosts = post.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes:
                target === "like"
                  ? [...p.likes, user_id]
                  : p.likes.filter((id: string) => id !== user_id),
            }
          : p
      );

      setPost(updatedPosts);

      // Like and Unlike Local Update the UserDetail
      const updatedUser = {
        ...user,
        liked:
          target === "like"
            ? [...user.liked, postId]
            : user.liked.filter((id: string) => id !== postId),
      };
      setUser(updatedUser);
    } catch (error: any) {
      console.error(
        "Error while liking post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {post.map((post, index) => (
        <div
          key={index}
          className="w-full max-w-[35rem] mx-auto py-4 bg-white rounded-lg border-2 mb-6"
        >
          <div className="px-4 gap-4 flex flex-col">
            <div className="flex items-center space-x-3">
              <IKImage
                src={post.userId.profile_image}
                alt="Profile Picture"
                className="rounded-full object-cover"
                width={50}
                height={50}
              />
              <div>
                <p className="font-semibold text-sm leading-tight">
                  {post.userId.full_name}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {post.userId.headline}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm whitespace-pre-line">{post.content}</p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {post.image && (
              <AspectRatio ratio={16 / 9} className="w-full overflow-hidden">
                <IKImage
                  src={post.image}
                  alt="Post image"
                  width={1280}
                  height={720}
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
            )}

            <div className="flex justify-between text-sm text-gray-600 mt-2 px-4">
              <div className="flex items-center space-x-2">
                <FaThumbsUp className="text-[var(--mainGreen)]" />
                <span>{post.likes.length}</span>
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setCommentPostId(post?._id)}
              >
                <FaRegCommentDots className="text-[var(--mainGreen)]" />
                <span>{post.comments.length}</span>
              </div>
            </div>

            <div className="flex justify-around text-gray-700 pt-3 border-t mt-3">
              <button
                className={`flex items-center gap-1 ${
                  PostUserLiked.includes(post._id)
                    ? "text-[var(--mainGreenDark)]"
                    : "hover:text-[var(--mainGreenDark)]"
                }`}
                onClick={() =>
                  handleLike(
                    post._id,
                    PostUserLiked.includes(post._id) ? "unlike" : "like"
                  )
                }
              >
                <FaThumbsUp />{" "}
                {PostUserLiked.includes(post._id) ? "Unlike" : "Like"}
              </button>

              <button
                className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]"
                onClick={() => setCommentPostId(post?._id)}
              >
                <FaRegCommentDots /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
                <FaShare /> Repost
              </button>
              <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]">
                <FaPaperPlane /> Send
              </button>
            </div>
          </div>
          {post?._id === commentPostId && (
            <div>
              <div className="px-2 py-4">
                <div className="w-full mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-1 cursor-pointer flex items-center justify-center gap-1">
                  <input
                    type="text"
                    className="w-[90%]  bg-white  p-2 outline-none"
                    placeholder="Write a Comment..."
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="rounded-full bg-[var(--mainGreen)] px-4 py-2 text-white hover:bg-[var(--mainGreenDark)]"
                    onClick={handleComment}
                  >
                    Comment
                  </button>
                </div>
              </div>

              <div>
                {post.comments.map((item: any, index: number) => (
                  <div key={index}>
                    <CommentComponent
                      profileImage={item?.userId?.profile_image}
                      name={item?.userId?.full_name}
                      comment={item?.text}
                      headline={item?.userId?.headline}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
