import { selector, atom } from "recoil";

import { User } from "../models";
import { http } from "../http/http";

interface IAuthState {
  user?: null | User;
  auth: {
    accessToken: string;
  };
}

const defaultState: IAuthState = {
  user: null,
  auth: {
    accessToken: "",
  },
};

export const authState = atom<IAuthState>({
  key: "authStateKey",
  default: defaultState,
});

export const tokenSelector = selector({
  key: "tokenSelector",
  get: ({ get }) => get(authState).auth.accessToken,
});

export const authSelector = selector<Partial<IAuthState>>({
  key: "authSelector",
  get: ({ get }) => get(authState),
  set: ({ set, get }, newValue) => {
    set(authState, { ...get(authState), ...newValue });
  },
});

export const initSelector = selector<IAuthState>({
  key: "initSelector",
  get: async () => {
    let stored = null;
    try {
      let storedString = localStorage.getItem("auth");
      if (storedString) {
        stored = JSON.parse(storedString) as IAuthState;
        if (stored.auth.accessToken) {
          http.defaults.headers["Authorization"] = "Bearer " + stored.auth.accessToken;
          return stored;
        }
      }
      return defaultState;
    } catch (error) {
      return defaultState;
    }
  },
  set: ({ set }, newValue) => {
    set(authState, newValue);
  },
});

export const signSelector = selector<IAuthState>({
  key: "signSelector",
  get: ({ get }) => get(authState),
  set: ({ set, get }, newValue: any) => {
    set(authState, { ...get(authState), ...newValue });
  },
});
