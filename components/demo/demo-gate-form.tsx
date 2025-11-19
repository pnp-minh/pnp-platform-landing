'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usePostHog } from 'posthog-js/react'
import type { Variant } from '@/lib/getVariant'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface DemoGateFormProps {
  variant: Variant
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  website: z
    .string()
    .url({
      message: 'Please enter a valid URL.',
    })
    .optional()
    .or(z.literal('')),
  teamSize: z.coerce
    .number()
    .min(1, {
      message: 'Team size must be at least 1.',
    })
    .max(1000, {
      message: 'Team size must be less than 1000.',
    }),
})

type FormValues = z.infer<typeof formSchema>

export function DemoGateForm({ variant }: DemoGateFormProps) {
  const posthog = usePostHog()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: '',
      company: '',
      website: '',
      teamSize: 5,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      // Track demo started event in PostHog
      posthog.capture('demo_started', {
        variant,
        company_provided: !!values.company,
        website_provided: !!values.website,
        team_size: values.teamSize,
      })

      // Call API to generate context from website
      const response = await fetch('/api/demo/generate-context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to generate context')
      }

      const data = await response.json()

      // Store context in sessionStorage for demo to use
      sessionStorage.setItem('demoContext', JSON.stringify(data.context))

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Still allow demo to proceed even if API fails
      // Store basic info without insights
      sessionStorage.setItem(
        'demoContext',
        JSON.stringify({
          name: values.name,
          company: values.company,
          teamSize: values.teamSize,
          hasWebsite: false,
          brandContext: `${values.company} - Professional agency`,
          insights: [],
        })
      )
      setIsSubmitted(true)
    }
  }

  // If form is submitted, hide it (demo will show)
  if (isSubmitted) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-20">
      <div className="w-full max-w-[500px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-semibold leading-tight tracking-[-1.2px] text-black">
            Experience JAY with your brand
          </h2>
          <p className="text-base leading-normal tracking-[-0.32px] text-[#646464]">
            See how JAY helps gather a professional brief for your agency—personalized to your context.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#646464]">
                    Your name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#646464]">
                    Company name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Agency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website Field (Optional) */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#646464]">
                    Website{' '}
                    <span className="font-normal text-[#a0a0a0]">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://acmeagency.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-[#a0a0a0]">
                    JAY will reference your brand context during the brief
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team Size Field */}
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#646464]">
                    Team size
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-black px-8 text-base font-semibold leading-normal tracking-[-0.32px] text-white transition-all hover:bg-[#2a2a2a] hover:shadow-lg disabled:opacity-50"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating your demo...
                </span>
              ) : (
                'Generate My Demo'
              )}
            </button>
          </form>
        </Form>

        {/* Privacy Note */}
        <p className="mt-6 text-center text-xs leading-normal text-[#a0a0a0]">
          Your information is secure. We&apos;ll only use it to personalize this demo experience.
        </p>
      </div>
    </div>
  )
}
