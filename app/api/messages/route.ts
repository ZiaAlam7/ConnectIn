import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message.model";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { senderId, receiverId, text } = await req.json();

    if (!senderId || !receiverId || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
