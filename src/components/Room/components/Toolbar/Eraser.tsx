import { useOptions } from "@/recoil/options";
import React from "react";
import { FaEraser } from "react-icons/fa";

const Eraser = () => {
  const [options, setOptions] = useOptions();
  return (
    <button
      className={`text-xl ${options.erase && "bg-green-400"}`}
      onClick={() => {
        setOptions((prev) => ({ ...prev, erase: !prev.erase }));
      }}
    >
      <FaEraser />
    </button>
  );
};

export default Eraser;
