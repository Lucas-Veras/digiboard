import { atom } from "recoil";

export const optionsAtom = atom<CtxOptions>({
  key: "options",
  default: {
    lineWidth: 5,
    lineColor: "#000000",
  },
});
