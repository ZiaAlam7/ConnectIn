"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import SkillModal from "../profile_dialogs/SkillDialog";

type User = {
  skill: string[];
};

export default function SkillsSection() {
  const router = useRouter();

  const { user } = useUser() as { user: User | null };
  const skills = user?.skill ?? [];
    const [isModalOpen, setIsModalOpen] = useState(false);


  const visibleSkills = skills.slice(0, 2);
  const hasMoreSkills = skills.length > 2;

  return (
    <>
    <SkillModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8"
          onClick={() => setIsModalOpen(true)} 
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"
           onClick={() => router.push("/profile/skillUpdate")}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {visibleSkills.map((skill, index) => (
            <div
              key={skill}
              className={`px-6 py-4 ${
                index < visibleSkills.length - 1 ? "border-b" : ""
              }`}
            >
              <h3 className="font-medium">{skill}</h3>
            </div>
          ))}
        </div>

        {hasMoreSkills && (
          <div className="flex justify-center py-4 border-t">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-muted-foreground"
              onClick={() => router.push("/profile/skillUpdate")}
            >
              Show all {skills.length} skills
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
