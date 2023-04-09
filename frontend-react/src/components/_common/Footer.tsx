import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

interface IFooter {
  //
}

const Footer: FC<IFooter> = props => {
  return (
    <footer className="flex h-24 w-full items-center justify-between bg-gray-800 px-20">
      <Link to="/">
        <img src={logo} alt="React Logo" width={50} height={50} />
      </Link>
      <div className="text-white">
        Powered by &nbsp;&nbsp;
        <a
          className="text-xl text-red-800"
          target="_blank"
          href="https://linkedin.com/in/faridmansimli"
        >
          Farid Mansimli
        </a>
      </div>
    </footer>
  );
};

export default Footer;
