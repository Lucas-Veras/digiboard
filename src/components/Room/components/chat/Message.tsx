import { socket } from "@/lib/socket";
import React from "react";

const Message = ({ userId, msg, username, color }: Message) => {
  const isMe = socket.id === userId;

  return (
    <div
      className={`my-2 flex gap-2 text-clip ${
        isMe && "justify-end text-right"
      }`}
    >
      {!isMe && (
        <h5 style={{ color }} className="font-bold">
          {username}
        </h5>
      )}
      <p style={{ wordBreak: "break-all" }}>{msg}</p>
    </div>
  );
};

export default Message;
