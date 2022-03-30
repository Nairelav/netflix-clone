import { Document, Schema, model } from "mongoose";

// Create the interface
export interface IMovie extends Document {
  title: String;
  desc: String;
  img?: String;
  imgTitle?: String;
  imgSm?: String;
  trailer?: String;
  video?: String;
  year?: String;
  limit?: Number;
  genre?: String;
  isSeries?: Boolean;
}

// Create the schema
const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create and export user model
module.exports = model<IMovie>("Movie", MovieSchema);
