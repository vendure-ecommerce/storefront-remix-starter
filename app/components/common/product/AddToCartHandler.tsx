

import React, { useState } from "react";
import { Button } from "~/components/ui-custom/MyButton";
import ProductAmountStepper from "./ProductAmountStepper";

interface AddToCartHandlerProps {
  className?: string;
  addToCartButtonText?: string;
  addToCartButtonSize?: string;
  stepperButtonSize?: string;
  iconSize?: string;
  inputSize?: string;
}

const AddToCartHandler: React.FC<AddToCartHandlerProps> = ({
  className = "w-full",
  addToCartButtonText = "Kosárba",
  addToCartButtonSize,
  stepperButtonSize,
  iconSize,
  inputSize,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setAmount(1);
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    if (newAmount === 0) {
      setIsButtonClicked(false);
    }
  };

  return (
    <div className={`${className}`}>
      {!isButtonClicked && (
        <Button
          className={`rounded-full ${addToCartButtonSize}`}
          onClick={handleButtonClick}
        >
          {addToCartButtonText}
        </Button>
      )}
      {isButtonClicked && (
        <ProductAmountStepper
          stepperButtonSize={stepperButtonSize}
          iconSize={iconSize}
          inputSize={inputSize}
          amount={amount}
          onAmountChange={handleAmountChange}
        />
      )}
    </div>
  );
};

export default AddToCartHandler;
