import mongoose, { Schema, model, models } from "mongoose";


export interface IForgotPassword {
  user_id: string;
  token: string
  expires: Date
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const forgotPasswordSchema = new Schema<IForgotPassword>(
  {
    user_id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
        type: Date,
        required: true,
      },
  },
  { timestamps: true }
);


const ForgotPassword =
  models?.ForgotPassword || model<IForgotPassword>("ForgotPassword", forgotPasswordSchema);

export default ForgotPassword;
