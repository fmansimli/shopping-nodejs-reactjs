import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { http } from "../../http/http";

import { IProduct } from "../../models";

import ProductItem from "../../components/products/ProductItem";
import { Loading, MyModal } from "../../components/ui/";

import { cartState, cartSelector } from "../../store/cart.state";

function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cartData, setCartData] = useRecoilState(cartState);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await http.get("/api/products");
      setProducts(data.body.products);
    } catch (error: any) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  const deleteHandler = async (id: number) => {
    if (!window.confirm("are you sure?")) {
      return;
    }

    try {
      const { data } = await http.delete("/api/products/" + id);
      setProducts(old => old.filter(p => p.id !== id));
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  const addToCartHandler = async (product: IProduct) => {
    const propmt = window.prompt("enter the quantity!");
    if (propmt == undefined) return;
    if (propmt === "") {
      return alert("quantity can't be empty");
    }
    try {
      if (isNaN(Number(propmt))) {
        return alert("input is not correct!");
      }
      const quantity = Number(propmt);

      if (quantity <= 0) {
        return alert("input should be greather than 0!");
      }

      let items: any[] = [];
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
          const { id, title, price } = product;
          items.push({ productId: id, price, title, quantity });
        }

        return { items };
      });
      localStorage.setItem("cart", JSON.stringify({ items }));
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  if (loading) {
    return <Loading fallback="products loading..." />;
  }

  return (
    <div className="h-full">
      {products.length ? (
        <div className="flex flex-wrap gap-5">
          {products.map((product: IProduct) => (
            <ProductItem
              product={product}
              key={product.id}
              onDelete={deleteHandler}
              onAddToCart={addToCartHandler}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">no products found!</div>
      )}
      <MyModal
        visible={modalVisible}
        title="Test modal!"
        buttonText="got it baby!"
        onClose={() => setModalVisible(false)}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent you an email with all of the
            details of your order.
          </p>
        </div>
      </MyModal>
    </div>
  );
}

export default ProductsPage;
