import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from "./ChatRoomPage.module.css";

const ChatRoomPage = () => {
    const { id } = useParams();
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    // ルーム名取得
    useEffect(() => {
        fetch(`http://localhost:8080/chatrooms/${id}`)
            .then(res => res.json())
            .then(data => setRoomName(data.name))
            .catch(err => console.error('ルーム取得失敗', err));
    }, [id]);

    // メッセージ一覧取得
    useEffect(() => {
        fetch(`http://localhost:8080/messages/room/${id}`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('メッセージ取得失敗', err));
    }, [id]);

    // メッセージ送信
    const handleSendMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId: id,
                    content: message,
                }),
            });

            if (response.ok) {
                setStatus('送信成功！');
                setMessage('');
                // 再取得して最新メッセージ反映
                const updatedMessages = await fetch(`http://localhost:8080/messages/room/${id}`).then(res => res.json());
                setMessages(updatedMessages);
            } else {
                setStatus('送信失敗');
            }
        } catch (error) {
            console.error(error);
            setStatus('エラーが発生しました');
        }
    };

    return (
        <div className={styles.chatRoomPage}>
            <h2>チャットルーム: {roomName}（ID: {id}）</h2>
            <h3>メッセージ一覧:</h3>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>- {msg.content}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力"
            />
            <button onClick={handleSendMessage}>送信</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ChatRoomPage;
