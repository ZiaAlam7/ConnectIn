import logo from "../../public/Connectin_logo.png";

import Image from "next/image";

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="h-[8vh] bg-[#F4F2F0] px-[5rem] py-2 w-[75%] m-auto">
          this is nav bar
        </div>
        <main>{children}</main>

    </>
  );
}
