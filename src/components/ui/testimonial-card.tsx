import Image from "next/image";

interface Testimonial {
  name: string;
  title: string;
  relation: string;
  quote: string;
  image: string;
}

export default function TestimonialCard({}: Testimonial) {
  return (
    <div className="max-w-sm rounded-lg bg-primary p-6 text-secondary shadow-lg">
      <div className="flex items-center">
        <Image
          src="/assets/hero.JPG"
          alt="Hero"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-lg font-bold">John Doe</h4>
          <p className="">CEO, Company</p>
        </div>
      </div>
      <p className="mt-4 text-muted">
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </blockquote>
      </p>
    </div>
  );
}
