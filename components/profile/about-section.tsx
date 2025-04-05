"use client";

import { PencilIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export default function AboutSection() {
  const { user }: any = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const about = user?.about;
  const [tempText, setTempText] = useState("");
  const [target, setTarget] = useState("about");

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

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">About</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={openModal}
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
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
        </div>
      )}
    </>
  );
}
