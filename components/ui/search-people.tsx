"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function SearchPeople() {
  const { user }: any = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  // API call to get the user image and name
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/fetch-users");
        const data: any = res.data.allUsers;
        setUsers(data);
       

      } catch (error) {
        console.error("Failed to fetch post post_context:", error);
      }
    };

    fetchUser();
  }, []);

   console.log("These are the all users:", user)
 
  // Filter options based on search input
  const filteredUsers = (users ?? []).filter(
    (allUser: any) =>
      allUser.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      allUser.user_id !== user?.user_id
  );

    console.log("These one filteredUsers:", filteredUsers)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-nowrap bg-white border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primaryGreen"
      >
        Search People
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto z-[100]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b outline-none"
          />
          <ul>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((option: any) => (
                <li
                  key={option.user_id}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
                    router.push(`/profile/${option.user_id}`);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <img
                    src={option.profile_image}
                    alt={option.full_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{option.full_name}</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
