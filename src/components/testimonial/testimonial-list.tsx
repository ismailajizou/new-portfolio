import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { type Testimonial } from "@/server/db/schema";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

interface MailListProps {
  items: Testimonial[];
  selectedMail: Testimonial | null;
  setSelected: (mail: Testimonial["id"]) => void;
}

export function TestimonialList({
  items,
  selectedMail: mail,
  setSelected,
}: MailListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
              mail?.id === item.id && "bg-muted",
            )}
            onClick={() => setSelected(item.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {item?.status === "PENDING" ? (
                    <Badge variant="default">Pending</Badge>
                  ) : item?.status === "APPROVED" ? (
                    <Badge variant="secondary">Published</Badge>
                  ) : item?.status === "REJECTED" ? (
                    <Badge variant="destructive">Rejected</Badge>
                  ) : null}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{`${item.title} @${item.company}`}</div>
            </div>
            <div className="text-muted-foreground line-clamp-2 text-xs">
              {item.text.substring(0, 300)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// function getBadgeVariantFromLabel(
//   label: string,
// ): ComponentProps<typeof Badge>["variant"] {
//   if (["work"].includes(label.toLowerCase())) {
//     return "default";
//   }

//   if (["personal"].includes(label.toLowerCase())) {
//     return "outline";
//   }

//   return "secondary";
// }
