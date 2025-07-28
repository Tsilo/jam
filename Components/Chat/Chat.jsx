import React from "react";
import Message from "./Message.jsx";
import TextInput from "./TextInput.jsx";

const mockMessages = [
  { id: 1, text: "Hello there!", username: "Alice", isOtherUser: true },
  { id: 2, text: "Hi Alice!", username: "You", isOtherUser: false },
  { id: 3, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 4, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 5, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 6, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 7, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 8, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 9, text: "How are you?", username: "Alice", isOtherUser: true },
  { id: 13, text: "How are you?", username: "Alice", isOtherUser: true },
];

const Chat = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-4 space-y-2">
        {mockMessages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.text}
            username={msg.username}
            isOtherUser={msg.isOtherUser}
          />
        ))}
      </div>
      <TextInput />
    </div>
  );
};

export default Chat;
