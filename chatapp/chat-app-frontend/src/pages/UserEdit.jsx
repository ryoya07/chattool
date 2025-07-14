import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });

  // ユーザー取得
  useEffect(() => {
    fetch(`http://localhost:8080/users`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u.id === Number(id));
        if (found) setUser(found);
        else alert("ユーザーが見つかりませんでした");
      });
  }, [id]);

  // 更新処理
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8080/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user)
      });

      if (res.ok) {
        alert("更新成功！");
        navigate("/users");
      } else {
        const data = await res.json();
        alert("更新失敗: " + data.message);
      }
    } catch (err) {
      alert("エラーが発生しました");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>ユーザー情報の編集</h2>
      <label>
        ユーザー名：
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </label>
      <br />
      <label>
        メールアドレス：
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
};

export default UserEdit;
