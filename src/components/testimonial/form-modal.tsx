"use client";
import { writeTestimonial } from "@/app/_actions/testimonials";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  testimonialSchema,
  type TTestimonial,
} from "@/validators/testimonials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";
const TestimonialForm = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TTestimonial>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      title: "",
      company: "",
      text: "",
    },
  });

  const testimonialBody = form.watch("text");

  const { mutate } = useMutation({
    mutationFn: writeTestimonial,
    onSuccess: () => {
      setIsOpen(false);
      form.reset();
      toast({
        title: "Reference sent",
        description: "Thank you. It appears here once I have reviewed it.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={(s) => setIsOpen(s)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="h-11 rounded-full px-4">
          Leave a reference
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a reference</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => mutate(d))}
            className="space-y-4"
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2 md:gap-2">
              <FormField
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Full stack developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Somewhere Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How we worked together and what it was like"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-right text-sm">
                    {testimonialBody.length}/300
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="lg" className="px-4">
                Send for review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default TestimonialForm;
