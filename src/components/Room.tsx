import RoomContextProvider from "@/contexts/RoomContext/RoomContext";

import { useRoom } from "@/recoil/room";

import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import NameInput from "./NameInput";
import ToolBar from "./Room/components/Toolbar/ToolBar";

const Room = () => {
  const room = useRoom();
  if (!room.id) return <NameInput />;
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <ToolBar />
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
