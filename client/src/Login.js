import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Save token to local storage
            localStorage.setItem('userId', response.data.userId);

            navigate('/Upload');
            console.log('Token saved to local storage:', token);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-container">
                <input className="input-field" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
