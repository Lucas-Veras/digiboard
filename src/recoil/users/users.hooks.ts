import { useRecoilValue } from "recoil";
import { usersIds, usersAtom } from "./users.atoms";

export const useUserIds = () => {
  const users = useRecoilValue(usersIds);
  return users;
};

export const useUsers = () => {
  const users = useRecoilValue(usersAtom);
  return users;
};
