import React, { useEffect, useRef, useState } from "react";

import { socket } from "./socket";

const ChatRoom = ({ name, room, setScreen }) => {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  // RECEIVE MESSAGES
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.sender,
          text: data.text,
          self: false,
        },
      ]);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.sender,
          text: data.text,
          self: data.sender === name,
        },
      ]);
    });

    return () => {
      socket.off("message");

      socket.off("receiveMessage");
    };
  }, [name]);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      sender: name,
      text: input,
      room,
    });

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      {/* CHAT BOX */}
      <div className="w-full max-w-4xl h-[90vh] bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-md shadow-md border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* LOGO */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              G
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gossip</h1>

              <p className="text-sm text-gray-500">Room {room}</p>
            </div>
          </div>

          {/* LEAVE BUTTON */}
          <button
            onClick={() => setScreen("join")}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl shadow-md"
          >
            Leave
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 bg-gradient-to-b from-white/20 to-blue-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                  msg.self
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border"
                }`}
              >
                {!msg.self && (
                  <p className="text-xs font-bold text-blue-500 mb-1">
                    {msg.sender}
                  </p>
                )}

                <p className="break-words">{msg.text}</p>
              </div>
            </div>
          ))}

          <div ref={bottomRef}></div>
        </div>

        {/* INPUT AREA */}
        <div className="bg-white/80 backdrop-blur-md border-t px-4 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
