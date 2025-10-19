import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "@/models/Message.model";
import Conversation from "@/models/Conversation.model";
import connectToDatabase from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    await connectToDatabase();

    const message = await request.json();
console.log("this is message: ", message)
    
    const newMessage = await Message.create(message);

    const updatedChat = await Conversation.findByIdAndUpdate(
      message.chat,
      {
        $set: { lastMessage: newMessage._id, updatedAt: new Date() },
      },
      { new: true } 
    );

    return NextResponse.json(
      { message: "Message sent successfully", newMessage},
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 }
    );
  }
}
