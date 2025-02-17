import logo from "../../public/Connectin_logo.png";

import Image from "next/image";

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="h-[8vh] bg-[#F4F2F0] px-[5rem] py-2">
          <Image src={logo} alt="logo" width={180} />
        </div>
        <main>{children}</main>

    </>
  );
}
