import { Button, ButtonProps } from "~/components/ui-custom/MyButton";
import React from "react";

interface ResetFilterButtonProps extends ButtonProps {
  label?: string;
}

const ResetFilterButton: React.FC<ResetFilterButtonProps> = ({
  variant = "outline",
  size = "default",
  label = "Szűrők törlése",
  ...buttonProps
}) => {
  return (
    <Button
      className='self-start'
      variant={variant}
      size={size}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default ResetFilterButton;
