import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SkillsSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Skill Category 1 */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold mb-3">Top Skills</h3>
        <div className="flex flex-wrap gap-2 max-w-full">
          <SkillBadge name="React.js" endorsements={42} />
          <SkillBadge name="TypeScript" endorsements={38} />
          <SkillBadge name="Node.js" endorsements={35} />
          <SkillBadge name="AWS" endorsements={31} />
          <SkillBadge name="System Design" endorsements={28} />
        </div>
      </div>

      {/* Skill Category 2 */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold mb-3">Industry Knowledge</h3>
        <div className="flex flex-wrap gap-2 max-w-full">
          <SkillBadge name="Software Development" endorsements={25} />
          <SkillBadge name="Web Development" endorsements={22} />
          <SkillBadge name="Agile Methodologies" endorsements={19} />
          <SkillBadge name="Cloud Computing" endorsements={17} />
          <SkillBadge name="DevOps" endorsements={15} />
        </div>
      </div>

      {/* Skill Category 3 */}
      <div>
        <h3 className="font-semibold mb-3">Tools & Technologies</h3>
        <div className="flex flex-wrap gap-2 max-w-full">
          <SkillBadge name="Git" endorsements={20} />
          <SkillBadge name="Docker" endorsements={18} />
          <SkillBadge name="Kubernetes" endorsements={16} />
          <SkillBadge name="GraphQL" endorsements={14} />
          <SkillBadge name="MongoDB" endorsements={12} />
        </div>
      </div>
    </div>
  )
}

function SkillBadge({ name, endorsements }: { name: string; endorsements: number }) {
  return (
    <Badge variant="outline" className="py-2 px-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">
      <span>{name}</span>
      {endorsements > 0 && <span className="ml-1 sm:ml-2 text-xs text-gray-500">• {endorsements}</span>}
    </Badge>
  )
}

