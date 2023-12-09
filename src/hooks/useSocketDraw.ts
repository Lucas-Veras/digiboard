import { useSetUsers } from "@/recoil/room";
import { useEffect } from "react";
import { socket } from "../lib/socket";

export const useSocketDraw = (
  ctx: CanvasRenderingContext2D | undefined,
  drawing: boolean,
) => {
  const { handleAddMoveToUser, handleRemoveMoveFromUser } = useSetUsers();

  useEffect(() => {
    let moveToDrawLater: Move | undefined;
    let userIdLater = "";
    socket.on("user_draw", (move, userId) => {
      if (ctx && !drawing) {
        handleAddMoveToUser(userId, move);
      } else {
        moveToDrawLater = move;
        userIdLater = userId;
      }
    });

    return () => {
      socket.off("user_draw");

      if (moveToDrawLater && userIdLater && ctx) {
        handleAddMoveToUser(userIdLater, moveToDrawLater);
      }
    };
  }, [ctx, drawing, handleAddMoveToUser]);

  useEffect(() => {
    socket.on("user_undo", (userId) => {
      handleRemoveMoveFromUser(userId);
    });

    return () => {
      socket.off("user_undo");
    };
  }, [ctx, handleRemoveMoveFromUser]);
};
