import { COLORS_ARRAY } from "@/helpers/colors";
import { socket } from "@/lib/socket";
import { useSetRoom, useSetUsers } from "@/recoil/room/room.hooks";
import { MotionValue, useMotionValue } from "framer-motion";
import { ReactNode, createContext, useContext, useEffect } from "react";

export const RoomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const setRoom = useSetRoom();
  const { handleAddUser, handleRemoveUser } = useSetUsers();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    socket.on("room", (room, usersMovesTpParse, usersToParse) => {
      const usersMoves = new Map<string, Move[]>(JSON.parse(usersMovesTpParse));
      const usersParsed = new Map<string, string>(JSON.parse(usersToParse));

      const users = new Map<string, User>();

      usersParsed.forEach((name, id) => {
        if (id === socket.id) return;

        const index = [...usersParsed.keys()].indexOf(id);
        const color = COLORS_ARRAY[index % COLORS_ARRAY.length];

        users.set(id, {
          name,
          color,
        });
      });

      setRoom((prev) => ({
        ...prev,
        users,
        usersMoves,
        movesWithoutUser: room.drawed,
      }));
    });

    socket.on("new_user", (userId, username) => {
      handleAddUser(userId, username);
    });

    socket.on("user_disconnected", (userId) => {
      handleRemoveUser(userId);
    });

    return () => {
      socket.off("room");
      socket.off("new_user");
      socket.off("user_disconnected");
    };
  }, [handleAddUser, handleRemoveUser, setRoom]);

  return (
    <RoomContext.Provider value={{ x, y }}>{children}</RoomContext.Provider>
  );
};

export const useBoardPosition = () => {
  const { x, y } = useContext(RoomContext);

  return { x, y };
};

export default RoomContextProvider;
