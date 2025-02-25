import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, PlusCircleIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChatCard } from "../../components/cards/ChatCard";

export const Message = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const messages = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago" },
    { id: 3, name: "Alice Johnson", lastMessage: "Thanks for your help!", time: "3h ago" },
  ];

  return (
    <div className="flex  bg-gray-100 overflow-hidden" style={{height: "calc(100vh - 3.5rem)"}}>
      <div className="w-96 border-r border-gray-300">
        <div className="px-4 pt-4 relative">
          <div className=" top-0 sticky mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search messages"
              className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            {messages.map((message) => (
              <ChatCard name={message.name} keyId={message.id} message={message.lastMessage} time={message.time} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-blue-500" />
        <h3 className="font-bold text-2xl">Start Messaging</h3>
        <p className="text-gray-500">Select a conversation or start a new one</p>
        <Link
          to="#"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <PlusCircleIcon className="mr-2 h-5 w-5" /> New Message
        </Link>
      </div>
    </div>
  );
};
