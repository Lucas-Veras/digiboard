
export const handleMove = (move: Move, ctx: CanvasRenderingContext2D) => {
  const { path, options } = move;

  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.lineColor;

  if (move.eraser) ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  path.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.closePath();

  ctx.globalCompositeOperation = "source-over";
};

export const drawAllMoves = (
  ctx: CanvasRenderingContext2D,
  room: ClientRoom,
) => {
  const { movesWithoutUser, usersMoves, myMoves } = room;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const moves = [...movesWithoutUser, ...myMoves];

  usersMoves.forEach((userMoves) => {
    moves.push(...userMoves);
  });

  moves.sort((a, b) => a.timeStamp - b.timeStamp);

  moves.forEach((move) => {
    handleMove(move, ctx);
  });
};
