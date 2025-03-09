import { Navbar } from "@/components/ui/navbar";
import logo from "../../public/Connectin_logo.png";
import Image from "next/image";


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
