import { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<any> {
  children: any;
}

const MyButton: FC<IButton> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
      w-full rounded-lg bg-blue-600
       px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none
        focus:ring-4 focus:ring-blue-300"
    >
      {children}
    </button>
  );
};

export default MyButton;
