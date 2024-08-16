import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils/cn";

const badgeVariants = cva(
  "bg-white inline-flex items-center rounded-full border px-2.5 py-0.5 h-6 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand text-brand-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        newArrival:
          "bg-color-new-arrival text-color-new-arrival-foreground border-none",
        isFavorite:
          "bg-color-is-favorite text-color-is-favorite-foreground border-none",
        inCart: "bg-color-in-cart text-color-in-cart-foreground border-none",
        freeShipping:
          "bg-color-free-shipping text-color-free-shipping-foreground border-none",
        hasSpecialPrice:
          "bg-color-has-special-price text-color-has-special-price-foreground border-none",
        chip: "text-foreground rounded-full h-8 pr-1",
        inCartAmount: "text-foreground rounded-full text-base h-10 px-6",
        inCartAmountSm: "text-foreground rounded-full text-xs h-6 px-3",
        counter:
          "text-brand-foreground border-transparent bg-brand rounded-full text-xs h-4 w-4 items-center justify-center px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  children,
  ...props
}: BadgeProps & { children?: React.ReactNode }) {
  let computedClassName = className;

  // Ellenőrizzük, hogy a children sztring vagy szám-e, és csak ebben az esetben végezzük el az értékellenőrzést
  let value = 0;
  if (typeof children === "string") {
    value = parseInt(children, 10);
  } else if (typeof children === "number") {
    value = children;
  }

  // Ha a variant counter és a kiszámított érték nagyobb mint 9, módosítsuk a classokat.
  if (variant === "counter" && !isNaN(value) && value > 9) {
    computedClassName = cn(
      "inline-flex items-center justify-center rounded-full text-primary-foreground border-transparent bg-primary text-xs h-4 px-1.5",
      className
    );
  } else {
    computedClassName = cn(badgeVariants({ variant }), className);
  }

  return (
    <div className={computedClassName} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
