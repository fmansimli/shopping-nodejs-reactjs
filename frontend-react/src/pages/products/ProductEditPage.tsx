import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSWR from "swr";
import { http } from "../../http/http";
import { IProduct } from "../../models";

import { toast } from "react-toastify";

import ProductForm from "../../components/products/ProductForm";
import Loading from "../../components/ui/Loading";

const ProductEditPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR("/api/products/" + id);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return navigate("/");
    }
  }, []);

  const submitHandler = async (product: Partial<IProduct>) => {
    try {
      product.price = Number(product.price);

      setLoading(true);
      await http.patch("/api/products/" + id, product);
      navigate("/products");
    } catch (error: any) {
      toast(error.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading fallback="product loading..." />;
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div>{error.message || "something went wrong!"}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-1/2 md:w-[70%] lg:w-1/2 2xl:w-1/2 ">
        <ProductForm
          formTitle="Edit Product"
          buttonName="save"
          onSubmit={submitHandler}
          initial={data}
          processing={loading}
        />
      </div>
    </div>
  );
};

export default ProductEditPage;
