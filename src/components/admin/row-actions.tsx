"use client";

import { deleteEntry, moveEntry, setPublished } from "@/app/_actions/cms";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export function RowActions({
  collection,
  id,
  title,
  published,
  orderable,
  isFirst,
  isLast,
}: {
  collection: string;
  id: string;
  title: string;
  published: boolean;
  orderable: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const run = (task: () => Promise<void>, done?: string) =>
    startTransition(async () => {
      try {
        await task();
        if (done) toast({ title: done });
      } catch {
        toast({
          title: "That did not work",
          description: "Reload the page and try again.",
          variant: "destructive",
        });
      }
    });

  return (
    <div className="flex items-center justify-end gap-1">
      <label className="text-muted-foreground mr-2 flex items-center gap-2 text-xs">
        <span>{published ? "Visible" : "Hidden"}</span>
        <Switch
          checked={published}
          disabled={pending}
          aria-label={`Show ${title} on the site`}
          onCheckedChange={(checked) =>
            run(() => setPublished(collection, id, checked))
          }
        />
      </label>
      {orderable ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            disabled={pending || isFirst}
            aria-label={`Move ${title} up`}
            onClick={() => run(() => moveEntry(collection, id, "up"))}
          >
            <ArrowUp aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={pending || isLast}
            aria-label={`Move ${title} down`}
            onClick={() => run(() => moveEntry(collection, id, "down"))}
          >
            <ArrowDown aria-hidden />
          </Button>
        </>
      ) : null}
      <Button asChild variant="ghost" size="icon">
        <Link
          href={`/admin/content/${collection}/${id}`}
          aria-label={`Edit ${title}`}
        >
          <Pencil aria-hidden />
        </Link>
      </Button>
      {confirming ? (
        <Button
          variant="destructive"
          disabled={pending}
          onBlur={() => setConfirming(false)}
          onClick={() =>
            run(() => deleteEntry(collection, id), `Deleted ${title}`)
          }
        >
          Delete?
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Delete ${title}`}
          onClick={() => setConfirming(true)}
        >
          <Trash2 aria-hidden />
        </Button>
      )}
    </div>
  );
}
