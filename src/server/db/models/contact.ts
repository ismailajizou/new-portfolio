import mongoose, { Schema } from "mongoose";

export interface IContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Contact =
  (mongoose.models.Contact as mongoose.Model<IContact>) ||
  mongoose.model("Contact", contactSchema);

export default Contact;
