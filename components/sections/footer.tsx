"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const waitlistSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export function Footer() {
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = (data: WaitlistFormValues) => {
    // TODO: Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <footer className="flex items-center justify-center bg-white px-5 pb-[60px] pt-20 md:px-10 md:pt-24 lg:px-20 lg:pt-[120px]">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-16 lg:gap-[90px]">
        {/* Waitlist Form Section */}
        <div className="flex w-full flex-col items-center gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6 text-center">
            <h2 className="mx-auto max-w-[940px] text-[32px] font-semibold leading-[1.2] tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
              We&apos;re building something that{" "}
              <span className="text-primary">
                helps us and agencies like ours work better
              </span>
              .
              <br />
              If you care, join us and shape what{" "}
              <span className="text-primary">Primer</span> becomes.
            </h2>
          </div>

          {/* Form */}
          <div className="w-full max-w-[628px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Full Name Input */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-11">
                        Full name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-11">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" variant="default" className="w-full">
                  Count me in
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex w-full flex-col gap-8 border-t border-border-default pt-6 md:flex-row md:items-end md:justify-between">
          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold leading-[1.4] text-gray-12">
              We&apos;d love to hear from you
            </h3>
            <div className="flex flex-col gap-1 text-base leading-[1.6] text-gray-11">
              <p>
                Any feedback or curious thoughts about Primer? Feel free to send
                us an email.
              </p>
              <p>
                <a
                  href="mailto:chloe@papers-pens.com"
                  className="hover:text-gray-12 transition-colors"
                >
                  chloe@papers-pens.com
                </a>{" "}
                (CEO)
              </p>
              <p>
                <a
                  href="mailto:minh@papers-pens.com"
                  className="hover:text-gray-12 transition-colors"
                >
                  minh@papers-pens.com
                </a>{" "}
                (Tech Lead)
              </p>
            </div>
          </div>

          {/* Logo & Copyright */}
          <div className="flex flex-col items-start gap-1 md:items-end">
            <p className="text-[28px] font-semibold leading-normal tracking-[-0.84px] text-black md:text-[36.274px] md:tracking-[-1.0882px]">
              Primer
            </p>
            <p className="text-sm font-medium leading-[20px] text-gray-11">
              A product by Papers & Pens
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
