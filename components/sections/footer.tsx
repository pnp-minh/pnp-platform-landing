"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const waitlistSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
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
      phone: "",
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
          <div className="flex w-full max-w-[628px] flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-6 text-center">
              <h2 className="text-[32px] font-medium leading-none tracking-[-1.28px] text-black md:text-[40px] md:tracking-[-1.6px] lg:text-[48px] lg:tracking-[-1.92px]">
                Join the Early Access WaitList
              </h2>
              <p className="text-base leading-[1.4] text-gray-11 md:text-lg">
                Be the first to try our AI Agent and help shape the future of
                agency briefs.
              </p>
            </div>

            {/* Form */}
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
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Input */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-11">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+84 123 456 789"
                          {...field}
                        />
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
                          placeholder="john@acmeagency.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" variant="default" className="w-full">
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>

          {/* Footer Bottom */}
          <div className="flex w-full flex-col gap-8 border-t border-border-default pt-6 md:flex-row md:items-end md:justify-between">
            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold leading-[1.4] text-gray-12">
                Contact
              </h3>
              <div className="flex flex-col gap-1 text-base leading-[1.5] text-gray-11">
                <p>Email: minh@paper-pens.com</p>
                <p>Office: Ho Chi Minh City, Vietnam</p>
                <p>Mobile: 01234567890</p>
              </div>
            </div>

            {/* Logo & Copyright */}
            <div className="flex flex-col items-start gap-1 md:items-end">
              <p className="text-[28px] font-semibold leading-normal tracking-[-0.84px] text-black md:text-[36.274px] md:tracking-[-1.0882px]">
                LogoPlatform©
              </p>
              <p className="text-sm font-medium leading-[20px] text-gray-12">
                © 2026 PNP. All right Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
