import React, { useState } from "react";

import Join from "./Join";
import ChatRoom from "./ChatRoom";

const Chat = () => {
  const [screen, setScreen] = useState("join");

  const [name, setName] = useState("");

  const [room, setRoom] = useState("");

  return (
    <>
      {screen === "join" ? (
        <Join
          name={name}
          setName={setName}
          room={room}
          setRoom={setRoom}
          setScreen={setScreen}
        />
      ) : (
        <ChatRoom name={name} room={room} setScreen={setScreen} />
      )}
    </>
  );
};

export default Chat;
