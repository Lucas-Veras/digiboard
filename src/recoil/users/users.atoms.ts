import { atom, selector } from "recoil";

export const usersAtom = atom<{ [key: string]: Move[] }>({
  key: "users",
  default: {},
});

export const usersIds = selector({
  key: "socketIds",
  get: ({ get }) => {
    const users = get(usersAtom);
    return Object.keys(users);
  },
});
