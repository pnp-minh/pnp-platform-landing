import { cn } from "@/lib/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2.5 rounded-lg bg-background-default px-4 py-3 text-sm font-medium leading-normal tracking-[-0.28px] text-primary-1",
        className
      )}
    >
      {children}
    </div>
  );
}
