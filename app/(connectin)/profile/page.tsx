"use client"
import ProfileHeader from "@/components/profile/profile-header"
import AboutSection from "@/components/profile/about-section"
import ActivitySection from "@/components/profile/activity-section"
import ExperienceSection from "@/components/profile/work-section"
import EducationSection from "@/components/profile/education-section"
import SkillsSection from "@/components/profile/skills-section"
import LanguagesSection from "@/components/profile/languages-section"
import ProfileSidebar from "@/components/profile/profile-sidebar"
import { Container } from "@/components/layout/container"
import { useUser } from "@/context/UserContext";



export default function ProfilePage() {
  const { user }: any = useUser();


  return (
      <Container>
        <div className=" pt-6 pb-8">
          <div className=" space-y-6 w-[75%] mx-auto">  
          <ProfileHeader/>
            <AboutSection />
            <ActivitySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <LanguagesSection/>
          </div>
        </div>
      </Container>

  )
}

