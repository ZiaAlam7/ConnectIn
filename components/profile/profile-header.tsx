"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, CameraIcon, PlusIcon } from "lucide-react";
import { ProfileImageOverlay } from "./image-change";
import { IKImage } from "imagekitio-next";
import { useSession } from "next-auth/react";;
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const ProfileHeader = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const email = session?.user.email;
  const [isOpen, setIsOpen] = useState(false);
  const [imageType, setImageType] = useState("");
  const [targetImage, setTargetImage] = useState(
    "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814"
  );
  const { user }: any = useUser();
  const fullName = `${user?.first_name} ${user?.last_name}`;
  const imageKitUrl: string =
    imageType === "profile_image"
      ? "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814"
      : "https://ik.imagekit.io/ConnectIn/placeholder.svg?updatedAt=1743836732290";
  const userProfileImage = user?.profile_image;
  const userCoverImage = user?.cover_image;
  const country = user?.address?.country;
  const city = user?.address?.city;
  const job = user?.work[0]?.job_title;
  const company = user?.work[0]?.company_name;

  console.log("This is user ", user);

  const handleChangeImage = async () => {
    setIsOpen(false);
    window.location.reload();
  };

  const handleDeleteImage = async () => {
    const target = imageType;
    const values = imageKitUrl;
    try {
      const response = await axios.post(
        "/api/user-update",
        { target, values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image Changed:", response.data);
    } catch (error: any) {
      console.error(
        "Error while deleting image:",
        error.response?.data || error.message
      );
    }
    setIsOpen(false);
    window.location.reload();
  };

  // if (!user) return <LoadingSpinner />;

  return (
    <div className="bg-white shadow rounded-b-xl w-full ">
      {/* Cover Image */}
      <ProfileImageOverlay
        isOpen={isOpen}
        imageType={imageType}
        onClose={() => setIsOpen(false)}
        targetImage={targetImage}
        onChangeImage={handleChangeImage}
        onDeleteImage={handleDeleteImage}
      />
      <div className="relative h-60 w-full">
        <IKImage
          src={userCoverImage}
          alt="Profile Picture"
          className="object-cover w-full h-full rounded-t-xl"
          width={1200}
          height={400}
        />

        <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
          <CameraIcon
            className="h-5 w-5 text-gray-700"
            onClick={() => {
              setIsOpen(true);
              setImageType("cover_image");
              setTargetImage(userCoverImage);
            }}
          />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        {/* Profile Picture */}
        <div className="absolute -top-20 left-6 border-4 border-white rounded-full shadow-xl sm:left-8">
          <div className="relative">
            <IKImage
              src={userProfileImage}
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={160}
              height={160}
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <CameraIcon
                className="h-5 w-5 text-gray-700"
                onClick={() => {
                  setIsOpen(true);
                  setImageType("profile_image");
                  setTargetImage(userProfileImage);
                }}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mb-4 pt-4">
          <Button variant="outline" size="sm" className="rounded-full">
            <PlusIcon className="h-4 w-4 mr-1" />
            Add profile section
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            More
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold">{fullName}</h1>
      {job && <h2 className="text-lg text-gray-700">
        {job} at {company}
      </h2>}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>
              {country}, {city}
            </span>
            <span className="mx-1">•</span>
            <span className="text-blue-600 font-medium">500+ connections</span>
            <span className="mx-1">•</span>
            <span className="text-blue-600 font-medium">Contact info</span>
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="rounded-full bg-[var(--mainGreen)] hover:bg-[var(--mainGreenDark)]">
              Message
            </Button>
            <Button variant="outline" className="rounded-full">
              Connect
            </Button>
            <Button variant="outline" className="rounded-full">
              More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
