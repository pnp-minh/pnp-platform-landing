import { cn } from '@/lib/utils'

export function FAQIcon({ isOpen, className }: { isOpen?: boolean; className?: string }) {
  return (
    <div className={cn('relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all', className)}>
      {/* Horizontal line (always visible) */}
      <div className="absolute h-[1.714px] w-3 bg-gray-600" />
      {/* Vertical line (hidden when open) */}
      <div
        className={cn(
          'absolute h-3 w-[1.714px] bg-gray-600 transition-transform duration-200',
          isOpen && 'rotate-90 scale-0 opacity-0'
        )}
      />
    </div>
  )
}
