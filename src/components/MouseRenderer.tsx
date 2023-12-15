import { socket } from "@/lib/socket";
import { useRoom } from "@/recoil/room";
import UserMouse from "./UserMouse";

const MouseRenderer = () => {
  const { users } = useRoom();

  return (
    <>
      {[...users.keys()].map((userId) => {
        if (userId === socket.id) return null;
        return <UserMouse key={userId} userId={userId} />;
      })}
    </>
  );
};

export default MouseRenderer;
