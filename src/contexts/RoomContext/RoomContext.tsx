import { MotionValue, useMotionValue } from "framer-motion";
import React, { ReactNode, createContext, useContext } from "react";

export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <RoomContext.Provider value={{ x, y }}>{children}</RoomContext.Provider>
  );
};

export const useBoardPosition = () => {
  const { x, y } = useContext(RoomContext);
  
  return { x, y };
};

export default RoomContextProvider;
