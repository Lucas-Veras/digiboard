import RoomContextProvider from "@/contexts/RoomContext/RoomContext";

import { useRoom } from "@/recoil/room";

import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import NameInput from "./NameInput";
import ToolBar from "./Room/components/Toolbar/ToolBar";
import UserList from "./UserList";

const Room = () => {
  const room = useRoom();
  if (!room.id) return <NameInput />;
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <UserList />
        <ToolBar />
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
