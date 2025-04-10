"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import LanguageModal from "@/components/profile_dialogs/LanguageDialog"; // 👈 import modal

interface Language {
  name: string;
  proficiency: string;
}

type User = {
  language: Language[];
};

export default function LanguageSection() {
  const { user } = useUser() as { user: User | null };
  const languages = user?.language ?? [];

  const visibleLanguages = languages.slice(0, 2);
  const hasMoreLanguages = languages.length > 2;

  // 👇 modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
      <LanguageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-xl font-semibold">Languages</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsModalOpen(true)} // 👈 open modal
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div>
            {visibleLanguages.map((language, index) => (
              <div
                key={language.name}
                className={`px-6 py-4 ${index < visibleLanguages.length - 1 ? "border-b" : ""}`}
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
