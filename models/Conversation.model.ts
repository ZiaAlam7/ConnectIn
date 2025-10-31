import { Schema, model, models, Document, Types } from "mongoose";

export interface IConversation extends Document {
  lastMessage?: Types.ObjectId | null;
  participants: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null, 
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserDetail",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Conversation =
  models.Conversation || model<IConversation>("Conversation", conversationSchema);

export default Conversation;
