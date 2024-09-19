

interface ListGroupProps {
  className?: string;
  children: React.ReactNode;
}

const ListGroup: React.FC<ListGroupProps> = ({ className, children }) => {
  return (
    <div className={`flex flex-col gap-0${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
};

export default ListGroup;
