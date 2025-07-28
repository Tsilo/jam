import { createContext, useEffect, useRef, useState } from "react";
import Hyperswarm from "hyperswarm";
import hic from "hypercore-id-encoding";

const PeersContext = createContext();

function PeersProvider({
  children,
  topic = "23337a386673415371314f315a6d386f504576774259624e32446a7377393752",
}) {
  const [loaded, setLoaded] = useState(false);
  const [peers, setPeers] = useState([]);
  const hyperswarm = useRef(new Hyperswarm());
  const updatePeers = () => {
    setPeers(Array.from(hyperswarm.current.connections));
  };
  useEffect(async () => {
    Pear.teardown(async () => {
      await hyperswarm.current.destroy();
    });

    hyperswarm.current.on("connection", async (conn, info) => {
      console.log("[connection joined]", info);
      conn.on("data", (message) => {
        console.log("[message received]", message.toString());
      });

      conn.on("update", () => {
        console.log("[swarm update]", info);
      });
      conn.on("close", () => {
        console.log(`[connection left] ${conn}`);
        updatePeers();
      });

      updatePeers();
    });

    const discovery = hyperswarm.current.join(hic.decode(topic), {
      server: true,
      client: true,
    });
    await discovery.flushed();
    setLoaded(true);
  }, []);

  return (
    <PeersContext.Provider value={{ peers, loaded }}>
      {children}
    </PeersContext.Provider>
  );
}

export { PeersContext, PeersProvider };
