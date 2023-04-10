import { FC, TextareaHTMLAttributes } from "react";

interface IInput extends TextareaHTMLAttributes<any> {
  label?: string;
}

const MyInput: FC<IInput> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold text-gray-700">{label}</label>
      <textarea
        {...props}
        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg
                   border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
      ></textarea>
    </div>
  );
};

export default MyInput;
