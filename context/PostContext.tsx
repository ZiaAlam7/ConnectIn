"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";



// Define the User type (customize it based on your API response)
type Post = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};

// Define the Context Type
interface PostContextType {
  post: Post | null;
  setPost: (user: Post | null) => void;

}

// Create Context (default value is null)
const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider Component
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/fetch-post");
        const data: Post = res.data.allPosts; // Adjust this based on your API structure
        console.log("asdasd")
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } 
    };
  
    fetchUser();
  }, []);
  
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom Hook to Access Context
export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
