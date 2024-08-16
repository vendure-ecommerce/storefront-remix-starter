import React from "react";

interface SummaryDiscountProps {
  className?: string;
}

const SummaryDiscount: React.FC<SummaryDiscountProps> = ({ className }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>Összes kedvezmény:</div>
      <div>-105 000 Ft</div>
    </div>
  );
};

export default SummaryDiscount;
