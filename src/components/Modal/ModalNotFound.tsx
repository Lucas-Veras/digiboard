import { useModal } from "@/recoil/modal";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalNotFound = ({ id }: { id: string }) => {
  const { closeModal } = useModal();

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h2 className="text-lg font-bold">
        A Sala com o id ({id}) não foi encontrada
      </h2>
      <h3>Verifique o id e tente entrar na sala novamente</h3>
    </div>
  );
};

export default ModalNotFound;
