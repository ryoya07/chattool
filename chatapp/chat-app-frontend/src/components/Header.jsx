import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) return null;

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                logout();
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
        <header style={{
            position: 'fixed',
            top: 0,
            right: 0,
            padding: '1rem',
            backgroundColor: 'white',
            zIndex: 1000
        }}>
            <button onClick={handleLogout}>ログアウト</button>
        </header>
    );
};

export default Header;
