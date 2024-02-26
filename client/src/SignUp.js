import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './SignUp.css'; // Import CSS file for styling

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post('/register', { username, password });
            console.log(response.data.message);
            navigate("/login");
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <div className="input-container">
                <input className="input-field" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="signup-btn" onClick={handleSignUp}>Sign Up</button>
            <div><p className='login-message'>Already signed up, please <a href="/login">Login</a></p></div>
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}

export default SignUp;
