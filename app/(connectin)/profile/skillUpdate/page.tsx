"use client";

import { Pencil, Plus, ArrowLeft } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { Container } from "@/components/layout/container";
import { useRouter } from "next/navigation";
import SkillModal from "@/components/profile_dialogs/SkillDialog";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { isObjectIdOrHexString, ObjectId } from "mongoose";

export default function LanguagesPage() {
  

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user }: any = useUser();
  const skill: [] | undefined = user?.skill;
  const [name, setName] = useState("");
  const [skillIndex, setSkillIndex] = useState<number>()
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
                <h2 className="text-xl font-semibold">Skills</h2>
              </div>
              <button
                className="text-gray-700 hover:text-black"
                onClick={() => {
                setName("")
                setIsModalOpen(true)
                
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y">
              {(skill ?? []).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <p className="font-medium">{item}</p>
                  </div>
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => {
                      setName(item);
                      setIsEditing(true);
                      setSkillIndex(index)
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

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
      <SkillModal
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false)
          setIsEditing(false)
        }}
        name={name}
        edit={isEditing}
        skillIndex={skillIndex}
      />
    </Container>
  );
}
