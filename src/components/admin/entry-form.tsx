"use client";

import { type SaveResult } from "@/app/_actions/cms";
import { type Field, type FieldErrors } from "@/cms/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type FormValues = Record<string, string | boolean>;

function toFormValue(field: Field, value: unknown): string | boolean {
  if (field.type === "boolean")
    return value === undefined ? true : Boolean(value);
  if (field.type === "lines")
    return Array.isArray(value) ? value.join("\n") : "";
  if (field.type === "tags")
    return Array.isArray(value) ? value.join(", ") : "";
  return typeof value === "string" ? value : "";
}

function fromFormValue(field: Field, value: string | boolean) {
  if (field.type === "lines") return String(value).split("\n");
  if (field.type === "tags") return String(value).split(",");
  return value;
}

const selectClass =
  "border-input bg-card focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-2.5 text-sm outline-none focus-visible:ring-3";

function UploadInput({
  id,
  value,
  onChange,
  invalid,
  kind,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  kind: "image" | "file";
}) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as {
        url?: string;
        message?: string;
      };
      if (!response.ok || !result.url) {
        throw new Error(result.message ?? "Upload failed.");
      }
      onChange(result.url);
    } catch (error) {
      toast({
        title: "File not uploaded",
        description: error instanceof Error ? error.message : "Upload failed.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex items-start gap-3">
      {value && kind === "image" ? (
        <img
          src={value}
          alt=""
          className="border-border size-16 shrink-0 rounded-md border object-cover"
        />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-wrap gap-2">
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… or upload"
          aria-invalid={invalid}
          className="bg-card h-9 min-w-48 flex-1"
        />
        <input
          ref={fileRef}
          type="file"
          accept={
            kind === "image"
              ? "image/jpeg,image/png,image/webp,image/avif"
              : "application/pdf"
          }
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : (
            <Upload aria-hidden />
          )}
          {uploading ? "Uploading" : "Upload"}
        </Button>
      </div>
    </div>
  );
}

export function EntryForm({
  groups,
  initial,
  action,
  relations = {},
  backHref,
}: {
  groups: { title?: string; fields: Field[] }[];
  initial: Record<string, unknown>;
  action: (values: Record<string, unknown>) => Promise<SaveResult>;
  relations?: Record<string, { value: string; label: string }[]>;
  // When set, a successful save returns to this list.
  backHref?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const fields = groups.flatMap((group) => group.fields);
  const [values, setValues] = useState<FormValues>(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        toFormValue(field, initial[field.name]),
      ]),
    ),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, startTransition] = useTransition();

  const set = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const payload = Object.fromEntries(
        fields.map((field) => [
          field.name,
          fromFormValue(field, values[field.name] ?? ""),
        ]),
      );
      const result = await action(payload);
      if (!result.ok) {
        setErrors(result.errors ?? {});
        toast({
          title: "Not saved",
          description: result.message,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Saved", description: "The site is updated." });
      if (backHref) router.push(backHref);
      router.refresh();
    });
  };

  const renderControl = (field: Field) => {
    const id = `field-${field.name}`;
    const value = values[field.name] ?? "";
    const invalid = Boolean(errors[field.name]);
    const describedBy = invalid
      ? `${id}-error`
      : field.help
        ? `${id}-help`
        : undefined;

    switch (field.type) {
      case "boolean":
        return (
          <Switch
            id={id}
            checked={value === true}
            onCheckedChange={(checked) => set(field.name, checked)}
          />
        );
      case "textarea":
      case "lines":
        return (
          <Textarea
            id={id}
            value={String(value)}
            onChange={(event) => set(field.name, event.target.value)}
            rows={field.type === "lines" ? 5 : 4}
            placeholder={field.placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="bg-card field-sizing-content min-h-24"
          />
        );
      case "select":
      case "relation": {
        const options =
          field.type === "relation"
            ? (relations[field.name] ?? [])
            : (field.options ?? []);
        return (
          <select
            id={id}
            value={String(value)}
            onChange={(event) => set(field.name, event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={selectClass}
          >
            {field.type === "relation" || !field.required ? (
              <option value="">None</option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }
      case "image":
      case "file":
        return (
          <UploadInput
            id={id}
            kind={field.type}
            value={String(value)}
            onChange={(next) => set(field.name, next)}
            invalid={invalid}
          />
        );
      default:
        return (
          <Input
            id={id}
            type={
              field.type === "month"
                ? "month"
                : field.type === "email"
                  ? "email"
                  : field.type === "url"
                    ? "url"
                    : "text"
            }
            value={String(value)}
            onChange={(event) => set(field.name, event.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="bg-card h-9"
          />
        );
    }
  };

  return (
    <form onSubmit={submit} noValidate className="max-w-2xl space-y-10">
      {groups.map((group, index) => (
        <fieldset key={group.title ?? index} className="space-y-5">
          {group.title ? (
            <legend className="font-heading border-border mb-5 w-full border-b pb-2 text-base font-semibold">
              {group.title}
            </legend>
          ) : null}
          {group.fields.map((field) => {
            const id = `field-${field.name}`;
            const inline = field.type === "boolean";
            return (
              <div
                key={field.name}
                className={
                  inline
                    ? "flex items-center justify-between gap-4"
                    : "space-y-1.5"
                }
              >
                <Label htmlFor={id}>
                  {field.label}
                  {field.required && !inline ? (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      (required)
                    </span>
                  ) : null}
                </Label>
                {renderControl(field)}
                {errors[field.name] ? (
                  <p id={`${id}-error`} className="text-destructive text-sm">
                    {errors[field.name]}
                  </p>
                ) : field.help ? (
                  <p
                    id={`${id}-help`}
                    className="text-muted-foreground text-sm"
                  >
                    {field.help}
                  </p>
                ) : null}
              </div>
            );
          })}
        </fieldset>
      ))}
      <div className="border-border bg-background sticky bottom-0 flex items-center gap-2 border-t py-4">
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="hover:bg-primary/90 px-4"
        >
          {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {pending ? "Saving" : "Save"}
        </Button>
        {backHref ? (
          <Button asChild variant="ghost" size="lg">
            <Link href={backHref}>Cancel</Link>
          </Button>
        ) : null}
      </div>
    </form>
  );
}
