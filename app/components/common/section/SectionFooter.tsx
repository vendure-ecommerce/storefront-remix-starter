
interface SectionFooterProps {
  className?: string;
  children?: React.ReactNode;
}

const SectionFooter: React.FC<SectionFooterProps> = ({
  className,
  children,
}) => {
  return (
    <footer
      className={`flex items-center justify-between gap-2${className ? ` ${className}` : ""}`}
    >
      {children}
    </footer>
  );
};

export default SectionFooter;
