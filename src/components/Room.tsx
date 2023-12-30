import RoomContextProvider from "@/contexts/RoomContext/RoomContext";

import { useRoom } from "@/recoil/room";

import Canvas from "./Room/components/board/Canvas";
import MousePosition from "./Room/components/board/MousePosition";
import MouseRenderer from "./Room/components/board/MouseRenderer";
import NameInput from "./NameInput";
import ToolBar from "./Room/components/toolbar/ToolBar";
import UserList from "./UserList";
import { useRef } from "react";
import Chat from "./Room/components/chat/Chat";

const Room = () => {
  const room = useRoom();
  const undoRef = useRef<HTMLButtonElement>(null);

  if (!room.id) return <NameInput />;
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <UserList />
        <ToolBar undoRef={undoRef} />
        <Canvas undoRef={undoRef} />
        <MousePosition />
        <MouseRenderer />
        <Chat />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
