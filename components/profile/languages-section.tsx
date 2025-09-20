'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import LanguageModal from "@/components/profile_modals/LanguageModal"; 

interface Language {
  name: string;
  proficiency: string;
}

type User = {
  language: Language[];
};

interface Other_User_Props {
  other_user?: any;
}


export default function LanguageSection({ other_user }: Other_User_Props) {

  const router = useRouter();

   const { user: contextUser } = useUser();
      const [user, setUser] = useState<any>(other_user ?? contextUser ?? null);
    
      useEffect(() => {
        if (other_user) {
          setUser(other_user);
        } else if (contextUser) {
          setUser(contextUser);
        }
      }, [other_user, contextUser]);

  const languages = user?.language ?? [];

  const visibleLanguages = languages.slice(0, 2);
  const hasMoreLanguages = languages.length > 2;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <LanguageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <CardHeader className="flex  flex-row items-center justify-between pb-2">
          <h2 className="text-xl font-semibold">Languages</h2>
          {!other_user && <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsModalOpen(true)} 
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"
            onClick={() => router.push('/profile/languageUpdate')}
            >
              <Pencil className="h-4 w-4" 
              
              />
            </Button>
          </div>}
        </CardHeader>
        <CardContent className="p-0 ">
          <div>
            {visibleLanguages.map((language:any, index:number) => (
              <div
                key={index}
                className={`px-6 py-4 ${
                  index < visibleLanguages.length - 1 ? "border-b" : ""
                }`}
              >
                <h3 className="font-medium">{language.name}</h3>
                <p className="text-muted-foreground">{language.proficiency}</p>
              </div>
            ))}
          </div>

          {hasMoreLanguages && (
            <div className="flex justify-center py-4 border-t">
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-muted-foreground"
                onClick={() => !other_user ? router.push(`/profile/languageUpdate`) : router.push(`/profile/${user.user_id}/languageUpdate`)}
                
              >
                Show all {languages.length} languages
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
