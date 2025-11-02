"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, MessageSquare, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { IKImage } from "imagekitio-next";
import { useUser } from "@/context/UserContext";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchPeople from "@/components/ui/search-people";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { title: "Home", href: "/home", icon: Home },
  { title: "My Network", href: "/mynetwork", icon: Users },
  { title: "Messaging", href: "/messaging", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user }: any = useUser();

  const userProfileImage = user?.profile_image;
  const job = user?.work?.[0]?.job_title;
  const fullName = user?.full_name;

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background p-1">
      <div className="container flex h-14 items-center px-4 sm:px-6 max-w-[75%] mx-auto">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-3 md:gap-5 sm:w-[30%] w-[95%]">
          <Link href="/home" className="flex items-center">
            <img
              src="/ConnectIn icon.jpg"
              alt="ConnectIn Logo"
              className="h-8 w-8 rounded"
            />
            <span className="sr-only">ConnectIn</span>
          </Link>

          <div className="w-full">
            <SearchPeople />
          </div>
        </div>

        {/* Right: Nav + User */}
        <div className="flex flex-1 items-center justify-end space-x-1">
          {/* Desktop nav */}
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

          {/* Mobile nav (hamburger menu) */}
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
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

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

          {/* 👇 MOBILE PROFILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => router.push("/profile")}
          >
            <IKImage
              src={userProfileImage}
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={32}
              height={32}
            />
          </Button>

          {/* 👇 DESKTOP DROPDOWN MENU */}
          <div className="hidden md:block">
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
      </div>
    </header>
  );
}
