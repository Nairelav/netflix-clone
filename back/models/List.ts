import { Document, Schema, model } from "mongoose";

// Create the interface
export interface iList extends Document {
  title: String;
  type?: String;
  genre?: String;
  content?: Array<any>;
}

// Create the schema
const ListSchema = new Schema<iList>(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

// Create and export user model
module.exports = model<iList>("List", ListSchema);
