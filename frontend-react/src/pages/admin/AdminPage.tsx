import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 p-10">
        <div className="flex border-2 border-blue-500">
          <Link className="w-full p-2 text-lg text-red-700" to="/products/new">
            new product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
