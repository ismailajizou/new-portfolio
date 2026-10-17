"use client";

import { Search } from "lucide-react";

import { type Testimonial } from "@/server/db/schema";
import { useState } from "react";
import { Input } from "../ui/input";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import { Separator } from "../ui/separator";
import { TestimonialList } from "./testimonial-list";
import { TestimonialDisplay } from "./testimonial-display";

interface MailProps {
  data: Testimonial[];
}

export function Testimonials({ data }: MailProps) {
  const [mail, setSelected] = useState<Testimonial["id"] | null>(null);

  return (
    <>
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="font-heading text-xl font-semibold">Testimonials</h1>
        </div>
        <Separator />
        <div className="p-4">
          <form>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <TestimonialList
          items={data}
          selectedMail={data.find((item) => item.id === mail) ?? null}
          setSelected={setSelected}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={655}>
        <TestimonialDisplay
          data={data.find((item) => item.id === mail) ?? null}
        />
      </ResizablePanel>
    </>
  );
}
