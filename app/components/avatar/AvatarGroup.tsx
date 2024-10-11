

interface AvatarGroupProps {
  className?: string;
  children: React.ReactNode;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ className, children }) => {
  return (
    <div
      className={`flex justify-center -space-x-2${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
};

export default AvatarGroup;
