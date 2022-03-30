import { Document, Schema, model } from "mongoose";

// Create the interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  isAdmin?: Boolean;
}

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create and export user model
module.exports = model<IUser>("User", UserSchema);
