import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://chat-app-back-higuera.herokuapp.com/");
//const socket = io.connect(process.env.URL_BACK);


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="user 1..."
            onChange={(event) => setUsername(event.target.value)}
            
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
