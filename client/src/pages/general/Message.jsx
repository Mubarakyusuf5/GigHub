import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { ChatCard } from "../../components/cards/ChatCard";
import { ChatModal } from "../../components/modals/ChatModal";
import { useAuth } from "../../Context/AuthContext";

export const Message = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isClicked, setClicked] = useState(false);

  const messages = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow? around the cafetaria",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you? ok yeah not a problem",
      time: "2m ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
    },
  ];

  const checkClicked = () => {
    setClicked(true);
    console.log("clicked");
  };

  return (
    <div
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-full sm:w-[28rem] md:w-[34rem] lg:w-[31rem] border-r border-gray-300">
        <div className="px-4 pt-4 relative">
          <h1 className="text-3xl mb-3 font-bold">Messages</h1>
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
          <div className="h-[calc(100vh-12rem)] overflow-y-auto ">
            {messages.map((message) => (
              <ChatCard
                clicked={checkClicked}
                name={message.name}
                keyId={message.id}
                message={message.lastMessage}
                time={message.time}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:relative md:w-full">
        {/* if chat clicked then display chat modal in container of welcome only if state is true */}
        {isClicked === true ? (
          <ChatModal />
        ) : (
          <div className="flex-1 px-4 hidden sm:flex flex-col items-center justify-center space-y-4">
            <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-blue-500" />
            <h3 className="font-bold text-2xl">Welcome to Message</h3>
            <p className="text-gray-500 text-center">
              {`Once you're connected with a ${
                user.role === "Freelancer"
                  ? "client, you can communicate and team up here"
                  : "freelancer, you can communicate and discuss here."
              }`}
            </p>
            {user.role === "Freelancer" ? (
              <Link
                to="/find-jobs"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Search for jobs
              </Link>
            ) : (
              <Link
                to="/client/find-freelancers"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Search for
                Freelancer
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// if chat clicked then display chat modal in container of welcome only if state is true
