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
import { useToast } from "@/hooks/use-toast";

import { MoreVertical } from "lucide-react";
import { useRef, useEffect } from "react";

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  headline: string;
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
  postId: string;
  content: string;
  image: string;
  userId: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostListProps {
  post: PostType;
  postP: PostType;
  // setPost: (post: PostType) => void;
}

export default function PostList({ postP }: any) {
  const { user, setUser }: any = useUser();
  const userId = user?._id;
  const PostUserLiked = user?.liked;
  const { post, setPost }: any = usePost();
    const { toast } = useToast();

  const [commentPostId, setCommentPostId]: any = useState();
  const [likePostId, setLikePostId] = useState();
  const [commentText, setCommentText] = useState("");

  const [menuOpenPostId, setMenuOpenPostId] = useState<string | null>(null);
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
      console.log("comment addded:", response.data.data);

      const newComment = response.data.data;

      const updatedPost = post.map((p: PostType) =>
        p.postId === postId ? newComment : p
      );

      setPost(updatedPost);
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
        p.postId === postId
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
      const updatedPosts = post.filter((p: PostType) => p.postId !== postId);
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

  const handleRepost = async (postP: any) => {
console.log(postP)

    const values = {
      postId: postP.postId,
      content: postP.content,
      image: postP.image,
      userId: postP.userId,
      reposted_by: userId,
    };
    const target = "new post";

    try {
      const response = await axios.post(
        "/api/post-post",
        { target, values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newPost = response.data.data

      setPost([newPost, ...post]);
      // setPostMedia("")
    
    } catch (error: any) {
      console.error(
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
      <div className="w-full  mx-auto py-4 bg-white rounded-lg border-2 ">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <IKImage
              src={postP.userId.profile_image}
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={50}
              height={50}
            />
            <div>
              <p className="font-semibold text-sm leading-tight">
                {postP.userId?.full_name}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {postP.userId?.headline}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {getTimeAgo(postP.createdAt)}
              </p>
            </div>
          </div>

          {/* Three-dot menu */}

          <div className="relative " ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenPostId(postP.postId);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {postP.postId === menuOpenPostId && (
              <div
                className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10"
                onClick={(e) => e.stopPropagation()} // Prevents outside click handler
              >
                <button
                  disabled={postP.userId._id !== userId}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => handleDeletePost(postP.postId)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <p className=" text-sm leading-tight px-4">{postP.content}</p>
          {postP.image && (
            <AspectRatio ratio={16 / 9} className="w-full overflow-hidden">
              <IKImage
                src={postP.image}
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
              <span>{postP.likes.length}</span>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCommentPostId(postP?.postId)}
            >
              <FaRegCommentDots className="text-[var(--mainGreen)]" />
              <span>{postP.comments.length}</span>
            </div>
          </div>

          <div className="flex justify-around text-gray-700 pt-3 border-t mt-3">
            <button
              className={`flex items-center gap-1 ${
                PostUserLiked.includes(postP.postid)
                  ? "text-[var(--mainGreenDark)]"
                  : "hover:text-[var(--mainGreenDark)]"
              }`}
              onClick={() =>
                handleLike(
                  postP.postId,
                  PostUserLiked.includes(postP.postId) ? "unlike" : "like"
                )
              }
            >
              <FaThumbsUp />{" "}
              {PostUserLiked.includes(postP.postId) ? "Unlike" : "Like"}
            </button>

            <button
              className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]"
              onClick={() => setCommentPostId(postP?.postId)}
            >
              <FaRegCommentDots /> Comment
            </button>
            <button className="flex items-center gap-1 hover:text-[var(--mainGreenDark)]"
             onClick={() =>  handleRepost(postP)}
            >
              <FaShare /> Repost
            </button>
          </div>
        </div>
        {postP?.postId === commentPostId && (
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
              {postP.comments.map((item: any, index: number) => (
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
    </>
  );
}
