"use client";

import ProfileCard from "@/components/home/profile-card";
import React, { useState } from "react";
import { IKImage } from "imagekitio-next";
import Post from "@/components/home/post";
import { usePost } from "@/context/PostContext";
import PostModal from "@/components/profile_modals/PostModal";

export default function HomePage() {
  const { post, setPost }: any = usePost();

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
        <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <div className="container max-w-[75%] mx-auto p-4 sm:p-6 grid grid-cols-[1fr_2fr_1fr] gap-6 ">
        <div className="sticky top-[4rem] h-fit lg:block hidden">
          <ProfileCard
          // name="Zia Alam ps"
          // title="Full Stack Web Dev | Next JS | React JS"
          // location="Pakistan"
          // university="Qurtuba University of Science and Information Technology"
          // profileImage="/zia-profile.jpg"
          // bannerImage="/banner.jpg"
          />
        </div>
        <div>
          <div>
            <div
             onClick={() => setIsModalOpen(true)}
              className="w-full  mx-auto mb-4 bg-white border border-gray-300 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition"
            >
              <p className="text-gray-600">Create a Post...</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {(post ?? []).map((item: any, index: any) => (
              <div key={index}>
              <Post postP={item}/>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block sticky top-[4rem] h-fit ">
          <div className="rounded-xl overflow-hidden shadow">
            <IKImage
              src={
                "https://ik.imagekit.io/ConnectIn/ConnectIn-ad.JPG?updatedAt=1744466100792"
              }
              alt="LinkedIn Ad"
              className="w-full h-auto object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}
