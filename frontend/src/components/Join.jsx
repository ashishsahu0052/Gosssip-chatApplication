import React from "react";
import { socket } from "./socket";

const Join = ({ name, setName, room, setRoom, setScreen }) => {
  const handleJoin = () => {
    if (!name.trim() || !room.trim()) {
      alert("Enter name and room");
      return;
    }

    if (!socket.connected) {
      socket.connect();

      socket.once("connect", () => {
        socket.emit("joinRoom", {
          name,
          room,
        });
      });
    } else {
      socket.emit("joinRoom", {
        name,
        room,
      });
    }

    setScreen("chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            G
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Gossip</h1>

            <p className="text-sm text-gray-500">Connect & Chat Instantly</p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Join a Room
            </h2>

            <p className="text-gray-500 text-sm">
              Start chatting with your friends securely
            </p>
          </div>

          {/* NAME */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* ROOM */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Room Number
            </label>

            <input
              type="text"
              placeholder="Enter room number"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleJoin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] transition-transform text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Join Chat
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">
        <p className="mb-2">
          Made by <span className="font-semibold">Ashish Sahu</span>
        </p>

        <div className="flex justify-center gap-5">
          <a
            href="https://github.com/ashishsahu0052"
            target="_blank"
            className="hover:text-blue-500 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/ashish-sahu-20a83033a/"
            target="_blank"
            className="hover:text-blue-500 transition"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Join;
