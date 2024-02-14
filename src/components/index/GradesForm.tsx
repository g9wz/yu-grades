"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

import { useGrades } from "@context/GradesContext";

import useFetchGrades from "@hooks/useFetchGrades";

const isDev = process.env.NODE_ENV === "development";

const formSchema = z.object({
  studentId: isDev
    ? z.string()
    : z
        .string()
        .min(1, { message: "Forgot your ID? 🙄" })
        .length(9, { message: "Count again 🧐" })
        .refine((value) => /^[0-9]+$/.test(value), {
          message: "Really, letters? 🤦‍♂️",
        }),
  password: isDev
    ? z.string()
    : z.string().min(1, { message: "Password? Don't be shy 😊" }),
});

const GradesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

  const { fetchGrades } = useFetchGrades();
  const { error, isLoading } = useGrades();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await fetchGrades(values);
    if (success) {
      router.push("/grades");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your Student ID - 2021******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your Very Secure Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
        {error && (
          <div>
            <span className="text-destructive">Error:</span> {error}
          </div>
        )}
      </form>
    </Form>
  );
};

export default GradesForm;
