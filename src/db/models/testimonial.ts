import mongoose from "mongoose";

export interface ITestimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  image?: string;
}

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;