import React, { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui-custom/MyButton';
import ProductAmountStepper from './ProductAmountStepper';
import { useOrder } from '~/providers/orders';
import { useActiveOrder } from '~/utils/use-active-order';
import { clickingDelay } from '~/constants';

interface AddToCartHandlerProps {
  id?: string;
  productId?: string;
  className?: string;
  addToCartButtonText?: string;
  addToCartButtonSize?: string;
  stepperButtonSize?: string;
  iconSize?: string;
  inputSize?: string;
}

const AddToCartHandler: React.FC<AddToCartHandlerProps> = ({
  id,
  className = 'w-full',
  addToCartButtonText = 'Kosárba',
  addToCartButtonSize,
  stepperButtonSize,
  iconSize,
  inputSize,
  productId,
}) => {
  const {
    error,
    amountHandlers,
    addAmountHandler,
    removeAmountHandler
  } = useOrder();
  // const [isButtonClicked, setIsButtonClicked] = useState(false);
  const {
    activeOrderFetcher,
    activeOrder,
    removeItem,
    refresh,
  } = useActiveOrder();
  const rfOrderTimer = useRef<NodeJS.Timeout>();
  const productLine = activeOrder?.lines.find((line) => line.productVariant.id === productId);

  const [amount, setAmount] = useState(0);

  const handleButtonClick = () => {
    // setIsButtonClicked(true);
    setAmount(1);
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  useEffect(() => {
    if (activeOrder && productLine && activeOrderFetcher.state === 'idle') {
      setAmount(productLine.quantity);
    }
  }, [activeOrder, activeOrderFetcher]);

  useEffect(() => {
    if (rfOrderTimer.current) {
      clearTimeout(rfOrderTimer.current);
    }
    if (activeOrderFetcher.state === 'idle') {
      rfOrderTimer.current = setTimeout(() => {
        if (amount === 0 && productLine) {
          removeItem(productLine.id);
        } else if (productLine && amount !== 0) {
          activeOrderFetcher.submit(
            {
              action: "adjustItem",
              lineId: productLine.id,
              quantity: amount,
            },
            {
              method: 'post',
              action: `/api/active-order`,
              preventScrollReset: true,
            }
          )
        } else if (amount !== 0) {
          activeOrderFetcher.submit(
            {
              action: "addItemToOrder",
              quantity: amount,
              variantId: productId!,
            },
            {
              method: 'post',
              action: `/api/active-order`,
              preventScrollReset: true,
            }
          );
        }
  
        for (let i = 0; i < amountHandlers.length; i++) {
          if (amountHandlers[i].id !== id) {
            amountHandlers[i].refresh();
          }
        }
      }, clickingDelay);
  
    }
    
    return () => {
      if (rfOrderTimer.current) {
        clearTimeout(rfOrderTimer.current);
      }
    };
  }, [amount]);

  useEffect(() => {
    if (id) {
      addAmountHandler({
        id,
        refresh,
      })
    }

    return () => {
      if (id) {
        removeAmountHandler(id);
      }
    }
  }, []);

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
          disabled={activeOrderFetcher.state !== 'idle'}
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
