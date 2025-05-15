import React, { useState } from 'react';
import sytles from './ChatRoomForm.module.css'; // CSSモジュールをインポート

const ChatRoomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            setMessage('ルーム名を入力してください');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/chatrooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: roomName }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`ルーム「${data.name}」が作成されました`);
                setRoomName('');
            } else {
                setMessage('作成に失敗しました');
            }
        } catch (error) {
            setMessage('エラーが発生しました');
        }
    };

    return (
        <div className={sytles.chatRoomForm}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", borderBottom: "2px solid #777", paddingBottom: "15px" }}>
                トークルーム作成
            </h2>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="ルーム名を入力"
            />
            <button onClick={handleCreateRoom}>作成</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChatRoomForm;
