import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message.model";

export async function GET(request: Request, { params }: any) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const currentUserId = searchParams.get("currentUserId");
    const otherUserId = params.userId;

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Missing currentUserId query param" },
        { status: 400 }
      );
    }

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages/[userId] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
