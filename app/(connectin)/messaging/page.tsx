"use client";

import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { IKImage } from "imagekitio-next";
import { useUser } from "@/context/UserContext";
import io from "socket.io-client";
import { Content } from "next/font/google";

export interface IChat {
  _id: string;
  lastMessage: string;
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

  const { user }: any = useUser();

  // 🔥 Send message
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

  // 🔥 Fetch chats & messages
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

  // 🔥 Socket setup
  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket server:", newSocket.id);
      newSocket.emit("register", user._id);
    });

    // Handle incoming message
    newSocket.on("private-message", (msg: IMessage) => {
      // Normalize shape
      const normalizedMsg = {
        _id: msg._id || Math.random().toString(36).slice(2),
        content: msg.content,
        sender: msg.sender,
        chat: msg.chat,
        createdAt: msg.createdAt || new Date().toISOString(),
      };

      setMessages((prev: any) => [...prev, normalizedMsg]);

      // 5️⃣ Update the chat list (if needed)
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

    setActiveChat;

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeChat]);

  return (
    <div className="flex max-h-[100vh] min-h-[100vh] bg-green-500 ">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 hidden sm:flex flex-col max-h-[100vh]  bg-red-400">
        <div className="p-2 flex gap-4">
          <Link
            href="/home"
            className="bg-green-400 px-4 rounded-xl flex items-center justify-center"
          >
            Home
          </Link>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex-1 overflow-y-scroll">
          {conversations?.map((chat: IChat) => (
            <div
              key={chat._id}
              className={`p-3 cursor-pointer border-b border-gray-200 hover:bg-gray-200 ${
                activeChat?._id === chat._id ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <IKImage
                      src={
                        chat.participants[0].full_name !== user.full_name
                          ? chat.participants[0].profile_image
                          : chat.participants[1].profile_image
                      }
                      alt="Profile Picture"
                      className="object-cover w-full h-full rounded-full"
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <span className="font-medium">
                    {chat.participants[0].full_name !== user.full_name
                      ? chat.participants[0].full_name
                      : chat.participants[1].full_name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(chat?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate ml-10">
                {chat?.lastMessage?.content || "No messages yet"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col max-h-[100vh] bg-yellow-600">
        {/* Header */}
        <div className="p-3 border-b border-gray-300 bg-white font-medium flex items-center space-x-2 bg-yellow-600">
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
              <span>
                {activeChat?.participants?.[0]?._id !== user?._id
                  ? activeChat?.participants?.[0]?.full_name
                  : activeChat?.participants?.[1]?.full_name}
              </span>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-purple-500 overflow-x-hidden">
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
                  className={`p-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === user._id
                      ? "bg-green-200 text-right"
                      : "bg-white border"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-500 block">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-300 bg-white flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-lg mr-2"
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
