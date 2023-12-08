import { socket } from "@/lib/socket";
import { useModal } from "@/recoil/modal";
import { useSetRoomId } from "@/recoil/room";
import { useRouter } from "next/router";
import { FormEvent, useState, useEffect } from "react";
import NotFountModal from "./Modal/ModalNotFound";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const setAtomRoomId = useSetRoomId();

  const router = useRouter();

  const { openModal } = useModal();

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(`/room/${roomIdFromServer}`);
    });

    socket.on("joined", (roomIdFromServer, failed) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(`/room/${roomIdFromServer}`);
      } else openModal(<NotFountModal id={roomId} />);
    });

    return () => {
      socket.off("created");
      socket.off("joined");
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room");
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId);
  };

  return (
    <div className="flex flex-col items-center py-24">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-extra">
        Digiboard
      </h1>
      <h3 className="text-xl sm:text-2xl">Real time whiteboard</h3>

      <form
        className="mt-8 flex flex-col items-center gap-2"
        onSubmit={handleJoinRoom}
      >
        <label htmlFor="room-id" className="self-start font-bold leading-tight">
          Coloque o id da sala
        </label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="id da sala..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button
          className="rounded-xl bg-black p-5 py-1 text-white transition-all hover:scale-105 active:scale-100"
          type="submit"
        >
          Entrar
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h5 className="self-start font-bold leading-tight">
          Criar uma nova sala
        </h5>
        <button
          className="rounded-xl bg-black p-5 py-1 text-white transition-all hover:scale-105 active:scale-100"
          onClick={handleCreateRoom}
        >
          Criar
        </button>
      </div>
    </div>
  );
};

export default Home;
