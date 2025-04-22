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

import { MoreVertical } from "lucide-react";
import { useRef, useEffect } from "react";

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
  const userId = user?._id;
  const PostUserLiked = user?.liked;
  const { post, setPost }: any = usePost();

  const [commentPostId, setCommentPostId]: any = useState();
  const [likePostId, setLikePostId] = useState();
  const [commentText, setCommentText] = useState("");

  const [menuOpenPostId, setMenuOpenPostId] = useState<string | null>("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Function to calculate the time ago a post or comment was made
  function getTimeAgo(dateString: string): string {
    const createdAt = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const handleComment = async () => {
    const values = {
      userId: userId,
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

      const updatedPosts = post.map((p: PostType) =>
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
      userId: userId,
    };

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
      const updatedPosts = post.map((p: PostType) =>
        p._id === postId
          ? {
              ...p,
              likes:
                target === "like"
                  ? [...p.likes, userId]
                  : p.likes.filter((id: string) => id !== userId),
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

  const handleDeletePost = async (postId: string) => {
    console.log("Trying to delete post:", postId);

    try {
      await axios.post(
        "/api/post-post",
        { target: "delete post", postId, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the context immediately
      const updatedPosts = post.filter((p: PostType) => p._id !== postId);
      setPost(updatedPosts);
      setMenuOpenPostId(null);
      console.log("Post deleted");
    } catch (error: any) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (menuOpenPostId) {
      console.log("menuOpenPostId updated:", menuOpenPostId);
    }
  }, [menuOpenPostId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenPostId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!post || !Array.isArray(post)) {
    return <p className="text-center">No posts to show.</p>;
  }

  return (
    <>
      {post.map((post, index) => (
        <div
          key={index}
          className="w-full max-w-[35rem] mx-auto py-4 bg-white rounded-lg border-2 "
        >
          <div className="flex items-center justify-between px-4">
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
                  {post.userId?.full_name}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {post.userId?.headline}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {getTimeAgo(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Three-dot menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => {
                  setMenuOpenPostId(post._id);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {menuOpenPostId === post._id && (
                <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
                  <button
                    disabled={post.userId._id !== userId}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={() =>console.log("hello")}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
                    disabled={post.userId._id !== userId}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={() =>console.log(menuOpenPostId , post._id)}
                  >
                    Delete
                  </button>
          <div className="mt-4 space-y-4">
            <p className=" text-sm leading-tight px-4">{post.content}</p>
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
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    disabled={commentText === ""}
                    className="rounded-full bg-[var(--mainGreen)] px-4 py-2 text-white hover:bg-[var(--mainGreenDark)] disabled:opacity-50"
                    onClick={() => {
                      if (commentText !== "") {
                        handleComment();
                      }
                    }}
                  >
                    Comment
                  </button>
                </div>
              </div>

              <div>
                {post.comments.map((item: any, index: number) => (
                  <div key={index}>
                    <CommentComponent
                      comment={item}
                      postId={commentPostId}
                      userId={userId}
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
