"use client";

import { Pencil, Plus, ArrowLeft } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { Container } from "@/components/layout/container";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/profile_modals/LanguageModal"; // 👈 import modal
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { ObjectId } from "mongoose";

export default function LanguagesPage() {
  interface Language {
    name: string;
    proficiency: string;
    _id: ObjectId
  }

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user }: any = useUser();
  const language: Language[] | undefined = user?.language;
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [targetId, setTargetId] = useState("");
  const [isEditing, setIsEditing] = useState(false)


  return (
    <Container>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-7">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-3 bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ArrowLeft
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => router.push("/profile")}
                />
                <h2 className="text-xl font-semibold">Languages</h2>
              </div>
              <button
                className="text-gray-700 hover:text-black"
                onClick={() => {
                setName("")
                setLevel("")  
                  setIsModalOpen(true)
                
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y">
              {(language ?? []).map((lang, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-sm text-gray-500">{lang.proficiency}</p>
                  </div>
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => {
                      setIsModalOpen(true);
                      setName(lang.name);
                      setLevel(lang.proficiency);
                      setTargetId(lang._id.toString());
                      setIsEditing(true)
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar Image */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow">
              <IKImage
                src={
                  "https://ik.imagekit.io/ConnectIn/ConnectIn-ad.JPG?updatedAt=1744466100792"
                }
                alt="LinkedIn Ad"
                className="w-full h-auto object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
      <LanguageModal
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false)
          setIsEditing(false)
        }}
        name={name}
        level={level}
        edit={isEditing}
        targetId={targetId}
      />
    </Container>
  );
}
