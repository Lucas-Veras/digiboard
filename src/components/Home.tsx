import { socket } from "@/lib/socket";
import { useModal } from "@/recoil/modal";
import { useSetRoomId } from "@/recoil/room";
import { useRouter } from "next/router";
import { FormEvent, useState, useEffect } from "react";
import NotFountModal from "./Modal/ModalNotFound";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const setAtomRoomId = useSetRoomId();

  const router = useRouter();

  const { openModal } = useModal();

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(`/room/${roomIdFromServer}`);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(`/room/${roomIdFromServer}`);
      } else openModal(<NotFountModal id={roomId} />);
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId, username);
  };

  return (
    <div className="flex flex-col items-center py-24">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-extra">
        Digiboard
      </h1>
      <h3 className="text-xl sm:text-2xl">Real time whiteboard</h3>

      <div className="mt-10 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Digite seu username
        </label>
        <input
          type="text"
          className="rounded-lg border p-5 py-1"
          id="room-id"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <form
        className=" flex flex-col items-center gap-3"
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

      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-200" />
        <p className="text-zinc-400">ou</p>
        <div className="h-px w-full bg-zinc-200" />
      </div>

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
