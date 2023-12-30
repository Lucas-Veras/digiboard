import { useBoardPosition } from "@/contexts/RoomContext/RoomContext";
import { drawAllMoves } from "@/helpers/canvasHelpers";
import { getPos } from "@/lib/getPos";
import { socket } from "@/lib/socket";
import { useOptionsValue } from "@/recoil/options";
import { useMyMoves, useRoom } from "@/recoil/room";
import { useCallback, useEffect, useState } from "react";

let tempMoves: [number, number][] = [];

const setCtxOptions = (ctx: CanvasRenderingContext2D, options: CtxOptions) => {
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.lineColor;

  if (options.erase) ctx.globalCompositeOperation = "destination-out";
};

export const useDraw = (
  ctx?: CanvasRenderingContext2D | undefined,
  blocked: boolean,
) => {
  const room = useRoom();
  const { handleRemoveMyMove, handleAddMyMove } = useMyMoves();

  const boardPosition = useBoardPosition();
  const movedX = boardPosition.x;
  const movedY = boardPosition.y;

  const options = useOptionsValue();

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    if (ctx) setCtxOptions(ctx, options);
  });

  useEffect(() => {
    socket.on("your_move", (move) => {
      handleAddMyMove(move);
    });

    return () => {
      socket.off("your_move");
    };
  });

  const handleUndo = useCallback(() => {
    if (!ctx) return;
    handleRemoveMyMove();
    socket.emit("undo");
  }, [ctx, handleRemoveMyMove]);

  useEffect(() => {
    const handleUndoKeyboard = (e: KeyboardEvent) => {
      if (e.key === "z" && e.ctrlKey) {
        handleUndo();
      }
    };

    document.addEventListener("keydown", handleUndoKeyboard);

    return () => document.removeEventListener("keydown", handleUndoKeyboard);
  }, [handleUndo]);

  const handleStartDrawing = (x: number, y: number) => {
    if (!ctx || blocked) return;

    setDrawing(true);

    ctx.beginPath();
    ctx.lineTo(getPos(x, movedX), getPos(y, movedY));
    ctx.stroke();

    tempMoves.push([getPos(x, movedX), getPos(y, movedY)]);
  };

  const handleEndDrawing = () => {
    if (!ctx || blocked) return;

    setDrawing(false);

    ctx.closePath();

    const move: Move = {
      path: tempMoves,
      options,
      timeStamp: 0,
      eraser: options.erase,
    };

    tempMoves = [];
    ctx.globalCompositeOperation = "source-over";

    socket.emit("draw", move);
  };

  const handleDraw = (x: number, y: number, shift?: boolean) => {
    if (!ctx || !drawing || blocked) return;

    if (shift) {
      tempMoves = tempMoves.slice(0, 1);

      drawAllMoves(ctx, room);

      setCtxOptions(ctx, options);

      ctx.beginPath();
      ctx.lineTo(getPos(x, movedX), getPos(y, movedY));
      ctx.stroke();

      tempMoves.push([getPos(x, movedX), getPos(y, movedY)]);
      return;
    }

    ctx.lineTo(getPos(x, movedX), getPos(y, movedY));
    ctx.stroke();

    tempMoves.push([getPos(x, movedX), getPos(y, movedY)]);
  };

  return {
    handleStartDrawing,
    handleEndDrawing,
    handleDraw,
    handleUndo,
    drawing,
  };
};
