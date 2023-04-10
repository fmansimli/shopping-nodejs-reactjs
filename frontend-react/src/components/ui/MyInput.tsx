import { FC, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<any> {
  label?: string;
}

const MyInput: FC<IInput> = ({ label, name, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg
                   border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
        {...props}
        name={name}
        id={name}
      />
    </div>
  );
};

export default MyInput;
