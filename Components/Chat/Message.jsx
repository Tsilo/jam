import React from "react";

const Message = ({ message, username, isOtherUser }) => {
  return (
    <div
      className={`flex ${isOtherUser ? "justify-start" : "justify-end"} mb-1`}
    >
      <div
        className={`rounded-lg px-3 py-1.5 max-w-xs ${isOtherUser ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"}`}
      >
        {isOtherUser && (
          <div className="text-xs font-semibold text-gray-600 truncate">
            {username}
          </div>
        )}
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Message;
