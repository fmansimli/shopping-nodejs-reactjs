import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { http } from "../../http/http";

import { cartState } from "../../store/cart.state";

interface ICartData {
  items: any[];
}

function ShoppingCardPage() {
  const [cartData, setCartData] = useRecoilState(cartState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    let data = { items: [] } as ICartData;

    const _data = localStorage.getItem("cart");
    if (_data) {
      data = JSON.parse(_data);
    }
    setCartData(data);
  };

  const changeCount = (item: any, count: number) => {
    let { productId, quantity } = item;

    let items: any[] = [];

    const sub = quantity + count;

    if (sub === 0) {
      setCartData(old => {
        items = old.items.filter(item => item.productId !== productId);

        return { items };
      });
    } else {
      setCartData(old => {
        items = old.items.map(item => {
          if (item.productId === productId) {
            return { ...item, quantity: quantity + count };
          }
          return item;
        });

        return { items };
      });
    }
    localStorage.setItem("cart", JSON.stringify({ items }));
  };

  const clearHandler = () => {
    setCartData({ items: [] });
  };
  const purchaseHandler = async () => {
    try {
      const items = cartData.items.map(item => {
        const { title, price, ...rest } = item;
        return { ...rest, price: Number(price) };
      });

      setLoading(true);
      const { data } = await http.post("/api/orders", { items });
      setCartData({ items: [] });
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {cartData.items.length ? (
        cartData.items.map((item, index) => (
          <div key={index} className="border-2 border-green-700 p-5 ">
            <div className="my-2 flex items-center justify-between px-5">
              <span className="mr-5">{item.title}</span>
              <span>
                total: <span>{item.price * item.quantity} $</span>
              </span>
              <div>
                <button
                  className="bg-gray-400 p-2 text-white"
                  onClick={() => changeCount(item, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button className="bg-gray-400 p-2 text-white" onClick={() => changeCount(item, 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">cart is empty!</div>
      )}
      {cartData.items.length && (
        <div className="flex flex-row-reverse items-center gap-5">
          <button className="rounded-sm bg-purple-600 p-2 text-white" onClick={purchaseHandler}>
            {loading ? "Loading..." : "purchase"}
          </button>
          <button className="rounded-sm bg-red-800 p-2 text-white" onClick={clearHandler}>
            clear
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCardPage;
