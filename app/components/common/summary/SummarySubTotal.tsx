import React from "react";

interface SummarySubTotalProps {
  className?: string;
}

const SummarySubTotal: React.FC<SummarySubTotalProps> = ({ className }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>Részösszeg:</div>
      <div>1 559 056 Ft</div>
    </div>
  );
};

export default SummarySubTotal;
