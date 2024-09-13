import React, { useState } from 'react';
import Input from '../Input';
import { account } from '../../appwrite/auth'; // Assuming auth.js is configured properly
import appwriteService from "../../appwrite/conifg.js";
import Button from '../Button.jsx';

function Profile() {
    const [file, setFile] = useState(null); // Store selected file

    // Handle file change event
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const uploadProfilePicture = async () => {
        try {
            if (!file) {
                console.log("No file selected");
                return;
            }
            const uploadedFile = await appwriteService.uploadFile(file);
            const fileId = uploadedFile.$id;

            const response = await account.updatePrefs({
                profile_picture: fileId
            });

            console.log("Profile updated with picture:", response);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    uploadProfilePicture();
                }}
            >
                <p>Upload Profile Picture</p>
                <Input type="file" onChange={handleFileChange} />
                <Button type="w-16 h-16 rounded-full submit">Upload</Button>
            </form>
        </div>
    );
}

export default Profile;
