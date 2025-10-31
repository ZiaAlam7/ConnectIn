import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Conversation from "@/models/Conversation.model";
import Message from "@/models/Message.model"; // ✅ import Message model
import connectToDatabase from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";

// DELETE /api/conversations
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectToDatabase();

    const body = await request.json();
    const { conversationId } = body;

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return NextResponse.json(
        { error: "Invalid conversation ID" },
        { status: 400 }
      );
    }

    // Check if conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // 🧹 Delete all related messages first
    await Message.deleteMany({ chat: conversationId });

    // 🗑️ Then delete the conversation
    await Conversation.findByIdAndDelete(conversationId);

    return NextResponse.json(
      { message: "Conversation and related messages deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation", details: error.message },
      { status: 500 }
    );
  }
}
