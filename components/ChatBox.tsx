"use client";

import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { IMessage, ISendMessagePayload } from "@/types/message";

interface ChatBoxProps {
  currentUserId: string;
  otherUserId: string;
  otherUserName: string;
}

export default function ChatBox({
  currentUserId,
  otherUserId,
  otherUserName,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");

  // Load chat history on mount
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `/api/messages/${otherUserId}?currentUserId=${currentUserId}`
      );
      const data = await res.json();
      setMessages(data.messages || []);
    };
    fetchMessages();
  }, [currentUserId, otherUserId]);

  // Listen for socket messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg: IMessage) => {
      if (
        (msg.sender === currentUserId && msg.receiver === otherUserId) ||
        (msg.sender === otherUserId && msg.receiver === currentUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [currentUserId, otherUserId]);

  const handleSend = () => {
    if (!input.trim()) return;
    const socket = getSocket();
    if (!socket) return;

    const payload: ISendMessagePayload = {
      senderId: currentUserId,
      receiverId: otherUserId,
      text: input,
    };

    socket.emit("send-message", payload);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-300 bg-white font-medium flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <User size={16} className="text-gray-600" />
        </div>
        <span>{otherUserName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs text-sm ${
                msg.sender === currentUserId
                  ? "bg-green-200 text-right"
                  : "bg-white border"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500 block">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
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
  );
}
