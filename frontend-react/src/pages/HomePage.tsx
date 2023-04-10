import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { tokenSelector } from "../store/auth.state";

function HomePage() {
  const accessToken = useRecoilValue(tokenSelector);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col justify-center gap-10">
        <div className="text-2xl font-extrabold">HomePage</div>
        {accessToken ? (
          <>
            <div className="text-blue-700 text-lg">
              you can visit <span className="font-semibold text-black">products</span> from navbar or click -
              {"> "}
              <Link className="px-2 text-lg text-red-600" to="/products">
                Products
              </Link>
            </div>
            <div className="text-blue-700 text-lg">
              or you can visit <span className="font-semibold text-black">admin</span> from navbar or click -
              {"> "}
              <Link className="px-2 text-lg text-red-600" to="/Admin">
                Admin
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-blue-700 text-lg">
              you need to login in order to use{" "}
              <span className="font-semibold text-black">
                {" "}necessary services{" "}
              </span>
              , go to -{"> "}
              <Link className="px-2 text-lg text-red-600" to="/auth/login">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
