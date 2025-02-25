import { useState } from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

const mockMessages = [
  { id: 1, sender: "User", content: "Hello! How are you?" },
  {
    id: 2,
    sender: "AI",
    content: "Hi there! I'm doing well, thank you. How can I assist you today?",
  },
  { id: 3, sender: "User", content: "I have a question about React hooks." },
  {
    id: 4,
    sender: "AI",
    content:
      "Sure, I'd be happy to help with any questions you have about React hooks. What specifically would you like to know?",
  },
];

export const ChatModal = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleDelete = (id) => {
    console.log(`Delete message with id: ${id}`);
    setActiveMenu(null);
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    console.log(`Copied message: ${content}`);
    setActiveMenu(null);
  };

  return (
    <div className="bg-black bg-opacity-55 min-h-screen px-4 lg:px-[160px] fixed top-0 left-0 w-full z-20 flex justify-center items-center">
      <div className="bg-white w-full h-[95vh] rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Chat with AI</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "User" ? "justify-end" : "justify-start"
              } group relative`}
            >
              <div
                className={`relative max-w-[70%] p-3 rounded-lg flex items-center space-x-2 ${
                  message.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span>{message.content}</span>
                <button
                  onClick={() => toggleMenu(message.id)}
                  className="p-1 rounded-full bg-white shadow-md opacity-100 focus:outline-none"
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              {activeMenu === message.id && (
                <div className="absolute top-full right-[300px] mt-1 bg-white rounded-md shadow-lg z-10 w-28">
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                  >
                    <ClipboardIcon className="h-4 w-4 mr-2" />
                    Copy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <PaperClipIcon className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
