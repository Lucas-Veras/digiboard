import { socket } from "@/lib/socket";
import usersAtom, { useUserIds } from "@/recoil/users";
import { MotionValue, useMotionValue } from "framer-motion";
import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const setUsers = useSetRecoilState(usersAtom);
  const usersIds = useUserIds();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    socket.on("users_in_room", (newUsers) => {
      newUsers.forEach((user) => {
        if (!usersIds.includes(user) && user !== socket.id) {
          setUsers((prevUsers) => ({ ...prevUsers, [user]: [] }));
        }
      });
    });

    socket.on("user_disconnected", (userId) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        delete newUsers[userId];
        return newUsers;
      });
    });

    return () => {
      socket.off("users_in_room");
      socket.off("user_disconnected");
    };
  }, [setUsers, usersIds]);

  return (
    <RoomContext.Provider value={{ x, y }}>{children}</RoomContext.Provider>
  );
};

export const useBoardPosition = () => {
  const { x, y } = useContext(RoomContext);

  return { x, y };
};

export default RoomContextProvider;
