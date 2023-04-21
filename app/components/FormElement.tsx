import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { useField } from 'remix-validated-form';

type FormElementProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const FormElement: React.FC<PropsWithChildren<FormElementProps>> = ({
  children,
  label,
  name,
  required = false,
}) => {
  const { error } = useField(name);

  return (
    <div>
      {label && (
        <label htmlFor={name} className={clsx('text-sm text-gray-500')}>
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className={label && "mt-1"}>{children}</div>
      {error && (
        <div className="pt-1 text-rose-500 text-sm">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormElement;