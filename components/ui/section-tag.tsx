import { cn } from '@/lib/utils'

interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-lg bg-background-default px-4 py-3',
        className
      )}
    >
      <p className="text-sm font-medium leading-normal tracking-[-0.28px] text-primary">
        {children}
      </p>
    </div>
  )
}
