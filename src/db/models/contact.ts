import mongoose, { Schema } from "mongoose";

interface IContact {
  name: string;
  email: string;
  message: string;
}

const contactSchema = new Schema<IContact>({
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
});

const Contact =
  (mongoose.models.Contact as mongoose.Model<IContact>) ||
  mongoose.model("Contact", contactSchema);

export default Contact;
