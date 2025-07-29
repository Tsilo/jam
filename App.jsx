import React, { useEffect } from "react";
import Player from "./Components/Player.jsx";
import UsersList from "./Components/UsersList.jsx";
import UsernameModal from "./Components/UsernameModal.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import { useHyperswarm } from "./hooks/useHyperswarm";
import Loader from "./Components/Loader.jsx";
import { useUsersStore } from "./stores/useUsersStore.js";

export default function App() {
  const { loaded, swarm } = useHyperswarm();
  const { setMe } = useUsersStore();
  useEffect(() => {
    if (loaded && swarm) {
      setMe({
        publicKey: swarm?.keyPair?.publicKey?.toString("hex") || "no-key",
      });
    }
  }, [loaded, swarm]);
  return loaded ? (
    <div className="grid grid-cols-3 size-full grid-rows-[auto_1fr_auto]">
      <div className="min-h-0 col-span-2 border-b p-2">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>
      <div className="min-h-0 grid border-s p-1  border-b items-center">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Peers</h2>
          <UsernameModal />
        </div>
      </div>
      <div className="col-span-2 overflow-y-scroll">
        <Chat />
      </div>
      <div className="grid border-s p-2  overflow-y-scroll">
        <UsersList />
      </div>
      <div className="col-span-3 border-t min-h-0">
        <Player />
      </div>
    </div>
  ) : (
    <div className="size-full flex items-center justify-center">
      <Loader size="size-12" />
    </div>
  );
}
