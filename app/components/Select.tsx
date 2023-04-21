import React, { SelectHTMLAttributes } from 'react';
import { useField } from 'remix-validated-form';
import FormElement from './FormElement';

export type SelectProps = {
  placeholder?: string;
  noPlaceholder?: boolean;
  label?: string;
  name: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    name,
    label,
    required,
    defaultValue,
    placeholder = 'Select...',
    noPlaceholder = false,
    children,
    ...props
  }, ref) => {
    const { getInputProps } = useField(name);

    return (
      <FormElement name={name} label={label} required={required}>
        <select
          ref={ref}
          {...props}
          defaultValue={defaultValue}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          {...getInputProps({})}
        >
          {!noPlaceholder && (
            <option value="">{placeholder}</option>
          )}
          {children}
        </select>
      </FormElement>
    );
  },
);
