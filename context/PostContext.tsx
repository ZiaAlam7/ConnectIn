"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Comment {
  _id: string;
  text: string;
  userId: User;
  createdAt: string;
}

export interface Post {
  _id: string;
  postId?: string;
  content: string;
  image: string;
  userId: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  reposted_by?: any;
}

export interface PostContextType {
  post: Post[];
  setPost: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/fetch-post");
        const data: Post[] = res.data.allPosts;

        if (Array.isArray(data)) {
          setPost(data);
        } else if (data) {
          setPost([data]);
        } else {
          setPost([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts (PostContext):", error);
        setPost([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};


export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
