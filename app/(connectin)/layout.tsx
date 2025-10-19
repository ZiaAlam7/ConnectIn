"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import logo from "../../public/Connectin_logo.png";
import Image from "next/image";
import imagekitUpload from "@/components/imageKit/IKUpload";
// import { useEffect, useState } from "react";
import axios from "axios";

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [profileImg, setProfileImg] = useState(
  //   "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814"
  // );

  // useEffect(() => {
  //   const fetchUserDetail = async () => {
  //     try {
  //       const response = await axios.get("/api/user-detail"); // Request to Next.js API route
  //       const imgurl = response.data.detail.profile_image;
  //       setProfileImg(imgurl);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchUserDetail();
  // }, []);


  const pathname = usePathname();

  // to check if i am on the messaging page
  const hideNavbar = pathname.startsWith("/messaging");

  return (
    <>
    {/* <div className="bg-gray-50 min-h-screen pb-16"> */}
    <div className="bg-gray-50 min-h-screen">
         {!hideNavbar && <Navbar />}
      <main >{children}</main>
      </div>
    </>
  );
}
