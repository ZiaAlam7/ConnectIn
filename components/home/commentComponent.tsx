"use client";

import React, { useState, useRef, useEffect } from "react";
import { IKImage } from "imagekitio-next";
import { MoreVertical } from "lucide-react"; 
import axios from "axios";
import { usePost } from "@/context/PostContext";
import { ObjectId } from "mongoose";


interface CommentProps {
  comment: any; 
  postId: string;
  userId: ObjectId;
}



const CommentComponent: React.FC<CommentProps> = ({
  comment,
  postId,
  userId
}) => {

    const { post, setPost }: any = usePost();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

 const commentId = comment?._id;
  const commentAuthor = comment?.userId?._id;
  const profileImage = comment?.userId?.profile_image ?? "/default-avatar.png";
  const fullName = comment?.userId?.full_name ?? "Unknown User";
  const headline = comment?.userId?.headline ?? "";
  const text = comment?.text ?? "";



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


  // Close the menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const handleCommentDelete = async (target: string ) => {

    try {
      const response = await axios.post(
        "/api/post-post",
        { target, postId, commentId, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Comment deleted:", response.data);


      const updatedPosts = post.map((p: any) =>
        p.postId === postId
          ? {
              ...p,
              comments: p.comments.filter((c: any) => c._id !== commentId),
            }
          : p
      );

      setPost(updatedPosts);
  }
  catch (error: any) {
    console.error(
      "Error while deleting comment:",
      error.response?.data || error.message
    );
  }
}

  return (
    <div className="flex items-start justify-between p-4 bg-white rounded-lg shadow-sm border relative">
      <div className="flex items-start space-x-4">
        <IKImage
          src={profileImage}
          alt={`${fullName}'s profile picture`}
          className="rounded-full object-cover"
          width={40}
          height={40}
        />
        <div>
          <div className="mb-1">
            <p className="font-semibold text-sm leading-tight">{fullName}</p>
            <p className="text-xs text-gray-500 leading-tight">{headline}</p>
            <p className="text-xs text-gray-500 leading-tight">{getTimeAgo(comment.createdAt)}</p>
          </div>
          <p className="text-sm text-gray-800">{text}</p>
        </div>
      </div>

     
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
            <button
             disabled={commentAuthor !== userId}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                handleCommentDelete("delete comment")
                console.log("Delete clicked");
                setMenuOpen(false);
                
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
