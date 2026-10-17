"use client";

import { contact, type ContactInput } from "@/app/_actions/contact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useMutation } from "@tanstack/react-query";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  ArrowUpRight,
  CircleCheck,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your name.")
    .max(80, "Keep the name under 80 characters."),
  email: z.email("Enter an email address I can reply to."),
  subject: z
    .string()
    .min(3, "Add a short subject.")
    .max(100, "Keep the subject under 100 characters."),
  message: z
    .string()
    .min(10, "Write at least a sentence.")
    .max(500, "Keep the message under 500 characters."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type Props = {
  email: string;
  availability: string | null;
  heading: string | null;
  responseTime: string | null;
  links: { label: string; href: string }[];
  name: string;
  location: string;
};

const inputClass =
  "bg-background/60 border-input text-foreground h-11 rounded-xl placeholder:text-muted-foreground/60 dark:bg-background/60";

/** Splits off the last word (minus closing punctuation) for the gradient. */
function splitLastWord(text: string) {
  const match = /^(.*\s)?(\S+?)([.!?…]*)$/.exec(text.trim());
  return match
    ? ([match[1] ?? "", match[2] ?? "", match[3] ?? ""] as const)
    : (["", text, ""] as const);
}

export function Contact({
  email,
  availability,
  heading,
  responseTime,
  links,
  name,
  location,
}: Props) {
  const { toast } = useToast();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const {
    mutate: submitContact,
    isPending,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (data: ContactInput) => contact(data),
    onSuccess: () => {
      form.reset();
      setTurnstileToken(null);
    },
    onError: () => {
      toast({
        title: "Message not sent",
        variant: "destructive",
        description: `Something failed on my side. Email me at ${email} instead.`,
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (!turnstileToken) {
      form.setError("root", {
        message: "Complete the verification check above, then send again.",
      });
      return;
    }
    submitContact({ ...data, turnstileToken });
  };

  const details = [
    { Icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { Icon: MapPin, label: "Location", value: location },
    ...(responseTime
      ? [{ Icon: Clock, label: "Response time", value: responseTime }]
      : []),
  ];
  const [headingLead, headingLast, headingEnd] = splitLastWord(
    heading ?? "Get in touch",
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 overflow-hidden pt-24 md:pt-32"
    >
      <div
        aria-hidden
        className="from-signal-2/15 pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-radial-[ellipse_at_bottom] to-transparent to-70%"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-x-16 gap-y-12 px-4 pb-24 md:px-8 md:pb-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]">
        <div>
          <h2
            id="contact-title"
            className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl"
          >
            {headingLead}
            <span className="text-gradient">{headingLast}</span>
            {headingEnd}
          </h2>
          {availability ? (
            <p className="text-muted-foreground mt-6 max-w-[46ch] text-lg leading-relaxed">
              {availability}
            </p>
          ) : null}
          <ul className="mt-10 space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="border-hairline text-signal-1 flex size-11 shrink-0 items-center justify-center rounded-xl border bg-white/3">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span>
                  <span className="text-muted-foreground block font-mono text-xs tracking-wider uppercase">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-signal-1 font-medium transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-medium">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          {links.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-hairline text-muted-foreground hover:text-foreground inline-flex h-11 items-center gap-1 rounded-full border bg-white/3 px-4 text-sm transition-colors hover:bg-white/6"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <SpotlightCard className="p-5 md:p-7">
          {isSuccess ? (
            <div role="status" className="py-10">
              <CircleCheck className="text-passed size-9" aria-hidden />
              <p className="font-heading mt-4 text-2xl font-semibold">
                Message sent
              </p>
              <p className="text-muted-foreground mt-2 max-w-[40ch]">
                Thanks. I read everything.
                {responseTime ? ` ${responseTime}.` : null}
              </p>
              <button
                type="button"
                onClick={() => reset()}
                className="text-signal-1 mt-6 text-sm font-medium underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            className={inputClass}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="email"
                            className={inputClass}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tech Lead role at…"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className={`${inputClass} h-auto min-h-32 resize-y`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Turnstile
                  siteKey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                  injectScript={false}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    form.clearErrors("root");
                  }}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                  options={{ theme: "dark", size: "flexible" }}
                />
                {form.formState.errors.root ? (
                  <p role="alert" className="text-destructive text-sm">
                    {form.formState.errors.root.message}
                  </p>
                ) : null}
                <ShimmerButton
                  type="submit"
                  disabled={isPending}
                  className="w-full disabled:pointer-events-none disabled:opacity-60"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                  {isPending ? "Sending" : "Send message"}
                </ShimmerButton>
              </form>
            </Form>
          )}
        </SpotlightCard>
      </div>
      <footer className="border-hairline relative border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-xs md:px-8">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <a href="#top" className="hover:text-foreground transition-colors">
            back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
