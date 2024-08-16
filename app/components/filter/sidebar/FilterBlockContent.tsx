

import ResetFilterButton from "../common/ResetFilterButton";

interface FilterBlockContentProps {
  className?: string;
  showResetFilterButton?: boolean;
  children: React.ReactNode;
}

const FilterBlockContent: React.FC<FilterBlockContentProps> = ({
  children,
  showResetFilterButton = true,
  className = "px-3 pb-12 pt-6",
}) => {
  return (
    <div
      className={`flex w-full flex-col gap-4${className ? ` ${className}` : ""}`}
    >
      {showResetFilterButton && <ResetFilterButton />}
      {children}
    </div>
  );
};

export default FilterBlockContent;
