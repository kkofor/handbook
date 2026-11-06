import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9B7A4F] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#1C1A17] text-[#F9F8F6] shadow hover:bg-[#33302B]",
        copper:
          "bg-[#9B7A4F] text-white shadow hover:bg-[#85653E]",
        destructive:
          "bg-[#8B2627] text-white shadow-xs hover:bg-[#721F20]",
        outline:
          "border border-[#DCD8CF] bg-white text-[#1C1A17] shadow-xs hover:bg-[#F4F1EA] hover:border-[#1C1A17]",
        secondary:
          "bg-[#EFECE6] text-[#1C1A17] shadow-xs hover:bg-[#E5E1D8]",
        ghost:
          "text-[#73706B] hover:bg-[#EFECE6]/60 hover:text-[#1C1A17]",
        link:
          "text-[#9B7A4F] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-[11px]",
        lg: "h-11 rounded-md px-6 text-sm font-mono tracking-wider uppercase",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
