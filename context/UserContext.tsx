"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";



// Define the User type (customize it based on your API response)
type User = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
};

// Define the Context Type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;

}

// Create Context (default value is null)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user-detail");
        const data: User = res.data.detail; // Adjust this based on your API structure
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } 
    };
  
    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Access Context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
