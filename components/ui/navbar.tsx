"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Briefcase, Home, MessageSquare, Search, Users } from "lucide-react"
import axios from 'axios';
import Image from "next/image";
import connectinLogo from "../../public/ConnectIn icon.jpg";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";
import { signOut } from "next-auth/react";



type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/home",
    icon: Home,
  },
  {
    title: "My Network",
    href: "/mynetwork",
    icon: Users,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Messaging",
    href: "/messaging",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)

  //   const [profileImg, setProfileImg] = useState(
  //     "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814"
  //   );

  // useEffect(() => {
  //   const fetchUserDetail = async () => {
  //     try {
  //       const response = await axios.get('/api/user-detail'); // Request to Next.js API route
  //      const imgurl =  response.data.detail.profile_image
  //       setProfileImg(imgurl)
  //     } catch (err) {
  //       console.log(err)
  //     } 
  //   };

  //   fetchUserDetail();
  // }, []);

    const { user }: any = useUser();
    const userProfileImage = user?.profile_image;
    const job = user?.work[0]?.job_title;
    const fullName = user?.full_name;


   

    const handleLogout = () => {
      signOut({
        callbackUrl: "/login", // Redirect to home or login page after logout
      });
    };

  return (
    
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center px-4 sm:px-6 max-w-[75%] mx-auto">
        <div className="flex items-center gap-3 md:gap-5">
          <Link href="/" className="flex items-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-blue-600"
              fill="currentColor"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg> */}
            <img src="/ConnectIn icon.jpg" alt="ConnectIn Logo" className="h-8 w-8 rounded" />
            {/* <Image src={connectinLogo} alt="ConnectIn Logo" width={8} height={8} /> */}
            <span className="sr-only">ConnectIn</span>
          </Link>

          <div
            className={cn(
              "relative hidden md:flex items-center transition-all duration-300",
              isSearchFocused ? "w-80" : "w-64",
            )}
          >
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 h-9"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Mobile search button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="pt-14">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search" className="pl-8" autoFocus />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-1">
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-0.5">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile navigation */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 py-6">
                  <div className="flex items-center gap-2">
                    
                      <p className="text-sm font-medium">{fullName}</p>
                      <p className="text-xs text-muted-foreground">View Profile</p>
                  
                  </div>
                  <nav className="grid gap-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent",
                          pathname === item.href ? "bg-accent" : "",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t pt-4">
                    <Button variant="outline" className="w-full justify-start"
                    onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
              <IKImage
                src={userProfileImage}
                alt="Profile Picture"
                className="rounded-full object-cover"
                width={32}
                height={32}
              />
        
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <div>
                <IKImage
                src={userProfileImage}
                alt="Profile Picture"
                className="rounded-full object-cover"
                width={32}
                height={32}
              />
                </div>
                <div>
                  <p className="text-sm font-medium">{fullName}</p>
                  <p className="text-xs text-muted-foreground">{job}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings & Privacy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/language">Language</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

