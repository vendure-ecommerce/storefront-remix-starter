import React from "react";

interface SummaryTaxRateProps {
  className?: string;
}

const SummaryTaxRate: React.FC<SummaryTaxRateProps> = ({ className }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>27% áfa:</div>
      <div>420 944 Ft</div>
    </div>
  );
};

export default SummaryTaxRate;
