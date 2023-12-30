import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./LineWidthPicker";
import Eraser from "./Eraser";
import { RefObject } from "react";
import { FaUndo } from "react-icons/fa";

const ToolBar = ({ undoRef }: { undoRef: RefObject<HTMLButtonElement> }) => {
  return (
    <div
      className="absolute left-10 top-[50%] z-50 flex flex-col items-center rounded-lg gap-5 bg-zinc-900 p-5 text-white"
      style={{ transform: "translateY(-50%)" }}
    >
      <button className="text-xl" ref={undoRef}>
        <FaUndo />
      </button>
      <div className="h-px w-full bg-white" />
      <ColorPicker />
      <LineWidthPicker />
      <Eraser />
      <button className="text-xl">
        <BsFillChatFill />
      </button>
      <button className="text-xl">
        <BsFillImageFill />
      </button>
      <button className="text-xl">
        <BsThreeDots />
      </button>
      <button className="text-xl">
        <HiOutlineDownload />
      </button>
    </div>
  );
};

export default ToolBar;
