import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./LineWidthPicker";

const ToolBar = () => {
  return (
    <div
      className="absolute left-10 top-[50%] z-50 flex flex-col items-center rounded-lg gap-5 bg-black p-5 text-white"
      style={{ transform: "translateY(-50%)" }}
    >
      <ColorPicker />
      <LineWidthPicker />
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
