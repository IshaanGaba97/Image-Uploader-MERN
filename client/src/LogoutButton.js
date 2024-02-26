import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user's authentication token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirect the user to the login page
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
