import React from "react";

interface SummaryTotalProps {
  className?: string;
  value?: number;
  currencyCode?: string;
}

const SummaryTotal: React.FC<SummaryTotalProps> = ({ className, value, currencyCode }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4${className ? ` ${className}` : ""}`}
    >
      <div>Összesen:</div>
      <div>{value || 0} {currencyCode}</div>
    </div>
  );
};

export default SummaryTotal;
