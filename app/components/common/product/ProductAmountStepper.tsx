

import { Button } from "~/components/ui-custom/MyButton";
import { Input } from "~/components/ui-custom/MyInput";
import { Label } from "~/components/ui/label";
import { generateUniqueId } from "@/helpers/generateUniqueId";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ProductAmountStepperProps {
  stepperButtonSize?: string;
  iconSize?: string;
  inputSize?: string;
  className?: string;
  amount: number;
  onAmountChange: (newAmount: number) => void;
  onRemove?: () => void;
}

const ProductAmountStepper: React.FC<ProductAmountStepperProps> = ({
  stepperButtonSize = "h-9 w-9",
  iconSize = "h-4 w-4",
  inputSize = "h-10",
  className = "w-full",
  amount,
  onAmountChange,
  onRemove,
}) => {
  const [inputId, setInputId] = useState<string>();

  useEffect(() => {
    setInputId(generateUniqueId("product-amount"));
  }, []);

  const handleIncrease = () => {
    onAmountChange(amount + 1);
  };

  const handleDecrease = () => {
    if (amount > 0) {
      const newAmount = amount - 1;
      onAmountChange(newAmount);
      if (newAmount === 0 && onRemove) {
        onRemove();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      onAmountChange(newValue);
    }
  };

  return (
    <div
      className={`flex items-center rounded-full border px-0.5 ${inputSize}${className ? ` ${className}` : ""}`}
    >
      <Button
        className={`relative flex-none rounded-full p-0 ${stepperButtonSize}`}
        variant={"ghost"}
        onClick={handleDecrease}
      >
        <div className='sr-only'>Kevesebb</div>
        <Minus className={`${iconSize}`} />
      </Button>
      <Label className='relative w-full' htmlFor={inputId}>
        <div className='sr-only'>Mennyiség</div>
        <Input
          className={`border-none bg-transparent text-center ${inputSize}`}
          id={inputId}
          type='number'
          min='0'
          name='Termék mennyiség'
          value={amount.toString()}
          onChange={handleChange}
        />
      </Label>
      <Button
        className={`relative flex-none rounded-full p-0 ${stepperButtonSize}`}
        variant={"ghost"}
        onClick={handleIncrease}
      >
        <div className='sr-only'>Több</div>
        <Plus className={`${iconSize}`} />
      </Button>
    </div>
  );
};

export default ProductAmountStepper;
