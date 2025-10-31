import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import Message from "@/models/Message.model";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    await connectToDatabase();

    const allMessages = await Message.find()
    //  .populate("sender", "full_name profile_image")
      // .populate({
      //   path: "chat",
      //   populate: { path: "participants", select: "full_name profile_image" },
      // })
      // .populate("sender", " user_id full_name profile_image")
      // .populate("chat", "_id participants");

 


    if (!allMessages) {
      return NextResponse.json(
        { error: "No messages availabe" },
        { status: 404 }
      );
    }

    // console.log("These are all the messages", allMessages);
    return NextResponse.json(
      {
        message: "Messages Fetched successfully",
        success: true,
        allMessages: allMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Fetch Messages" },
      { status: 500 }
    );
  }
}
