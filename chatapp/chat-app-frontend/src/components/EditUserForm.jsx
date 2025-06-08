// src/components/EditUserForm.jsx
import React, { useState } from "react";

const EditUserForm = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        setStatus("ユーザー情報を更新しました！");
      } else {
        setStatus("更新に失敗しました。");
      }
    } catch (err) {
      console.error("通信エラー:", err);
      setStatus("通信エラーが発生しました。");
    }
  };

  return (
    <div>
      <h2>ユーザー編集</h2>
      <input
        type="text"
        placeholder="新しいユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="新しいメールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleUpdate}>更新</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EditUserForm;
