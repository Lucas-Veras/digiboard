import { socket } from "@/lib/socket";
import { useRoom } from "@/recoil/room";
import UserMouse from "./UserMouse";

const MouseRenderer = () => {
  const room = useRoom();

  return (
    <>
      {[...room.users.keys()].map((userId) => {
        if (userId === socket.id) return null;
        return (
          <UserMouse
            key={userId}
            userId={userId}
            username={room.users.get(userId) || "Anônimo"}
          />
        );
      })}
    </>
  );
};

export default MouseRenderer;
