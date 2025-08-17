"use client";

import adminCredentialsSchema, {
  type TAdminCredentials,
} from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/_actions/auth";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

const AdminLoginForm = () => {
  const { toast } = useToast();
  const form = useForm<TAdminCredentials>({
    resolver: zodResolver(adminCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <Form {...form}>
      <div className="bg-card w-full max-w-lg rounded-md border-2 px-6 py-8 shadow-md">
        <h1 className="p-4 text-center text-2xl font-bold">Admin Login</h1>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit((d) => mutate(d))}
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn("w-full", {
              "cursor-not-allowed opacity-75": isPending,
            })}
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    </Form>
  );
};
export default AdminLoginForm;
