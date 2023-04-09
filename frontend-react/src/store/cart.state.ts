import { atom, selector } from "recoil";

interface IItem {
  title: string;
  productId: number;
  price: number;
  quantity: number;
}

interface ICartState {
  items: IItem[];
}

const defaultState: ICartState = {
  items: [],
};

export const cartState = atom<ICartState>({
  key: "cartStateKey",
  default: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : defaultState,
});

export const cartSelector = selector({
  key: "cartSelectorKey",
  get: ({ get }) => get(cartState),
});

export const priceSelector = selector({
  key: "priceSelectorKey",
  get: ({ get }) => {
    const state = get(cartState);
    const totalPrice = state.items.reduce((total, curr) => {
      total += curr.price * curr.quantity;
      return total;
    }, 0);

    return totalPrice;
  },
});
