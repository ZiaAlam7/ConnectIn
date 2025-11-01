"use client";

import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import axios from "axios";

interface Other_User_Props {
  other_user?: any;
}

export default function AboutSection({ other_user }: Other_User_Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempText, setTempText] = useState("");
  const [target, setTarget] = useState("about");

  const { user: contextUser } = useUser();
  const [user, setUser] = useState<any>(other_user ?? contextUser ?? null);

  // if `other_user` changes, update
  useEffect(() => {
    if (other_user) {
      setUser(other_user);
    } else if (contextUser) {
      setUser(contextUser);
    }
  }, [other_user, contextUser]);


  const about = user?.about ?? "";
  const openModal = () => {
    setTempText(about);
    setIsOpen(true);
  };

  const saveChanges = async () => {
    const values = tempText;

    try {
      const response = await axios.post(
        "/api/user-update",
        { target, values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image Changed:", response.data);
    } catch (error: any) {
      console.error(
        "Error while changing image:",
        error.response?.data || error.message
      );
    }

    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      {about !== "" && (
        <div>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white p-6 rounded-2xl shadow-xl sm:w-full w-[90vw] max-w-xl z-50">
                <h2 className="text-xl font-semibold mb-4">Edit Text</h2>
                <textarea
                  className="w-full resize-none outline-[var(--mainGreen)] h-36 p-2 border rounded mb-4"
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveChanges} className="bg-[var(--mainGreen)]" >Save</Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">About</h2>
              <div className="flex justify-end gap-2 mb-4 pt-4">
                <div className="rounded-full">
                  {other_user ? (
                    <div className="h-4 w-4"></div>
                  ) : (
                    <PencilIcon className="h-4 w-4 cursor-pointer"
                      onClick={openModal}
                    />
                  )}
                </div>
              </div>
            </div>

            <p className="text-gray-700 whitespace-pre-line">{about}</p>
          </div>
        </div>
      )}
      {about === "" && (
        <div>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl z-50">
                <h2 className="text-xl font-semibold mb-4">Edit Text</h2>
                <textarea
                  className="w-full resize-none h-36 p-2 border rounded mb-4"
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveChanges}>Save</Button>
                </div>
              </div>
            </div>
          )}

          {!other_user && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Add a Summary about yourself
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-md  font-bold bg-yellow-400"
                  onClick={openModal}
                >
                  Add
                </Button>
              </div>

              <p className="text-gray-700 whitespace-pre-line">{about}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
