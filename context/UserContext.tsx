"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the User type (customize it based on your API response)
type User = {
  id: string;
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

  // Fetch user data when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user-detail"); // Adjust API endpoint
        const data: User = await res.json();
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
