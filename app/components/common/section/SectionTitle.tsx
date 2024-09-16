

interface SectionTitleProps {
  className?: string;
  title: string;
  level?: "h2" | "h3" | "h4" | "h5" | "h6";
  srOnly?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  className = "",
  title = "Címsor",
  level = "h2",
  srOnly = false,
}) => {
  const HeadingTag = level;

  const defaultSizes = {
    h2: `text-3xl`,
    h3: `text-2xl`,
    h4: `text-lg`,
    h5: `text-base`,
    h6: `text-sm`,
  };

  const combinedClassName = className ? className : `${defaultSizes[level]}`;
  return (
    <HeadingTag
      className={`leading-none font-bold ${srOnly ? "sr-only" : ""} ${combinedClassName}`}
    >
      {title}
    </HeadingTag>
  );
};

export default SectionTitle;
