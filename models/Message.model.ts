import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId; // ref to UserDetail
  content: string;
  chat: Types.ObjectId; // ref to Conversation
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    status: {
      type: String,
      default: "sent",
    },
  },
  { timestamps: true }
);



const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;
