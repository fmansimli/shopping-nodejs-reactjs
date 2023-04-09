import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { http } from "../../http/http";
import { IProduct } from "../../models";

import ProductForm from "../../components/products/ProductForm";
import Loading from "../../components/ui/Loading";

const ProductEditPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return navigate("/");
    }
    getProductById(id);
  }, []);

  const getProductById = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await http.get("/api/products/" + id);
      setProduct(data.body.product);
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (product: Partial<IProduct>) => {
    try {
      const { data } = await http.patch("/api/products/" + id, product);
      navigate("/products");
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  if (loading) {
    return <Loading fallback="product loading..." />;
  }

  return (
    <div>
      <div className="ml-10 w-1/2">
        <ProductForm
          formTitle="Edit Product"
          buttonName="save"
          onSubmit={submitHandler}
          initial={product}
        />
      </div>
    </div>
  );
};

export default ProductEditPage;
