import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import logo from "../../public/Connectin_logo.png";
import IKProvider from "@/components/imageKit/IKProvider";
import { UserProvider } from "@/context/UserContext";
import { PostProvider } from "@/context/PostContext";
import Image from "next/image";
import AppLoader from "./AppLoader";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnectIn",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
 
}>) {
 

  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostProvider>
         <UserProvider>
        <IKProvider>
        <AppLoader>{children}</AppLoader>
        </IKProvider>
        </UserProvider>
        </PostProvider>

        <Toaster />
      </body>
    </html>
  );
}
