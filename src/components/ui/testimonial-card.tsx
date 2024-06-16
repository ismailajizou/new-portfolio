import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

import { QuoteIcon } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  relation: string;
  quote: string;
  image: string;
}

export default function TestimonialCard({}: Testimonial) {
  return (
    <Card className="relative max-w-sm backdrop-blur-[2px] bg-gray-800/10">
      <QuoteIcon className="absolute right-4 top-4 transform text-gray-500" />

      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <Image
            src="/assets/hero.JPG"
            alt="Hero"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
        <div>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>CEO, Company</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </blockquote>
      </CardContent>
    </Card>
  );
}
