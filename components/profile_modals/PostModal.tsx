"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";
import { IKUpload } from "imagekitio-next";
import axios from "axios";
import { usePost } from "@/context/PostContext";




type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const { user }: any = useUser();
  const fullName = user?.full_name;
  const image = user?.profile_image;
  const user_id = user?._id;
  const [postText, setPostText] = useState("");
  const [postMedia, setPostMedia] = useState("");

    const { post, setPost }: any = usePost();
  

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setPostMedia("")
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const onSuccess = async (res: any) => {
    console.log("Success", res);

    setPostMedia(res.url);
    console.log(res.url);

  };

  const handlePost = async () => {
    console.log("Sending user ID to backend:", user_id);
    console.log("typeof user_id:", typeof user_id);

    const values = {
      content: postText,
      image: postMedia,
      userId: user_id,
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

      // {
      //   _id: "temp_" + Math.random(),
      //   userId: user,
      //   content: postText,
      //   image: postMedia,
      //   likes: [],
      //   comments: [],
      //   createdAt: new Date().toISOString(),
      // };

      setPost([newPost, ...post]);
      setPostMedia("")
    
    } catch (error: any) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={() => {
            onClose()
          setPostMedia("")
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        {/* Header: User info */}
        <div className="flex items-center gap-3 mb-4">
          {/* <img
            src="/profile.jpg" // replace with your actual image path
            alt="Profile"
            className="h-12 w-12 rounded-full border object-cover"
          /> */}
          <IKImage
            src={image}
            alt="Profile Picture"
            className="rounded-full border object-cover"
            width={60}
            height={60}
          />
          <div>
            <h2 className="text-lg font-semibold">{fullName}</h2>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows={5}
          placeholder="What do you want to talk about?"
          className="w-full resize-none border-none text-xl placeholder-gray-500 focus:outline-none"
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>

       {postMedia && <IKImage
          src={postMedia}
          alt="Profile Picture"
          className="rounded-sm border object-cover"
          width={60}
          height={60}
        />}

        {/* Footer: Icon + Post button */}
        <div className="mt-6 flex items-center justify-between">
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => uploadRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <IKUpload
            ref={uploadRef}
            className="hidden" // Hides the default UI
            onSuccess={onSuccess}
          />
          <button
          disabled={!postMedia && !postText}
            onClick={() => {
              handlePost()
              onClose()
            }}
            className="rounded-full bg-[var(--mainGreen)] px-6 py-2 text-white hover:bg-[var(--mainGreenDark)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
