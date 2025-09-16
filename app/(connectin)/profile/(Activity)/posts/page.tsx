"use client";

import React from "react";
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import Post from "@/components/home/post";

const page = () => {
  const { post, setPost }: any = usePost();
  const { user, setUser }: any = useUser();
  const userId = user?._id;

  const filteredPosts = (post ?? []).filter(
    (item: any) => item.userId._id === userId
  );

  console.log(filteredPosts)

  return (
    
    <div className="flex flex-col gap-2">
      {filteredPosts.map((item: any, index: any) => (
        <div key={index}>
          <Post postP={item} />
        </div>
      ))}
    </div>
  );
};

export default page;
