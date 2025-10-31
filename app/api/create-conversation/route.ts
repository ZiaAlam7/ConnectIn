import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Conversation from "@/models/Conversation.model";
import connectToDatabase from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectToDatabase();

    const body = await request.json();
    const { participants } = body;


    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length !== 2
    ) {
      return NextResponse.json(
        { error: "Exactly two participants are required" },
        { status: 400 }
      );
    }

    // Sort participant IDs so order doesn’t matter
    const sortedParticipants = [...participants].sort();


    const existingConversation = await Conversation.findOne({
      participants: { $all: sortedParticipants, $size: 2 },
    });

    if (existingConversation) {
      return NextResponse.json(
        { message: "Conversation already exists", conversation: existingConversation },
        { status: 200 }
      );
    }

    // Otherwise, create a new conversation
    const conversation = await Conversation.create({
      participants: sortedParticipants,
    });

    return NextResponse.json(
      { message: "Conversation created successfully", conversation },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation", details: error.message },
      { status: 500 }
    );
  }
}
