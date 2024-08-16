

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  className = "gap-10",
  children,
}) => {
  return (
    <section
      className={`relative flex flex-col${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
