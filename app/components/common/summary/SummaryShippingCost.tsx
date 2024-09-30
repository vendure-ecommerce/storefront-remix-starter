import React from "react";

interface SummaryShippingCostProps {
  className?: string;
  value?: number;
  currencyCode?: string;
}

const SummaryShippingCost: React.FC<SummaryShippingCostProps> = ({
  className,
  value,
  currencyCode
}) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>Szállítási költség:</div>
      <div>{value} {currencyCode}</div>
    </div>
  );
};

export default SummaryShippingCost;
