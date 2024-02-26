import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

function Home() {
    return (
        <div className="home-container">
            <h1 className="title">Welcome to Image Uploader</h1>
            <p className="subtitle">Upload and share your images with ease!</p>
            <div className="buttons-container">
                <Link to="/signup" className="btn signup-btn">SignUp</Link>
                <Link to="/login" className="btn login-btn">Login</Link>
            </div>
        </div>
    );
}

export default Home;
