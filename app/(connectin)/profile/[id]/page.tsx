"use client";

import { use } from "react"; // 👈 new React 18.3+ hook
import { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/profile-header";
import AboutSection from "@/components/profile/about-section";
import ActivitySection from "@/components/profile/activity-section";
import ExperienceSection from "@/components/profile/work-section";
import EducationSection from "@/components/profile/education-section";
import SkillsSection from "@/components/profile/skills-section";
import LanguagesSection from "@/components/profile/languages-section";
import { Container } from "@/components/layout/container";

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap the Promise with React.use()

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


  if (!user) return <p>Loading...</p>;

  return (
    user !== null && (<Container>
      <div className="pt-6">
        <div className="space-y-6 w-[75%] mx-auto">
          <ProfileHeader other_user={user}/>
          <AboutSection other_user={user}/>
          <ActivitySection other_user={user}/>
          <ExperienceSection other_user={user}/>
          <EducationSection other_user={user}/>
          <SkillsSection other_user={user}/>
          <LanguagesSection other_user={user}/>
        </div>
      </div>
    </Container>)
  );
}
