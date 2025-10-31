import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId; // ref to UserDetail
  content: string;
  chat: Types.ObjectId; // ref to Conversation
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "UserDetail",
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
    }
  },
  { timestamps: true }
);



const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;
