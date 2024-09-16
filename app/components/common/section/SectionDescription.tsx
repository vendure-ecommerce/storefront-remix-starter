
interface SectionDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  className,
  children,
}) => {
  return (
    <p
      className={`max-w-3xl text-color-tertiary${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
};

export default SectionDescription;
