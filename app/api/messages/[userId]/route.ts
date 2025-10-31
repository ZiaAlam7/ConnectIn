import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message.model";

interface Params {
  params: { userId: string }; // The other user's ID
}

export async function GET(req: Request, context: Params) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const currentUserId = searchParams.get("currentUserId");

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Missing currentUserId query param" },
        { status: 400 }
      );
    }

    const otherUserId = context.params.userId;

    // Fetch messages between currentUserId and otherUserId
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 }); // oldest → newest

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages/[userId] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
