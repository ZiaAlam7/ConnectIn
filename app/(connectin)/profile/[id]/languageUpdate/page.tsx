"use client";

import { Pencil, Plus, ArrowLeft } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { Container } from "@/components/layout/container";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/profile_modals/LanguageModal";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { ObjectId } from "mongoose";
import { usePathname } from "next/navigation";

export default function LanguagesPage() {
  interface Language {
    name: string;
    proficiency: string;
    _id: ObjectId
  }

  const router = useRouter();


  const pathname = usePathname(); 

  const parts = pathname.split("/");
  const id = parts[2]; 

  const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch(`/api/others-profile/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      };
      fetchUser();
    }, [id]);
    
  
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
                  onClick={() => router.push(`/profile/${id}`)}
                />
                <h2 className="text-xl font-semibold">Languages</h2>
              </div>
             
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

    </Container>
  );
}
