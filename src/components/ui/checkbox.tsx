/**
 * Checkbox Component
 * Based on shadcn/ui design patterns
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <input
        type="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
      <Check className="absolute left-0 top-0 h-4 w-4 text-current opacity-0 peer-checked:opacity-100" />
    </div>
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
