import { atom, selector } from "recoil";

interface IItem {
  name: string;
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
  default: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : defaultState,
});

export const cartSelector = selector({
  key: "cartSelectorKey",
  get: ({ get }) => get(cartState),
});

export const statisticSelector = selector({
  key: "statisticSelector",
  get: ({ get }) => {
    const state = get(cartState);
    const totalPrice = state.items.reduce((total, curr) => {
      total += curr.price * curr.quantity;
      return total;
    }, 0);

    const totalItemsCount = state.items.reduce((sum, curr) => {
      return sum + curr.quantity;
    }, 0);

    return { totalPrice, totalItemsCount };
  },
});
