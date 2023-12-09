import RoomContextProvider from "@/contexts/RoomContext/RoomContext";

import { socket } from "@/lib/socket";
import { useRoom, useRoomId, useSetRoomId } from "@/recoil/room";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import TooBar from "./TooBar";

const Room = () => {
  const roomId = useRoomId();
  const room = useRoom();
  const setRoomId = useSetRoomId();
  const router = useRouter();

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) router.push("/");
      else setRoomId(`${roomIdFromServer}`);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [router, setRoomId]);

  if (!room.id) {
    const dynamicRoomId = router.query.roomId?.toString();
    if (dynamicRoomId) socket.emit("join_room", dynamicRoomId);
    else return null;
  }
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <TooBar />
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
