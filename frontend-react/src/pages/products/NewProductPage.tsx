import { useNavigate } from "react-router-dom";

import { http } from "../../http/http";
import { IProduct } from "../../models";

import ProductForm from "../../components/products/ProductForm";

const NewProductPage = () => {
  const navigate = useNavigate();

  const submitHandler = async (product: Partial<IProduct>) => {
    try {
      const { data } = await http.post("/api/products", product);
      navigate("/products");
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div>
      <div className="ml-10 w-1/2">
        <ProductForm formTitle="New Product" buttonName="create" onSubmit={submitHandler} />
      </div>
    </div>
  );
};

export default NewProductPage;
