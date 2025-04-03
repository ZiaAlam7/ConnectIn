import { Navbar } from "@/components/ui/navbar";
import logo from "../../public/Connectin_logo.png";
import Image from "next/image";
import imagekitUpload from "@/components/imageKit/IKUpload";

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        <main>{children}</main>
    </>
  );
}
