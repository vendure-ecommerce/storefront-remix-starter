
interface SectionHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  className,
  children,
}) => {
  return (
    <hgroup
      className={`relative flex flex-col gap-2${className ? ` ${className}` : ""}`}
    >
      {children}
    </hgroup>
  );
};

export default SectionHeader;
