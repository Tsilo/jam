import React from "react";
import Message from "./Message.jsx";
import TextInput from "./TextInput.jsx";
import { useMessagesStore } from "../../stores/useMessagesStore";
import { useUsersStore } from "../../stores/useUsersStore.js";

const Chat = () => {
  const messages = useMessagesStore((state) => state.messages);
  const me = useUsersStore((state) => state.me);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg.text}
              username={msg.sender || "Anonymous"}
              isOtherUser={!msg.isCurrentUser}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <TextInput />
    </div>
  );
};

export default Chat;
