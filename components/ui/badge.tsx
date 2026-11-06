import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1C1A17] text-white shadow hover:bg-[#33302B]",
        secondary:
          "border-[#E5E2DA] bg-[#EFECE6] text-[#5E5A54] hover:bg-[#E5E1D8]",
        destructive:
          "border-transparent bg-[#8B2627] text-white shadow hover:bg-[#721F20]",
        outline:
          "border-[#DCD8CF] text-[#5E5A54] bg-white",
        copper:
          "border-transparent bg-[#9B7A4F] text-white shadow hover:bg-[#85653E]",
        success:
          "border-[#244A29]/20 bg-[#EAF3EB] text-[#244A29]",
        danger:
          "border-[#8B2627]/20 bg-[#FBEBEB] text-[#8B2627]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
