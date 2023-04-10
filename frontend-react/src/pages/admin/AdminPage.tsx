import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-5 p-10 items-center">
        <div className="flex border-2 border-blue-500">
          <Link className="w-full p-20 text-xl font-semibold text-green-900" to="/products/new">
            new product
          </Link>
        </div>
        <div className="flex border-2 border-blue-500">
          <Link className="w-full p-20 text-lg font-semibold text-red-700" to="#">
            test action 1
          </Link>
        </div>
        <div className="flex border-2 border-blue-500">
          <Link className="w-full p-20 text-lg font-semibold text-red-700" to="#">
            test action 2
          </Link>
        </div>
        <div className="flex border-2 border-blue-500">
          <Link className="w-full p-20 text-lg font-semibold text-red-700" to="#">
            test action 3
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
