"use client";
import { type ITestimonial } from "@/server/db/models/testimonial";
import Marquee from "../ui/marquee";
import TestimonialCard from "../ui/testimonial-card";
import TestimonialForm from "../testimonial/form-modal";
import Section from "../ui/section";

const TestimonialSection = ({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) => {
  return (
    <Section id="testemonials">
      <h2 className="mb-8 text-center text-4xl font-bold">Testimonials</h2>

      {testimonials.length ? (
        <div className="relative mb-8">
          <Marquee
            pauseOnHover
            className="overflow-x-scroll md:overflow-x-hidden"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </Marquee>
          <Marquee
            className="overflow-x-scroll md:overflow-x-hidden"
            reverse
            pauseOnHover
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white dark:from-background md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white dark:from-background md:block" />
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
