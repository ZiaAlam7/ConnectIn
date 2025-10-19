"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket once when component loads
const socket = io("http://localhost:4000");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // listen for messages from server
    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // send message to server
    socket.emit("message", message);

    setMessage(""); // clear input
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">💬 Chat Room</h1>

      <div className="w-full max-w-md h-80 border p-3 mb-3 overflow-y-auto bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <p key={idx} className="bg-white p-2 rounded mb-1 shadow">
            {msg}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage} className="w-full max-w-md flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
