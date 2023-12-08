import RoomContextProvider from "@/contexts/RoomContext/RoomContext";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import TooBar from "./TooBar";
import { useRoomId } from "@/recoil/room";

const Room = () => {
  const roomId = useRoomId();

  if (!roomId) return <div>Sem id da sala</div>;
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
