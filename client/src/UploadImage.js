import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadImage.css'; // Import CSS file for styling
import NavigationBar from './NavigationBar';

function UploadImage() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages(); // Fetch images when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = localStorage.getItem('token'); // Retrieve token from local storage
            // const username = localStorage.getItem('username');

            if (!token) {
                throw new Error('Authentication token not found');
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Correctly format the Authorization header
                }
            };

            const response = await axios.post('/upload', formData, config);
            console.log('Image uploaded successfully:', response.data);
            fetchImages(); // After successful upload, fetch updated list of images
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    const fetchImages = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

            if (!token) {
                throw new Error('Authentication token not found');
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // Correctly format the Authorization header
                }
            };

            const response = await axios.get(`/images/${userId}`, config);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error.message);
        }
    };

    return (

        <div className="upload-container">
            <div className="logout-container"> <NavigationBar /> </div>
            <h2>Upload Image</h2>
            <input type="file" onChange={handleFileChange} className="upload-input" />
            <button className="upload-btn" onClick={handleUpload}>Upload</button>

            {/* Button to fetch images */}
            <button className="fetch-images-btn" onClick={fetchImages}>Fetch Images</button>

            {/* Display images */}
            {images.length > 0 && (
                <div className="image-list">
                    <h3>Images Uploaded by You</h3>
                    {images.map((image, index) => (
                        <li key={index}>{image.filename}</li>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UploadImage;
