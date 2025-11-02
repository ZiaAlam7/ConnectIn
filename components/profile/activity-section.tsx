"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import { useRouter, useParams } from "next/navigation";

interface Other_User_Props {
  other_user?: any;
}

export default function ActivitySection({ other_user }: Other_User_Props) {
  const router = useRouter();
  const params = useParams(); // ✅ read the dynamic route params
  const { post }: any = usePost();
  const { user: contextUser } = useUser();

  const [user, setUser] = useState<any>(other_user ?? contextUser ?? null);
  const [activeTab, setActiveTab] = useState<"posts" | "comments" | "liked">("posts");

  // ✅ Extract ID from the URL if it exists
  const routeId = params?.id || params?.userId || null;

  useEffect(() => {
    if (other_user) setUser(other_user);
    else if (contextUser) setUser(contextUser);
  }, [other_user, contextUser]);

  // ✅ Use route param if user doesn't exist yet
  const userId = user?._id || routeId;

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();

  const filteredPosts = useMemo(() => {
    return (post ?? []).filter((item: any) => item.userId?._id === userId);
  }, [post, userId]);

  const filteredCommentedPosts = useMemo(() => {
    if (!user?.commented?.length) return [];
    return (post ?? []).filter((item: any) =>
      user.commented.some(
        (commentedId: any) => commentedId?.toString() === item.postId?.toString()
      )
    );
  }, [post, user?.commented]);

  const filteredLikedPosts = useMemo(() => {
    if (!user?.liked?.length) return [];
    return (post ?? []).filter((item: any) =>
      user.liked.some(
        (likedId: any) => likedId?.toString() === item.postId?.toString()
      )
    );
  }, [post, user?.liked]);

  const renderPostList = (posts: any[], emptyText: string) => {
    if (!posts.length)
      return <div className="py-8 text-center text-muted-foreground">{emptyText}</div>;

    return (
      <div className="space-y-6">
        <ul>
          {posts.slice(0, 3).map((item: any, index: number) => (
            <li
              className="cursor-pointer"
              key={item._id || index}
              onClick={() =>
                router.push(
                  other_user || routeId
                    ? `/profile/${userId}/posts`
                    : "/profile/posts"
                )
              }
            >
              <div className="border-b py-4">
                <div className="flex items-center gap-1 mb-2">
                  <span className="font-medium text-sm">{fullName}</span>
                  <span className="text-muted-foreground text-sm">
                    {item.reposted_by ? "reposted" : "posted"}
                  </span>
                </div>

                <div className="flex gap-3">
                  {item.image && (
                    <IKImage
                      src={item.image}
                      alt="Post image"
                      width={80}
                      height={80}
                      className="object-contain rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <p className="line-clamp-2">{item.content}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <ThumbsUp className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.likes.length}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{item.comments.length} comments</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Button variant="ghost" className="flex items-center gap-1">
            <Link
              href={
                other_user || routeId
                  ? `/profile/${userId}/posts`
                  : "/profile/posts"
              }
            >
              Show all posts
            </Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">Activity</h2>
      </CardHeader>

      <CardContent className="pb-1">
        <div className="w-full">
          {/* Tabs */}
          <div className="mb-4 grid w-full grid-cols-3 gap-2">
            {["posts", "comments", "liked"].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => setActiveTab(tab as any)}
                className={`rounded-full ${
                  activeTab === tab
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : ""
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>

          {/* Activity Content */}
          {activeTab === "posts" && renderPostList(filteredPosts, "No posts yet")}
          {activeTab === "comments" &&
            renderPostList(filteredCommentedPosts, "No comments yet")}
          {activeTab === "liked" &&
            renderPostList(filteredLikedPosts, "No liked posts yet")}
        </div>
      </CardContent>
    </Card>
  );
}
