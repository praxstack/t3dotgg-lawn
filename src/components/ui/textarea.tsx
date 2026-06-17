import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full resize-none border-2 border-[#1a1a1a] bg-[#f0f0e8] px-3 py-2 font-mono text-sm text-[#1a1a1a] transition-all placeholder:text-[#888] focus-visible:border-[#2d5a2d] focus-visible:shadow-[4px_4px_0px_0px_var(--shadow-accent)] focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
