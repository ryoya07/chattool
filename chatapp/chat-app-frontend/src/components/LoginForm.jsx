import React, { use, useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const LoginForm = ({setUsername}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください。");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("ログインユーザー名：", data.username);
        setUsername(data.username); // ユーザー名をセット
        setMessage(data.message);
        navigate("/rooms"); // ログイン成功後にルーム一覧へ遷移
      } else {
        setMessage("ログイン失敗");
      }
    } catch (err) {
      setMessage("通信エラー");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default LoginForm;
