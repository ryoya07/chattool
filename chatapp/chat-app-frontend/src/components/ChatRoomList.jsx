import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatRoomList.module.css';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/chatrooms')
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error('取得失敗', err));
    }, []);

    return (
        <div className={styles.chatRoomList}>
            <h2>トークルーム一覧</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <button onClick={() => navigate(`/chatrooms/${room.id}`)}>
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;
