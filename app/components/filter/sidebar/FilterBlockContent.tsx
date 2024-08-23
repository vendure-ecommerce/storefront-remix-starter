

import ResetFilterButton from "../common/ResetFilterButton";

interface FilterBlockContentProps {
  className?: string;
  showResetFilterButton?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const FilterBlockContent: React.FC<FilterBlockContentProps> = ({
  children,
  showResetFilterButton = true,
  className = "px-3 pb-12 pt-6",
  onClick,
}) => {
  return (
    <div
      className={`flex w-full flex-col gap-4${className ? ` ${className}` : ""}`}
    >
      {showResetFilterButton && <ResetFilterButton onClick={onClick}/>}
      {children}
    </div>
  );
};

export default FilterBlockContent;
