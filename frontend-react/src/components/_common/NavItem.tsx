import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}

const NavItem: FC<IProps> = props => {
  return (
    <Link
      to={props.to}
      className={props.className || "text-white hover:text-red-500"}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};

export default NavItem;
