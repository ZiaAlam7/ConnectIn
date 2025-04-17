import mongoose, { Schema, Document, Types } from 'mongoose';
import UserDetail from './UserDetail.model';  // Import UserDetail model

export interface IComment {
  userId: Types.ObjectId;  // This will store ObjectId from UserDetail
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: Types.ObjectId;
  content: string;
  image?: string;
  likes: Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  userId: { type: Schema.Types.ObjectId, ref: 'UserDetail', required: true },  // Reference to UserDetail
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'UserDetail', required: true },  // Reference to UserDetail
    content: { type: String, required: true },
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserDetail' }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// Model to prevent overwriting in Next.js hot reload
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
