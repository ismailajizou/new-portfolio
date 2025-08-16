"use client";

import { Search } from "lucide-react";

import { type Mail } from "@/data";
import { useState } from "react";
import { Input } from "./input";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { ResizableHandle, ResizablePanel } from "./resizable";
import { Separator } from "./separator";
import { type IContact } from "@/server/db/models/contact";

interface MailProps {
  mails: IContact[];
}

export function Mail({ mails }: MailProps) {
  const [mail, setSelected] = useState<IContact["_id"] | null>(null);

  return (
    <>
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
        </div>
        <Separator />
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
          <form>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <MailList
          items={mails}
          selectedMail={mails.find((item) => item._id === mail) ?? null}
          setSelected={setSelected}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={655}>
        <MailDisplay mail={mails.find((item) => item._id === mail) ?? null} />
      </ResizablePanel>
    </>
  );
}
