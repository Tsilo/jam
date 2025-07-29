import { useEffect, useRef, useState } from "react";
import Hyperswarm from "hyperswarm";
import hic from "hypercore-id-encoding";
import { useUsersStore } from "../stores/useUsersStore";
import { useMessagesStore } from "../stores/useMessagesStore";

export const useHyperswarm = (
  topic = "23337a386673415371314f315a6d386f504576774259624e32446a7377393752",
) => {
  const { addUser, removeUser } = useUsersStore();
  const [loaded, setLoaded] = useState(false);
  const hyperswarm = useRef(null);

  useEffect(async () => {
    const swarm = new Hyperswarm();
    hyperswarm.current = swarm;
    console.log("init swarm", swarm);
    Pear.teardown(async () => {
      if (swarm) {
        await swarm.destroy();
      }
    });

    const handleConnection = (conn, info) => {
      console.log("[connection joined]", info);
      const publicKey = info.publicKey.toString("hex");

      addUser(publicKey, {
        connection: conn,
        publicKey,
        connectedAt: new Date().toISOString(),
      });

      conn.on("data", (data) => {
        try {
          const message = JSON.parse(data.toString());
          console.log("[message received]", message);

          if (message.type === "chat-message") {
            useMessagesStore.getState().addMessage({
              ...message.payload,
              isCurrentUser: false,
            });
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      });

      conn.on("update", () => {
        console.log("[swarm update]", info);
      });

      conn.on("error", () => {
        console.log("[swarm error]", info);
      });

      conn.on("close", () => {
        console.log(`[connection left] ${publicKey}`);
        removeUser(publicKey);
      });
    };

    swarm.on("connection", handleConnection);

    const discovery = swarm.join(hic.decode(topic), {
      server: true,
      client: true,
    });
    await discovery.flushed();
    setLoaded(true);
    console.log("swarm loaded", discovery);
  }, [topic, addUser, removeUser]);

  return {
    swarm: hyperswarm.current,
    loaded,
  };
};
