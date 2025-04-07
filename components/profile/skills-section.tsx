"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Skill {
  name: string;
  // endorsements?: number
}

// interface SkillsSectionProps {
//   skills?: Skill[]
// }

// { skills = defaultSkills }: SkillsSectionProps

type User = {
  skill: string[];
};

export default function SkillsSection() {
  const { user } = useUser() as { user: User | null };
  const skills = user?.skill ?? [];

  const visibleSkills = skills.slice(0, 3);
  const hasMoreSkills = skills.length > 3;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
              {/* {skill.endorsements && <p className="text-muted-foreground">{skill.endorsements} endorsements</p>} */}
            </div>
          ))}
        </div>

        {hasMoreSkills && (
          <div className="flex justify-center py-4 border-t">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-muted-foreground"
            >
              Show all {skills.length} skills
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const defaultSkills: Skill[] = [
  {
    name: "JavaScript",
    // endorsements: 42,
  },
  {
    name: "React",
    // endorsements: 38,
  },
  {
    name: "Node.js",
    // endorsements: 27,
  },
  {
    name: "TypeScript",
    // endorsements: 23,
  },
  {
    name: "HTML/CSS",
    // endorsements: 19,
  },
];
