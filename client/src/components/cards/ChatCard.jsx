import React from "react";

export const ChatCard = ({keyId, name, message, time}) => {
  return (
    <div
      key={keyId}
      className="flex items-center space-x-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600 truncate">{message}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
};
