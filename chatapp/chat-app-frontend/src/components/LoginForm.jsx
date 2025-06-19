import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css'; // CSSモジュールを使う場合

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // ✅ ログイン済みか確認して自動遷移
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch('http://localhost:8080/login/me', {
                    credentials: 'include'
                });
                if (res.ok) {
                    navigate('/rooms');
                }
            } catch (err) {
                console.log('ログイン状態確認失敗:', err);
            }
        };
        checkLogin();
    }, [navigate]);

    // ✅ ログイン送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("メールアドレスとパスワードを入力してください。");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                console.error("JSONのパースエラー:", err);
                setMessage("サーバーからの応答が不正です。");
                return;
            }

            if (response.ok) {
                setMessage(data.message || "ログイン成功！");
                console.log("ログイン成功:", data.username);
                setTimeout(() => navigate("/rooms"), 800);
            } else {
                setMessage(data.message || "ログインに失敗しました。");
            }
        } catch (error) {
            console.error("通信エラー:", error);
            setMessage("通信エラーが発生しました。");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.title}>ログイン</h2>

            <div>
                <label className={styles.label}>メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <div>
                <label className={styles.label}>パスワード</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <button type="submit" className={styles.button}>ログイン</button>

            {message && <p className={styles.message}>{message}</p>}
        </form>
    );
};

export default LoginForm;
