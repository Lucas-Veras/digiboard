import { socket } from "@/lib/socket";
import { useSetRoomId } from "@/recoil/room";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const NameInput = () => {
  const setRoomId = useSetRoomId();

  const [name, setName] = useState("");

  const router = useRouter();
  const roomId = (router.query.roomId || "").toString();

  useEffect(() => {
    if (!roomId) return;

    socket.emit("check_room", roomId);

    socket.on("room_exists", (exists) => {
      console.log("room_exists", exists);
      if (!exists) router.push("/");
    });

    return () => {
      socket.off("room_exists");
    };
  }, [roomId, router]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) router.push("/");
      else setRoomId(`${roomIdFromServer}`);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [router, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, name);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleJoinRoom}>
      <h1 className="mt-24 text-extra font-extrabold leading-tight">
        Digiboard
      </h1>
      <h3 className="text-2xl">Quadro branco em tempo real</h3>
      <div className="mt-10 mb-3 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Digite seu username
        </label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Username..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        className="rounded-xl bg-black p-5 py-1 text-white transition-all hover:scale-105 active:scale-100"
        type="submit"
      >
        Entrar na sala
      </button>
    </form>
  );
};

export default NameInput;
