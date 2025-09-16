"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, Pencil, ArrowRight, ThumbsUp, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IKImage } from "imagekitio-next";
import Link from "next/link"
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from 'next/navigation';





export default function ActivitySection() {

  const router = useRouter();

  const { post, setPost }: any = usePost();
   const { user, setUser }: any = useUser();
   const userId = user?._id;
 

  const filteredPosts = (post ?? []).filter(
    (item: any) => item.userId._id === userId
  );

  const [activeTab, setActiveTab] = useState("posts");
  // const { user }: any = useUser();
  const fullName = `${user?.first_name} ${user?.last_name}`;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <h2 className="text-xl font-semibold">Activity</h2>
          <p className="text-sm text-muted-foreground">1,342 followers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full">
            Create a post
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-1">
        <div className="w-full">
          <div className="mb-4 grid w-full grid-cols-4 gap-2">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("posts")}
              className={`rounded-full ${
                activeTab === "posts"
                  ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white"
                  : ""
              }`}
            >
              Posts
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("comments")}
              className={`rounded-full ${
                activeTab === "comments"
                  ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white"
                  : ""
              }`}
            >
              Comments
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("videos")}
              className={`rounded-full ${
                activeTab === "videos"
                  ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white"
                  : ""
              }`}
            >
              Videos
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("images")}
              className={`rounded-full ${
                activeTab === "images"
                  ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white"
                  : ""
              }`}
            >
              Images
            </Button>
          </div>

             {/* Posts */}
             {activeTab === "posts" && (
            <div className="space-y-6">
              <ul>
              {filteredPosts.slice(0, 3).map((item: any, index: number) => (
                <li className="cursor-pointer" key={item._id || index}
                onClick={() => router.push("/profile/posts")}

                >
                <div className="border-b py-4">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-medium text-sm">{fullName}</span>
                    <span className="text-muted-foreground text-sm">
                      posted this
                    </span>
                    {/* <span className="text-muted-foreground text-sm">• 2d</span> */}
                  </div>

                  <div className="flex gap-3">
                  
                   {item.image && <IKImage
                src={item.image}
                alt="Post image"
                width={80}
                height={80}
                className="object-contain rounded-md"
              />}
                    <div className="flex-1">
                      <p className="line-clamp-2">
                        {item.content}
                      </p>
                      
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1">
                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <ThumbsUp className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.likes.length}</span>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{item.comments.length} comments</span>
                      {/* <span>•</span> */}
                      {/* <span>434 reposts</span> */}
                    </div>
                  </div>
                </div>
                </li>
              ))}
           </ul>
              {/* Show all posts link */}
              <div className="flex justify-center">
                <Button variant="ghost" className="flex items-center gap-1">
                  <Link href="/profile/posts">Show all posts</Link>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="py-8 text-center text-muted-foreground">
              No comments to display
            </div>
          )}

          {activeTab === "videos" && (
            <div className="py-8 text-center text-muted-foreground">
              No videos to display
            </div>
          )}

          {activeTab === "images" && (
            <div className="py-8 text-center text-muted-foreground">
              No images to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
