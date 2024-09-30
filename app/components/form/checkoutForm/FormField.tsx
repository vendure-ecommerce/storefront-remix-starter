import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui-custom/MyInput";

interface FormFieldProps {
  className: string;
  id: string;
  name: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ className, id, name, label, type, value, onChange }) => {
  return (
    <div className={className}>
      <Label className='mb-1.5' htmlFor={id}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
