import { format } from "date-fns";
import { EyeOff, Share, Trash2 } from "lucide-react";

import {
  deleteTestimonial,
  publishTestimonial,
  rejectTestimonial,
} from "@/app/_actions/testimonials";
import { type ITestimonial } from "@/server/db/models/testimonial";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface MailDisplayProps {
  data: ITestimonial | null;
}

export function TestimonialDisplay({ data }: MailDisplayProps) {
  //   const today = new Date();

  const { toast } = useToast();
  const { mutate: remove } = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast({
        title: "Testimonial deleted",
        variant: "default",
      });
    },
  });

  const { mutate: publish } = useMutation({
    mutationFn: publishTestimonial,
    onSuccess: () => {
      toast({
        title: "Testimonial published",
        variant: "default",
      });
    },
  });

  const { mutate: reject } = useMutation({
    mutationFn: rejectTestimonial,
    onSuccess: () => {
      toast({
        title: "Testimonial rejected",
        variant: "default",
      });
    },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={() => (data ? remove(data._id) : null)}>
                <Button variant="ghost" size="icon" disabled={!data}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </div>
        {data?.status !== "APPROVED" && (
          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={() => (data ? publish(data._id) : null)}>
                  <Button variant="ghost" size="icon" disabled={!data}>
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Publish</span>
                  </Button>
                </form>
              </TooltipTrigger>
              <TooltipContent>Publish</TooltipContent>
            </Tooltip>
          </div>
        )}
        {/* <Separator orientation="vertical" className="mx-2 h-6" /> */}
        {data?.status !== "REJECTED" && (
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={() => (data ? reject(data._id) : null)}>
                  <Button variant="ghost" size="icon" disabled={!data}>
                    <EyeOff className="h-4 w-4" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </form>
              </TooltipTrigger>
              <TooltipContent>Reject</TooltipContent>
            </Tooltip>
          </div>
        )}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!data}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <Separator />
      {data ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage
                  alt={data.name}
                  src={data.image}
                  className="object-cover"
                />
                <AvatarFallback>
                  {data.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{data.name}</div>
                {/* <div className="line-clamp-1 text-xs">{data.message}</div> */}
                <div className="line-clamp-1 text-xs">
                  {data.title} @ {data.company}
                </div>
              </div>
            </div>
            {data.createdAt && (
              <div className="text-muted-foreground ml-auto text-xs">
                {format(new Date(data.createdAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 p-4 text-sm whitespace-pre-wrap">
            {data.text}
          </div>
          {/* <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${data.name}...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="w-full"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      ) : (
        <div className="text-muted-foreground p-8 text-center">
          No message selected
        </div>
      )}
    </div>
  );
}
