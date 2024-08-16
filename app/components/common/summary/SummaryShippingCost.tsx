import React from "react";

interface SummaryShippingCostProps {
  className?: string;
}

const SummaryShippingCost: React.FC<SummaryShippingCostProps> = ({
  className,
}) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>Szállítási költség:</div>
      <div>15 000 Ft</div>
    </div>
  );
};

export default SummaryShippingCost;
