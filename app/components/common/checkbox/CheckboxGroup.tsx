

interface CheckboxGroupProps {
  children: React.ReactNode;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ children }) => {
  return (
    <div className='grid gap-0' role='checkboxgroup' tabIndex={0}>
      {children}
    </div>
  );
};

export default CheckboxGroup;
