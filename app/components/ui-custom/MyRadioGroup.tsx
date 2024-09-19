

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "~/utils/cn";
import StarRating from "../common/review/StarRating";
import { Label } from "../ui/label";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-0", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    id: string;
    label: string;
    showLabel?: boolean;
    imageSrc?: string;
    showImage: boolean;
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(
  (
    {
      id,
      label,
      showLabel = true,
      imageSrc,
      showImage = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Label
        className='flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4 px-3'
        htmlFor={id}
      >
        {showImage && imageSrc && (
          <img
            className='h-10 w-10 rounded-full'
            src='/category.png'
            width={60}
            height={60}
            alt='Kategóriakép'
          />
        )}
        <span className={!showLabel ? "sr-only" : ""}>{label}</span>
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "ml-auto aspect-square h-5 w-5 rounded-full border-2 border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
            <Circle className='h-2.5 w-2.5 fill-current text-current' />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      </Label>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupRatingItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    id: string;
    label: string;
    showLabel?: boolean;
    rating: number;
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ id, label, showLabel = true, rating, className, ...props }, ref) => {
  return (
    <Label
      className='flex h-14 w-full cursor-pointer items-center rounded-md hover:bg-primary/5 transition gap-4 px-3'
      htmlFor={id}
    >
      <StarRating rating={rating}></StarRating>
      <span className={!showLabel ? "sr-only" : ""}>{label}</span>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "ml-auto aspect-square h-5 w-5 rounded-full border-2 border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <Circle className='h-2.5 w-2.5 fill-current text-current' />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </Label>
  );
});
RadioGroupRatingItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, RadioGroupRatingItem };
