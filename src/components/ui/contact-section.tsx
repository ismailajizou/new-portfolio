"use client";

import { contact, type ContactInput } from "@/app/_actions/contact";
import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Turnstile } from "@marsidev/react-turnstile";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "./use-toast";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const {
    mutate: submitContact,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: ContactInput) => contact(data),
    onSuccess: () => {
      form.reset();
      toast({
        title: "Success",
        variant: "default",
        description: "Your message has been sent successfully!",
      });
      setTurnstileToken(null);
    },
    onError: () => {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          "An error occured while sending the message, try again later !",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (!turnstileToken) {
      form.setError("root", {
        message: "Please complete the CAPTCHA verification",
      });
      return;
    }
    submitContact({ ...data, turnstileToken });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        Get in Touch
      </h2>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {/* Left side - Contact Form */}
        <Card>
          <CardContent className="p-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Collaboration"
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
                            placeholder="Tell me about your project or inquiry..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cloudflare Turnstile CAPTCHA */}
                  <div className="pt-2">
                    <Turnstile
                      siteKey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                      injectScript={false}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                      options={{
                        theme: "dark",
                        size: "normal",
                      }}
                    />
                  </div>

                  {form.formState.errors.root && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {/* Right side - Contact Info & QR Code */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Let&apos;s Connect!</h3>
            <p className="text-muted-foreground">
              Have a project in mind or just want to say hello? I&apos;d love to
              hear from you. Fill out the form or scan the QR code below to
              visit my link-in-bio page for more ways to connect.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Mail className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="font-medium">ismailajizou1@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Location</p>
                <p className="font-medium">Morocco</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Clock className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Response Time</p>
                <p className="font-medium">Usually within 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <Card className="mt-4">
            <CardContent className="flex flex-col items-center p-6">
              <p className="mb-4 text-center text-sm font-medium">
                Scan to visit my link-in-bio
              </p>
              <div className="rounded-lg bg-white p-4">
                <QRCodeSVG
                  value="https://card.ismail-ajizou.com"
                  size={180}
                  level="M"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>
              <p className="text-muted-foreground mt-4 text-center text-xs">
                card.ismail-ajizou.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
