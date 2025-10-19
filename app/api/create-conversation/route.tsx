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
    const { _id, participants, lastMessage, unread } = body;

    // Basic validation
    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length < 2
    ) {
      return NextResponse.json(
        { error: "At least two participants are required" },
        { status: 400 }
      );
    }

    // Create new conversation
    const conversation = await Conversation.create({
      participants,
      lastMessage,
      unread,
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
