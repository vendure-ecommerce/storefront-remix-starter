

import { Badge } from "~/components/ui-custom/MyBadge";

interface ChipProps {
  className?: string;
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ className, children }) => {
  return (
    <Badge
      className={`flex items-center gap-2${className ? ` ${className}` : ""}`}
      variant={"chip"}
    >
      {children}
    </Badge>
  );
};

export default Chip;
