import React from "react";

interface SummaryTaxRateProps {
  className?: string;
  value?: number;
  currencyCode?: string;
  tax?: {
    description: string;
    taxRate: number;
    taxTotal: number;
  }
}

const SummaryTaxRate: React.FC<SummaryTaxRateProps> = ({ className, value, currencyCode, tax }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>{tax?.taxRate}% áfa:</div>
      <div>{value || 0} {currencyCode}</div>
    </div>
  );
};

export default SummaryTaxRate;
