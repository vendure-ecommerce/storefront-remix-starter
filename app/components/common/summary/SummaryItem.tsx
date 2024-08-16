import React from "react";

interface SummaryItemProps {
  className?: string;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ className }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div>
        <div className='text-sm text-color-tertiary'>Kapcsolat neve</div>
        <div className='text-sm font-semibold tracking-tight'>
          Cub Cadet LT2 NR92 Fűnyíró traktor (13BB71DE603)
        </div>
      </div>
      <div className='justify-self-end text-sm text-color-tertiary'>
        1 × 990 000 Ft
      </div>
    </div>
  );
};

export default SummaryItem;
