import { useEffect, useRef, useState } from "react";
import Hyperswarm from "hyperswarm";
import hic from "hypercore-id-encoding";
import { useUsersStore } from "../stores/useUsersStore";
import { useMessagesStore } from "../stores/useMessagesStore";
import { usePianoStore } from "../stores/usePianoStore.js";

export const useHyperswarm = (
  topic = "23337a386653415371314f315a6d386f504576774259624e32446a7377393752",
) => {
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

    const requestUserInfo = (conn) => {
      conn.write(
        JSON.stringify({
          type: "request-user-info",
        }),
      );
    };

    const sendUserInfo = (conn, publicKey) => {
      const me = useUsersStore.getState().me;
      if (me) {
        conn.write(
          JSON.stringify({
            type: "user-info",
            publicKey: me.publicKey,
            payload: {
              username: me.username,
              color: me.color,
            },
          }),
        );
      }
    };

    const handleConnection = (conn, info) => {
      const publicKey = info.publicKey.toString("hex");
      console.log("[connection joined]", conn, info, publicKey);

      useUsersStore.getState().addUser(publicKey, {
        connection: conn,
        publicKey,
      });

      requestUserInfo(conn);

      conn.on("data", (data) => {
        try {
          const message = JSON.parse(data.toString());
          console.log("[data received]", message);

          switch (message.type) {
            case "chat-message":
              useMessagesStore.getState().addMessage({
                ...message.payload,
                isCurrentUser: false,
              });
              break;
            case "key-pressed":
              usePianoStore.getState().setPressedKey(message.payload);
              break;
            case "request-user-info":
              sendUserInfo(conn);
              break;
            case "user-info":
            case "username-updated":
              useUsersStore
                .getState()
                .updateUser(message.publicKey, message.payload);
              break;
            default:
              console.log("Unknown message type:", message.type);
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
        useUsersStore.getState().removeUser(publicKey);
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
  }, [topic]);

  return {
    swarm: hyperswarm.current,
    loaded,
  };
};
