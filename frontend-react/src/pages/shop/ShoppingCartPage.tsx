import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { cartState } from "../../store/cart.state";

interface ICartData {
  items: any[];
}

function ShoppingCardPage() {
  const [cartData, setCartData] = useRecoilState(cartState);

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
    localStorage.setItem("cart", JSON.stringify({ items: [] }));
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {cartData.items.length ? (
        cartData.items.map((item, index) => (
          <div key={index} className="border-2 border-green-700 p-5 ">
            <div className="my-2 flex items-center justify-between px-5">
              <span className="mr-5">{item.name}</span>
              <span>
                total: <span>{item.price * item.quantity} $</span>
              </span>
              <div>
                <button
                  className="bg-gray-400 px-2 text-white"
                  onClick={() => changeCount(item, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="bg-gray-400 px-2 text-white"
                  onClick={() => changeCount(item, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="font-bold text-lg">cart is empty!</div>
          <div className="text-lg text-blue-700">
            start by adding some <span className="font-semibold text-black">products</span>, go to -
            {"> "}
            <Link className="px-2 text-lg text-red-600" to="/products">
              Products
            </Link>
          </div>
        </div>
      )}
      {cartData.items.length && (
        <div className="flex flex-row-reverse items-center gap-5">
          <button className="rounded-sm bg-red-800 px-6 py-2 text-white" onClick={clearHandler}>
            clear
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCardPage;
