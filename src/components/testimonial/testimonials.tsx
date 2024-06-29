"use client";

import { Search } from "lucide-react";

import { type ITestimonial } from "@/server/db/models/testimonial";
import { useState } from "react";
import { Input } from "../ui/input";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import { Separator } from "../ui/separator";
import { TestimonialList } from "./testimonial-list";
import { TestimonialDisplay } from "./testimonial-display";


interface MailProps {
  data: ITestimonial[];
}

export function Testimonials({ data }: MailProps) {
  const [mail, setSelected] = useState<ITestimonial["_id"] | null>(null);

  return (
    <>
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Testimonial List</h1>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <TestimonialList
          items={data}
          selectedMail={data.find((item) => item._id === mail) ?? null}
          setSelected={setSelected}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={655}>
        <TestimonialDisplay data={data.find((item) => item._id === mail) ?? null} />
      </ResizablePanel>
    </>
  );
}
