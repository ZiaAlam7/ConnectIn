"use client";

import { useEffect, useState, useRef } from "react";
import { Send, MoreVertical } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { IKImage } from "imagekitio-next";
import { useUser } from "@/context/UserContext";
import io from "socket.io-client";
import StartChat from "@/components/ui/start-chat";

interface Message {
  _id: string;
  content: string;
}

export interface IChat {
  _id: string;
  lastMessage: Message;
  participants: any[];
  unread: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IMessage {
  _id: string;
  sender: string;
  chat: string;
  content: string;
  status: "sent" | "delivered" | "read";
  createdAt: string;
  updatedAt: string;
}

export default function ChatApp() {
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [targetChatId, setTargetChatId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user }: any = useUser();

  const handleSend = async () => {
    if (!input.trim() || !activeChat?._id) return;

    const newMessage = {
      content: input,
      sender: user._id,
      status: "sent",
      chat: activeChat._id,
    };

    setInput("");

    try {
      await axios.post("/api/send-message", newMessage);

      socket?.emit("private-message", {
        senderId: user._id,
        receiverId:
          activeChat.participants[0]._id !== user._id
            ? activeChat.participants[0]._id
            : activeChat.participants[1]._id,
        chatId: activeChat._id,
        content: newMessage.content,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleDeleteChat = async (conversationId: string) => {
    try {
      const response = await axios.delete("/api/delete-conversation", {
        data: { conversationId },
      });

      if (response.status === 200) {
        console.log("✅ Conversation deleted:", response.data.conversation);
        window.location.reload();
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (err) {
      console.error("❌ Failed to delete conversation:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("/api/fetch-messages"),
          axios.get("/api/fetch-conversations"),
        ]);

        setMessages(res1.data.allMessages);
        setConversations(res2.data.allConversation);
        setActiveChat(res2.data.allConversation[0]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket server:", newSocket.id);
      newSocket.emit("register", user._id);
    });

    newSocket.on("private-message", (msg: IMessage) => {
      const normalizedMsg = {
        _id: msg._id || Math.random().toString(36).slice(2),
        content: msg.content,
        sender: msg.sender,
        chat: msg.chat,
        createdAt: msg.createdAt || new Date().toISOString(),
      };

      setMessages((prev: any) => [...prev, normalizedMsg]);

      setConversations((prevConvos: any) =>
        Array.isArray(prevConvos)
          ? prevConvos.map((chat: any) =>
              chat._id === normalizedMsg?.chat
                ? { ...chat, lastMessage: { content: normalizedMsg.content } }
                : chat
            )
          : prevConvos
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) setTargetChatId(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row max-h-[100vh] min-h-[100vh]">
      {/* Sidebar */}
      <div
        className={`${
          activeChat ? "hidden sm:flex" : "flex"
        } w-full sm:w-1/3 border-r border-gray-300 flex-col max-h-[100vh] bg-gray-300`}
      >
        <div className="p-2 flex gap-4">
          <Link
            href="/home"
            className="bg-green-400 px-4 rounded-xl flex items-center justify-center"
          >
            Home
          </Link>
          <StartChat />
        </div>

        <div className="flex-1 p-2">
          {conversations?.map((chat: IChat) => (
            <div
              key={chat._id}
              className={`p-3 my-1 cursor-pointer border-b border-white hover:bg-gray-200 ${
                activeChat?._id === chat._id ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <IKImage
                      src={
                        chat.participants[0]?.full_name !== user?.full_name
                          ? chat.participants[0]?.profile_image
                          : chat.participants[1]?.profile_image
                      }
                      alt="Profile Picture"
                      className="object-cover w-full h-full rounded-full"
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    {chat.participants[0]?.full_name !== user?.full_name
                      ? chat.participants[0]?.full_name
                      : chat.participants[1]?.full_name}
                  </span>
                </div>

                <div className="flex gap-1 items-center">
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {new Date(chat?.createdAt).toLocaleDateString()}
                  </span>

                  <div className="relative menu-container" ref={menuRef}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetChatId(chat._id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {chat._id === targetChatId && (
                      <div
                        className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeleteChat(chat._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate ml-10">
                {chat?.lastMessage?.content || "No messages yet"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 flex flex-col max-h-[100vh] ${
          !activeChat ? "hidden sm:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-300 bg-white font-medium flex items-center space-x-2">
          <button
            onClick={() => setActiveChat(null)}
            className="sm:hidden text-green-600 font-semibold"
          >
            ← Back
          </button>
          {activeChat && (
            <>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <IKImage
                  src={
                    activeChat?.participants?.[0]?._id !== user?._id
                      ? activeChat?.participants?.[0]?.profile_image
                      : activeChat?.participants?.[1]?.profile_image
                  }
                  alt="Profile Picture"
                  className="object-cover w-full h-full rounded-full"
                  width={1200}
                  height={1200}
                />
              </div>
              <span className="truncate">
                {activeChat?.participants?.[0]?._id !== user?._id
                  ? activeChat?.participants?.[0]?.full_name
                  : activeChat?.participants?.[1]?.full_name}
              </span>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 overflow-x-hidden">
          {messages
            ?.filter((msg) => msg.chat === activeChat?._id)
            .map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[80%] text-sm break-words ${
                    msg.sender === user._id
                      ? "bg-green-200 text-right"
                      : "bg-white border"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-500 block">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-300 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-lg text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
