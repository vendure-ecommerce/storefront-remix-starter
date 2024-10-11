import React from 'react';

interface SummaryDiscountProps {
  discount?: number;
  currencyCode?: string;
  description?: string;
}

const SummaryDiscount: React.FC<SummaryDiscountProps> = ({
  discount,
  currencyCode,
  description,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>{description}:</div>
      <div>
        {discount || 0} {currencyCode}
      </div>
    </div>
  );
};

export default SummaryDiscount;
