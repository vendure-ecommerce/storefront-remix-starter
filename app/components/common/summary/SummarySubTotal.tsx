import React from 'react';

interface SummarySubTotalProps {
  className?: string;
  value?: number;
  currencyCode?: string;
}

const SummarySubTotal: React.FC<SummarySubTotalProps> = ({
  className,
  value,
  currencyCode,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>Részösszeg:</div>
      <div>{`${value} ${currencyCode}`}</div>
    </div>
  );
};

export default SummarySubTotal;
