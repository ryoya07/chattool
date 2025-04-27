import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password || !username) {
            alert('全ての項目を入力して下さい。');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok) {
                alert('登録成功しました！');
            } else {
                const errorData = await response.json();
                alert(`エラー: ` + (errorData.message || '登録に失敗しました。'));
            }
        } catch (error) {
            alert('ネットワークエラー: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>新規登録</h2>
            <input
                type="text"
                placeholder="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">登録</button>
        </form>
    );
}

export default RegisterForm;