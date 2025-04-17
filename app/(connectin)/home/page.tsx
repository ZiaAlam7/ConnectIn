"use client"

import ProfileCard from '@/components/home/profile-card'
import React from 'react'
import { IKImage } from "imagekitio-next";
import Post from '@/components/home/post';
import { usePost } from '@/context/PostContext';






export default function HomePage() {

   const { post }: any = usePost();
console.log(post)

  return (
    <>
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
      <div className='flex flex-col gap-2'>
      {Array.from({ length: 10 }).map((_, i) => (
    <Post key={i} />
  ))}
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
  )
}





