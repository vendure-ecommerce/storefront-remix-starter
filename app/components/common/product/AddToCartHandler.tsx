import React, { useState } from 'react';
import { Button } from '~/components/ui-custom/MyButton';
import ProductAmountStepper from './ProductAmountStepper';

interface AddToCartHandlerProps {
  productId?: string;
  className?: string;
  addToCartButtonText?: string;
  addToCartButtonSize?: string;
  stepperButtonSize?: string;
  iconSize?: string;
  inputSize?: string;
}

const AddToCartHandler: React.FC<AddToCartHandlerProps> = ({
  className = 'w-full',
  addToCartButtonText = 'Kosárba',
  addToCartButtonSize,
  stepperButtonSize,
  iconSize,
  inputSize,
  productId,
}) => {
  // const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [amount, setAmount] = useState(0);
  if (typeof window !== 'undefined') {
    localStorage.getItem('cart');
  }

  const handleButtonClick = () => {
    // setIsButtonClicked(true);
    setAmount(1);
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    if (newAmount === 0) {
      // setIsButtonClicked(false);
    } else if (productId) {
    }
  };

  return (
    <div className={`${className}`}>
      {amount === 0 && (
        <Button
          className={`rounded-full ${addToCartButtonSize}`}
          onClick={handleButtonClick}
        >
          {addToCartButtonText}
        </Button>
      )}
      {amount !== 0 && (
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
