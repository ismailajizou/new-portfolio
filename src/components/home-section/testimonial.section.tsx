"use client";
import { type ITestimonial } from "@/server/db/models/testimonial";
import Marquee from "../ui/marquee";
import TestimonialCard from "../ui/testimonial-card";
import TestimonialForm from "../testimonial/form-modal";
import Section from "../ui/section";
import { isMobile } from "react-device-detect";

const MOCK_TESTIMONIALS: ITestimonial[] = [
  {
    _id: "1",
    name: "John Doe",
    company: "Google",
    text: "Ismail is a great developer. He helped me with my project and I was very satisfied with the results.",
    status: "APPROVED",
    title: "Senior Developer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "Jane Doe",
    company: "Facebook",
    text: "Ismail is a great developer. He helped me with my project and I was very satisfied with the results.",
    status: "APPROVED",
    title: "Senior Developer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    name: "John Doe",
    company: "Google",
    text: "Ismail is a great developer. He helped me with my project and I was very satisfied with the results.",
    status: "APPROVED",
    title: "Senior Developer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    name: "Jane Doe",
    company: "Facebook",
    text: "Ismail is a great developer. He helped me with my project and I was very satisfied with the results.",
    status: "APPROVED",
    title: "Senior Developer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const TestimonialSection = ({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) => {
  return (
    <Section>
      <h2 className="mb-8 text-center text-4xl font-bold">Testimonials</h2>

      {MOCK_TESTIMONIALS.length ? (
        <div className="relative mb-8">
          <Marquee pauseOnHover className="overflow-x-scroll md:overflow-x-hidden">
            {MOCK_TESTIMONIALS.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </Marquee>
          <Marquee className="overflow-x-scroll md:overflow-x-hidden" reverse pauseOnHover>
            {MOCK_TESTIMONIALS.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </Marquee>
          <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
          <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
        </div>
      ) : (
        <div className="my-10 flex flex-col items-center justify-center">
          <h3 className="text-center text-2xl font-bold">
            No testimonials yet. Be the first to leave one!
          </h3>
        </div>
      )}
      <div className="flex justify-center">
        <TestimonialForm />
      </div>
    </Section>
  );
};
export default TestimonialSection;
