import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import RegisterForm from "./components/RegisterForm";
import ChatRoomForm from "./components/ChatRoomForm";
import ChatRoomList from "./components/ChatRoomList";
import ChatRoomPage from "./components/ChatRoomPage";  // ルーム詳細ページ
import EditUserForm from "./components/EditUserForm";
import UserList from "./components/UserList";

function App() {
  const [username,setUsername] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm setUsername={setUsername} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chatroom" element={<ChatRoomForm />} />
          <Route path="/edit-user" element={<EditUserForm userId={1} />} />
          <Route path="/users" element={<UserList />} />
          {/* ルーム作成＆一覧をトップで表示するパターン */}
          <Route path="/rooms" element={
            <>
              <ChatRoomForm />
              <ChatRoomList username={username} />
            </>
          } />
          {/* ルーム選択後の詳細ページ */}
          <Route path="/chatrooms/:id" element={<ChatRoomPage username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
