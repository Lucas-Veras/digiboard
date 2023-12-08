import { useUserIds } from "@/recoil/users";
import UserMouse from "./UserMouse";

const MouseRenderer = () => {
  const userIds = useUserIds();

  return (
    <>
      {userIds.map((userId) => (
        <UserMouse key={userId} userId={userId} />
      ))}
    </>
  );
};

export default MouseRenderer;
