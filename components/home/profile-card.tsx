"use client";

import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";
import { useSession } from "next-auth/react";


// interface ProfileCardProps {
//   name: string;
//   title: string;
//   location: string;
//   university: string;
//   profileImage: string;
//   bannerImage: string;
// }

// {
//     name,
//     title,
//     location,
//     university,
//     profileImage,
//     bannerImage,
//   }: ProfileCardProps

export default function ProfileCard() {
  const { data: session, status } = useSession();
  const email = session?.user.email;
  const { user }: any = useUser();
  const fullName = `${user?.first_name} ${user?.last_name}`;
  const userProfileImage = user?.profile_image;
  const userCoverImage = user?.cover_image;
  const headline = user?.headline;
  const country = user?.address?.country;
  const city = user?.address?.city;
  const education = user?.education[0];

  return (
    <div className="w-[15rem] h-fit bg-white rounded-xl shadow-md overflow-hidden border ">
      <div className="relative h-24">
        <IKImage
          src={userCoverImage}
          alt="Profile Banner"
          width={1200} 
          height={300} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative px-4">
        <div className="absolute -top-10">
          <IKImage
            src={userProfileImage}
            alt="Profile Picture"
            className="rounded-full border-4 border-white shadow-md"
            width={72}
            height={72}
          />
        </div>
      </div>
      <div className="pt-12 px-4 pb-4  flex flex-col ">
        <h2 className="font-semibold text-lg text-gray-900">{fullName}</h2>
        <p className="text-sm text-gray-700">{headline}</p>
        <div className="flex gap-2">
          {city && <p className="text-xs text-gray-500 mt-1">{city},</p>}
          <p className="text-xs text-gray-500 mt-1">{country}</p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <p className="text-xs text-gray-600">{education?.institute}</p>
        </div>
      </div>
    </div>
  );
}
