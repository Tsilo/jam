import React from "react";
import Player from "./Components/Player.jsx";
import UsersList from "./Components/UsersList.jsx";

export default function App() {
  return (
    <div className="grid grid-cols-3 gap-2 size-full">
      <div className="col-span-2">
        <h1 className="text-lg font-bold">Play together</h1>
        <Player />
      </div>
      <div className="grid border-s p-2">
        <div>
          <h2 className="text-lg font-bold">Peers</h2>
          <UsersList />
        </div>
      </div>
    </div>
  );
}
