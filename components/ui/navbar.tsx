"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Home,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import connectinLogo from "../../public/ConnectIn icon.jpg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { IKImage } from "imagekitio-next";
import { signOut } from "next-auth/react";
import SearchPeople from "@/components/ui/search-people";


type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

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
    title: "Messaging",
    href: "/messaging",
    icon: MessageSquare,
  },
  
];

export function Navbar() {
  const pathname = usePathname();
  

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
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background p-1">
      <div className="container flex h-14 items-center px-4 sm:px-6 max-w-[75%] mx-auto ">
        <div className="flex items-center gap-3 md:gap-5 w-[30%]">
          <Link href="/home" className="flex items-center">
            <img
              src="/ConnectIn icon.jpg"
              alt="ConnectIn Logo"
              className="h-8 w-8 rounded"
            />
            {/* <Image src={connectinLogo} alt="ConnectIn Logo" width={8} height={8} /> */}
            <span className="sr-only">ConnectIn</span>
          </Link>

          <div className= "w-full">
              <SearchPeople/>
            
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1">
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
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
                  </div>
                  <nav className="grid gap-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent",
                          pathname === item.href ? "bg-accent" : ""
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
