"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, CameraIcon } from "lucide-react";
import { ProfileImageOverlay } from "./image-change";
import { IKImage } from "imagekitio-next";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface Other_User_Props {
  other_user?: any;
}

const ProfileHeader = ({ other_user }: Other_User_Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { user: contextUser } = useUser();

  const [isOpen, setIsOpen] = useState(false); // For image overlay
  const [editOpen, setEditOpen] = useState(false); // For edit modal
  const [imageType, setImageType] = useState("");
  const [targetImage, setTargetImage] = useState(
    "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814"
  );

  const [user, setUser] = useState<any>(other_user ?? contextUser ?? null);

  useEffect(() => {
    if (other_user) {
      setUser(other_user);
    } else if (contextUser) {
      setUser(contextUser);
    }
  }, [other_user, contextUser]);

  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [country, setCountry] = useState(user?.address?.country ?? "");
  const [city, setCity] = useState(user?.address?.city ?? "");

  const fullName = `${user?.first_name} ${user?.last_name}`;
  const userProfileImage = user?.profile_image;
  const userCoverImage = user?.cover_image;
  const job = user?.work?.[0]?.job_title;
  const company = user?.work?.[0]?.company_name;


  useEffect(() => {
  if (user) {
    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setCountry(user.address?.country ?? "");
    setCity(user.address?.city ?? "");
  }
}, [user]);


  const loggedUser = contextUser?._id;

  // handle save
  const saveChanges = async () => {
    const updatedValues = {
      first_name: firstName,
      last_name: lastName,
      address: { country, city },
    };

    try {
      const res = await axios.post(
        "/api/user-info-update",
        updatedValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile Updated:", res.data);
      setEditOpen(false);
      window.location.reload();
    } catch (err: any) {
      console.error("Error updating user info:", err.response?.data || err.message);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded-b-xl w-full">
      {/* COVER IMAGE OVERLAY */}
      <ProfileImageOverlay
        isOpen={isOpen}
        imageType={imageType}
        onClose={() => setIsOpen(false)}
        targetImage={targetImage}
        onChangeImage={() => {
          setIsOpen(false);
          window.location.reload();
        }}
        onDeleteImage={() => {
          setIsOpen(false);
          window.location.reload();
        }}
      />

      {/* COVER IMAGE */}
      <div className="relative h-60 w-full">
        <IKImage
          src={userCoverImage}
          alt="Cover Image"
          className="object-cover w-full h-full rounded-t-xl"
          width={1200}
          height={400}
        />
        {!other_user && (
          <button
            className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            onClick={() => {
              setIsOpen(true);
              setImageType("cover_image");
              setTargetImage(userCoverImage);
            }}
          >
            <CameraIcon className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* PROFILE INFO */}
      <div className="px-6 pb-6 relative">
        {/* PROFILE PICTURE */}
        <div className="absolute -top-10 sm:-top-20 left-6 border-4 border-white rounded-full shadow-xl sm:left-8">
          <div className="relative">
            <IKImage
              src={userProfileImage}
              alt="Profile Picture"
              className="rounded-full object-cover w-[110px] h-[110px] sm:w-[160px] sm:h-[160px]"
              width={160}
              height={160}
            />
            {!other_user && (
              <button
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                onClick={() => {
                  setIsOpen(true);
                  setImageType("profile_image");
                  setTargetImage(userProfileImage);
                }}
              >
                <CameraIcon className="h-5 w-5 text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mb-4 pt-4">
          <div className="rounded-full">
            {other_user ? (
              <div className="h-4 w-4"></div>
            ) : (
              <PencilIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => setEditOpen(true)}
              />
            )}
          </div>
        </div>

        {/* USER INFO */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          {job && (
            <h2 className="text-lg text-gray-700">
              {job} at {company}
            </h2>
          )}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>
              {user?.address?.country}, {user?.address?.city}
            </span>
          </div>

          {other_user && (
            <div className="flex gap-2 mt-4">
              <Button
                className="rounded-full bg-[var(--mainGreen)] hover:bg-[var(--mainGreenDark)]"
                onClick={async () => {
                  const res = await axios.post("/api/create-conversation", {
                    participants: [other_user._id, loggedUser],
                  });
                  router.push("/messaging");
                }}
              >
                Message
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ✏️ EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl shadow-xl sm:w-full w-[90vw] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Info</h2>

            <div className="space-y-3">
              <input
                className="w-full border outline-[var(--mainGreen)] rounded p-2"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-full border outline-[var(--mainGreen)] rounded p-2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="w-full border outline-[var(--mainGreen)] rounded p-2"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                className="w-full border outline-[var(--mainGreen)] rounded p-2"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="ghost" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[var(--mainGreen)]" onClick={saveChanges}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
