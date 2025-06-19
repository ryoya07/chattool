import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatRoomList.module.css';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ ログイン済みユーザーを取得
        fetch("http://localhost:8080/login/me", {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    navigate('/');
                    return null;
                }
                return res.json();
            })
            .then(user => {
                if (user) {
                    setUsername(user.username);
                }
            })
            .catch(() => navigate('/'));
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:8080/chatrooms', {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error('取得失敗', err));
    }, []);

    // ✅ ログアウト処理
    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                navigate("/"); // ログイン画面に戻る
            } else {
                alert("ログアウトに失敗しました");
            }
        } catch (err) {
            console.error("通信エラー:", err);
            alert("エラーが発生しました");
        }
    };

    return (
        <div className={styles.chatRoomList}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", borderBottom: "2px solid #777", paddingBottom: "15px" }}>
                    トークルーム一覧
                </h2>
                <button onClick={handleLogout} style={{ padding: "5px 10px", background: "#ccc", borderRadius: "5px" }}>
                    ログアウト
                </button>
            </div>

            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <button onClick={() => navigate(`/chatrooms/${room.id}?username=${encodeURIComponent(username)}`)}>
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;
