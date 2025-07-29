import React, { useState } from "react";
import Button from "../ui/Button.jsx";
import { useMessagesStore } from "../../stores/useMessagesStore";
import { useUsersStore } from "../../stores/useUsersStore";

const TextInput = () => {
  const [message, setMessage] = useState("");
  const addMessage = useMessagesStore((state) => state.addMessage);
  const users = useUsersStore((state) => state.users);
  const me = useUsersStore((state) => state.me);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      isCurrentUser: true,
      sender: me.name || me.publicKey,
      timestamp: new Date().toISOString(),
    };
    addMessage(newMessage);

    users.forEach((user) => {
      if (user.connection && user.connection.writable) {
        user.connection.write(
          JSON.stringify({
            type: "chat-message",
            payload: newMessage,
          }),
        );
      }
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex gap-2 ">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 "
          rows="1"
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button disabled={!message.trim()} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </form>
  );
};

export default TextInput;
