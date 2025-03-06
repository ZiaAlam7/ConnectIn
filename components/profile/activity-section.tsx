import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, Repeat, Send } from "lucide-react"

export default function ActivitySection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Activity</h2>
        <Button variant="outline" size="sm" className="rounded-full">
          See all
        </Button>
      </div>

      <div className="text-sm text-gray-500 mb-6">
        <span className="font-medium">3,621 followers</span>
        <p>Alex posts about web development, career growth, and tech industry trends</p>
      </div>

      {/* Sample Post */}
      <div className="border-t pt-4">
        <div className="flex items-start gap-3 mb-3">
          <Image
            src="/placeholder.svg?height=48&width=48"
            alt="Profile Picture"
            className="rounded-full"
            width={48}
            height={48}
          />
          <div>
            <p className="font-medium">Alex Johnson</p>
            <p className="text-xs text-gray-500">Senior Software Engineer at TechCorp</p>
            <p className="text-xs text-gray-500">2d • 🌎</p>
          </div>
        </div>

        <p className="mb-4">
          Just published a new article on optimizing React performance. Check it out and let me know your thoughts!
        </p>

        <div className="mb-4 rounded-lg overflow-hidden border">
          <Image
            src="/placeholder.svg?height=300&width=600"
            alt="Post Image"
            className="w-full"
            width={600}
            height={300}
          />
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pb-2">
          <div className="flex items-center gap-1">
            <span className="bg-blue-100 text-blue-600 rounded-full p-1">
              <ThumbsUp className="h-3 w-3" />
            </span>
            <span>142</span>
          </div>
          <div>24 comments • 7 reposts</div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap justify-between pt-2 border-t">
          <Button variant="ghost" size="sm" className="flex-1 rounded-md">
            <ThumbsUp className="h-5 w-5 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 rounded-md">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 rounded-md">
            <Repeat className="h-5 w-5 mr-2" />
            Repost
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 rounded-md">
            <Send className="h-5 w-5 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

