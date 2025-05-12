import React, { useEffect, useState } from 'react';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

        useEffect(() => {
            fetch('http://localhost:8080/chatrooms')
                .then(res => res.json())
                .then(data => {
                    console.log('取得したルーム一覧:', data);  // 追加
                    setRooms(data);
                })
                .catch(err => console.error('取得失敗', err));
        }, []);

    return (
        <div>
            <h2>トークルーム一覧</h2>
                <ul>
                    {rooms.length === 0 ? (
                        <li>ルームがありません</li>
                    ) : (
                        rooms.map(room => (
                            <li key={room.id}>
                                <button onClick={() => setSelectedRoom(room.name)}>
                                    {room.name}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            {selectedRoom && <p>選択中のルーム: {selectedRoom}</p>}
        </div>
    );
};

export default ChatRoomList;
