import { useState } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

import useSWR from "swr";
import { http } from "../../http/http";

import { toast } from "react-toastify";

import { IProduct } from "../../models";

import ProductItem from "../../components/products/ProductItem";
import { Loading, MyModal } from "../../components/ui/";

import { cartState } from "../../store/cart.state";

function ProductsPage() {
  const { data: products, error, isLoading, mutate } = useSWR("/api/products");

  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cartData, setCartData] = useRecoilState(cartState);

  const changeCount = (step: number) => {
    if (step === -1 && quantity === 0) return;
    setQuantity(old => old + step);
  };

  const clickHandler = (id: number) => {
    setSelectedProduct(products.find((p: IProduct) => p.id === id));
    setModalVisible(true);
  };

  const deleteHandler = async (id: number) => {
    if (!window.confirm("are you sure do you want to delete?")) {
      return;
    }

    try {
      setLoading(true);
      await http.delete("/api/products/" + id);
      mutate();
    } catch (error: any) {
      toast(error.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const addOrRemoveHandler = async (result: boolean | undefined) => {
    setModalVisible(false);

    if (result === undefined) return;

    const product = { ...selectedProduct };

    try {
      let items: any[] = [];

      if (!result) {
        setCartData(old => {
          items = old.items.filter(item => item.productId !== product.id);
          return { items };
        });
        localStorage.setItem("cart", JSON.stringify({ items }));
        return;
      }

      if (quantity <= 0) return;

      setCartData(old => {
        let exits = false;

        items = old.items.map(item => {
          if (item.productId === product.id) {
            exits = true;
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        if (!exits) {
          const { id, name, price } = product;
          items.push({ productId: id, price, name, quantity });
        }

        return { items };
      });
      localStorage.setItem("cart", JSON.stringify({ items }));
    } catch (error: any) {
      toast(error.message, { type: "error" });
    } finally {
      setQuantity(0);
    }
  };

  if (isLoading) {
    return <Loading fallback="products loading..." />;
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div>something went wrong!</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {products.length ? (
        <div className="flex flex-col gap-5">
          {products.map((product: IProduct) => (
            <ProductItem
              product={product}
              key={product.id}
              onDelete={deleteHandler}
              onClick={clickHandler}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <div className="text-xl font-semibold text-gray-800">No Products in Database!</div>
          <div className="text-lg text-blue-700">
            go to admin or click -{"> "}
            <Link className="px-2 text-lg text-red-600" to="/products/new">
              New Product
            </Link>
          </div>
        </div>
      )}
      <MyModal
        visible={modalVisible}
        title=""
        buttonText="add to cart"
        onEnded={result => addOrRemoveHandler(result)}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            {selectedProduct?.name}{" "}
            <span className="text-red-600">({selectedProduct?.price}$)</span>
          </div>
          <div className="">
            <button className="bg-gray-400 px-2 text-white" onClick={() => changeCount(-1)}>
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button className="bg-gray-400 px-2 text-white" onClick={() => changeCount(1)}>
              +
            </button>
          </div>
        </div>
      </MyModal>
    </div>
  );
}

export default ProductsPage;
