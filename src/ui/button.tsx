import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-sm font-semibold transition-colors duration-200 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-brand/90 text-night-soft hover:bg-brand",
        outline:
          "border-night-soft text-night-soft hover:border-night-soft/30 hover:bg-night-soft/10",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-8 text-base 2xl:h-14",
        lg: "px-8 py-4 text-[15px] leading-normal xl:px-10 xl:py-4.5 xl:text-base",
      },
    },
    compoundVariants: [
      { variant: "outline", size: "sm", className: "border" },
      { variant: "outline", size: ["md", "lg"], className: "border-2" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonStyles> & {
  className?: string;
};

// cva concatenates without resolving conflicts, so every caller goes through cn().
function buttonVariants({ className, ...variants }: ButtonVariants = {}) {
  return cn(buttonStyles(variants), className);
}

function Button({
  className,
  variant,
  size,
  ...props
}: Omit<ButtonPrimitive.Props, "className"> & ButtonVariants) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
