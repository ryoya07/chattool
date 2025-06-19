import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            setMessage('全ての項目を入力してください。');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => navigate('/'),1000);
            } else {
                setMessage(data.message || '登録に失敗しました。');
            }
        } catch (error) {
            setMessage('ネットワークエラー: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formRegister}>
            <h2 className={styles.title}>新規登録</h2>
            <input
                type="text"
                placeholder="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
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
            <button type="submit" className={styles.button}>登録</button>
            {message && <p className={styles.message}>{message}</p>}
        </form>
    );
};

export default RegisterForm;
