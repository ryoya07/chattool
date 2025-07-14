import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ChatRoomForm from "./components/ChatRoomForm";
import ChatRoomList from "./components/ChatRoomList";
import ChatRoomPage from "./components/ChatRoomPage";  // ルーム詳細ページ
import EditUserForm from "./components/EditUserForm";
import UserList from "./components/UserList";
import Header from "./components/Header";
import { AuthProvider } from './context/AuthContext';
import UserEdit from './pages/UserEdit';

function App() {
  const [username,setUsername] = useState("");
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm setUsername={setUsername} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/edit-user" element={<EditUserForm userId={1} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
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
    </AuthProvider>
  );
}

export default App;
