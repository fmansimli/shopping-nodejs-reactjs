import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { http } from "../../http/http";
import { IProduct } from "../../models";

import ProductForm from "../../components/products/ProductForm";

const NewProductPage = () => {
  const navigate = useNavigate();

  const submitHandler = async (product: Partial<IProduct>) => {
    try {
      await http.post("/api/products", product);
      navigate("/products");
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-1/2 md:w-[70%] lg:w-1/2 2xl:w-1/2 ">
        <ProductForm formTitle="New Product" buttonName="create" onSubmit={submitHandler} />
      </div>
    </div>
  );
};

export default NewProductPage;
