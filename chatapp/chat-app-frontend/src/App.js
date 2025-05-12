import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import RegisterForm from "./components/RegisterForm";
import ChatRoomForm from "./components/ChatRoomForm";
import ChatRoomList from "./components/ChatRoomList";

function App() {
  return (
    /*<BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatroom" element={<ChatRoomForm />} />
      </Routes>
      </BrowserRouter>*/
      <div className="App">
        <h1>チャットアプリ</h1>
        <ChatRoomForm />
        <ChatRoomList />
      </div>
  );
}

export default App;