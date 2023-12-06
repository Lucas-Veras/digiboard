import { socket } from "@/lib/socket";
import React, { useEffect, useState } from "react";
import SocketMouse from "./SocketMouse";

const MouseRenderer = () => {
  const [mouses, setMouses] = useState<string[]>([]);
  console.log("mouses", mouses);

  useEffect(() => {
    socket.on("users_in_room", (socketIds) => {
      const allUsers = socketIds.filter((socketId) => socketId !== socket.id);
      setMouses(allUsers);
    });

    return () => {
      socket.off("users_in_room");
    };
  }, []);

  return (
    <>
      {mouses.map((socketId) => (
        <SocketMouse key={socketId} socketId={socketId} />
      ))}
    </>
  );
};

export default MouseRenderer;
