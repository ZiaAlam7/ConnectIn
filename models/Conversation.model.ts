import { Schema, model, models, Document, Types } from "mongoose";

export interface IConversation extends Document {
  lastMessage?: Types.ObjectId;
  participants: Types.ObjectId[];
  unread: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDetail",
        required: true,
      },
    ],
    unread: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Conversation = models.Conversation || model<IConversation>("Conversation", conversationSchema);

export default Conversation;
