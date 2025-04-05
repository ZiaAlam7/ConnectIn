import ProfileHeader from "@/components/profile/profile-header"
import AboutSection from "@/components/profile/about-section"
import ActivitySection from "@/components/profile/activity-section"
import ExperienceSection from "@/components/profile/experience-section"
import EducationSection from "@/components/profile/education-section"
import CertificationsSection from "@/components/profile/certifications-section"
import SkillsSection from "@/components/profile/skills-section"
import LanguagesSection from "@/components/profile/languages-section"
import ProfileSidebar from "@/components/profile/profile-sidebar"
import { Container } from "@/components/layout/container"

export default function ProfilePage() {
  
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
  

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="lg:col-span-2 space-y-6">
          <ProfileHeader />
            <AboutSection />
            <ActivitySection />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <SkillsSection />
            <LanguagesSection />
          </div>
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
        </div>
      </Container>
    </div>
  )
}

