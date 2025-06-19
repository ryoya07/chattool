import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

    // ユーザー一覧取得
    useEffect(() => {
    fetch("http://localhost:8080/users", {
      credentials: "include", // ← 追加！
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ユーザーデータ取得:", data);
        if (Array.isArray(data)) {
            setUsers(data);
        } else {
            console.warn("⚠️ 配列じゃないデータが返ってきた:", data);
            setUsers([]); // fallbackしてエラー回避
        }
        })
        .catch((err) => {
        console.error("取得エラー:", err);
        setUsers([]);
        });
    }, []);

  // 削除処理
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("本当にこのユーザーを削除しますか？")) return;

    try {
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        alert("ユーザーを削除しました");
        // 再取得
        const updated = await fetch("http://localhost:8080/users", {
          credentials: "include",
        }).then((res) => res.json());

        setUsers(updated);
      } else {
        const data = await res.json();
        alert("削除失敗：" + data.message);
      }
    } catch (err) {
      console.error("通信エラー", err);
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}（{user.email}）{" "}
            <button onClick={() => handleDeleteUser(user.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
