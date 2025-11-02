"use client";

import React, { useEffect } from "react";
import { use } from "react"; // ✅ important
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import Post from "@/components/home/post";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // ✅ unwrap the promise with use()
 

  const { post }: any = usePost();
  const { user, setUser }: any = useUser();



  if (!user) return <p>Loading...</p>;
console.log("These are posts: ", post )
console.log("These are IDDD: ", id )
  const filteredPosts = (post ?? []).filter(
    (item: any) => item.userId._id === id
  );

  return (
    <div className="flex flex-col gap-3 sm:w-[50vw] w-[90vw] m-auto">
      {filteredPosts.map((item: any, index: any) => (
        <div key={index}>
          <Post postP={item} />
        </div>
      ))}
    </div>
  );
};

export default Page;
