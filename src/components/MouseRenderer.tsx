import { useUserIds } from "@/recoil/users";
import SocketMouse from "./SocketMouse";

const MouseRenderer = () => {
  const userIds = useUserIds();

  return (
    <>
      {userIds.map((userId) => (
        <SocketMouse key={userId} userId={userId} />
      ))}
    </>
  );
};

export default MouseRenderer;
