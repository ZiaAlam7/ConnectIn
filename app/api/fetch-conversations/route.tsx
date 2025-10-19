import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import Conversation from "@/models/Conversation.model";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    await connectToDatabase();

    const allConversation = await Conversation.find()
    .populate('lastMessage', 'content')
    .populate('participants', 'userId full_name profile_image')


    if (!allConversation) {
      return NextResponse.json(
        { error: "No Conversation availabe" },
        { status: 404 }
      );
    }

    // console.log("These are all the conversations", allConversation);
    return NextResponse.json(
      {
        message: "Conversation Fetched successfully",
        success: true,
        allConversation: allConversation,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Fetch Conversations" },
      { status: 500 }
    );
  }
}
