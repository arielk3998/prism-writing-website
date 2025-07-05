import * as React from "react"
import { cn } from "@/lib/utils"
import { spacing, borderRadius, shadows } from "@/lib/design-tokens"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }
    
    const getSizeStyles = (size: string) => {
      switch (size) {
        case 'sm':
          return {
            height: spacing.scale[9],
            paddingLeft: spacing.scale[3],
            paddingRight: spacing.scale[3],
            borderRadius: borderRadius.md,
          }
        case 'lg':
          return {
            height: spacing.scale[11],
            paddingLeft: spacing.scale[8],
            paddingRight: spacing.scale[8],
            borderRadius: borderRadius.md,
          }
        case 'icon':
          return {
            height: spacing.scale[10],
            width: spacing.scale[10],
            borderRadius: borderRadius.md,
          }
        default:
          return {
            height: spacing.scale[10],
            paddingLeft: spacing.scale[4],
            paddingRight: spacing.scale[4],
            paddingTop: spacing.scale[2],
            paddingBottom: spacing.scale[2],
            borderRadius: borderRadius.md,
          }
      }
    }

    return (
      <button
        className={cn(baseClasses, variants[variant], className)}
        style={getSizeStyles(size)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
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
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
