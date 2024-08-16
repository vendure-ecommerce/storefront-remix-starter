

interface ManufacturerTitleProps {
  className?: string;
  title: string;
}

const ManufacturerTitle: React.FC<ManufacturerTitleProps> = ({
  className,
  title,
}) => {
  return (
    <div
      className={`line-clamp-2 font-semibold tracking-tight text-sm${className ? ` ${className}` : ""}`}
    >
      {title}
    </div>
  );
};

export default ManufacturerTitle;
