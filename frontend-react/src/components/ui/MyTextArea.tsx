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
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      ></textarea>
    </div>
  );
};

export default MyInput;
