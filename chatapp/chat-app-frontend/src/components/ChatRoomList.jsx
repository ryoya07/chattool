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

    return (
        <div className={styles.chatRoomList}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", borderBottom: "2px solid #777", paddingBottom: "15px" }}>
                    トークルーム一覧
                </h2>

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
