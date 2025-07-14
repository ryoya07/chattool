import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
                    login();
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include"
            });

            if (response.ok) {
                setMessage("ログイン成功！");
                login();
                setTimeout(() => navigate("/rooms"), 800);
            } else {
                setMessage("ログインに失敗しました。");
            }
        } catch (error) {
            console.error("通信エラー:", error);
            setMessage("通信エラーが発生しました。");
        }
    };


    // ✅ 新規登録ボタンの処理
    const handleRegister = () => {
        navigate('/register');
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
            <p className={styles.or}>または</p>
            <button type="button" className={styles.button} onClick={handleRegister}>新規作成</button>


            {message && <p className={styles.message}>{message}</p>}
        </form>
    );
};

export default LoginForm;
