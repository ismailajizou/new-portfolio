import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

import { type ITestimonial } from "@/server/db/models/testimonial";
import { QuoteIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: ITestimonial;
}) {
  return (
    <Card className="relative max-w-[16rem] bg-gray-800/10 backdrop-blur-[2px] md:max-w-sm">
      <QuoteIcon className="absolute top-4 right-4 transform text-gray-500" />

      <CardHeader className="flex items-center gap-2 md:flex-row md:gap-4">
        <div>
          <Avatar>
            <AvatarImage
              alt={testimonial.name}
              src={testimonial.image}
              className="object-cover"
            />
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center md:text-left">
          <CardTitle>{testimonial.name}</CardTitle>
          <CardDescription>
            {testimonial.title} @{testimonial.company}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{testimonial.text}</CardContent>
    </Card>
  );
}
