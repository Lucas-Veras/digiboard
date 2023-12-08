import RoomContextProvider from "@/contexts/RoomContext/RoomContext";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import TooBar from "./TooBar";

const Room = () => {
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
