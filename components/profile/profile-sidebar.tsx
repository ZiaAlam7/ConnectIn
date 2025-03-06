import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Bookmark, Eye } from "lucide-react"

export default function ProfileSidebar() {
  return (
    <div className="space-y-6 sticky top-6 w-full">
      {/* Profile Strength */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Profile Strength</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
          </div>
          <p className="text-sm text-gray-500">All-Star</p>
        </CardContent>
      </Card>

      {/* Dashboard */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Your Dashboard</h3>
          <p className="text-sm text-gray-500 mb-4">Private to you</p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
            <div>
              <p className="font-semibold">284</p>
              <p className="text-xs text-gray-500">Profile views</p>
            </div>
            <div>
              <p className="font-semibold">42</p>
              <p className="text-xs text-gray-500">Post impressions</p>
            </div>
            <div>
              <p className="font-semibold">18</p>
              <p className="text-xs text-gray-500">Search appearances</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Bookmark className="h-4 w-4 text-gray-500" />
              <span>My items</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-gray-500" />
              <span>Who viewed your profile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People Also Viewed */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">People also viewed</h3>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <Image
                  src={`/placeholder.svg?height=48&width=48&text=User${i}`}
                  alt="User"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-medium text-sm">Sarah Thompson</p>
                  <p className="text-xs text-gray-500">Product Designer at DesignCo</p>
                  <Button variant="outline" size="sm" className="mt-1 h-6 sm:h-7 text-xs rounded-full px-2 sm:px-3">
                    <Users className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* People You May Know */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">People you may know</h3>

          <div className="space-y-4">
            {[4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <Image
                  src={`/placeholder.svg?height=48&width=48&text=User${i}`}
                  alt="User"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-medium text-sm">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Frontend Developer at WebTech</p>
                  <Button variant="outline" size="sm" className="mt-1 h-6 sm:h-7 text-xs rounded-full px-2 sm:px-3">
                    <Users className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

