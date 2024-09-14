import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { account } from '../../appwrite/auth'; // Assuming auth.js is configured properly
import appwriteService from "../../appwrite/conifg.js";
import Button from '../Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../contexts/theme.js';
function Profile() {
    const [file, setFile] = useState(null); // Store selected file
    const authData = useSelector((state) => state.auth.userData)
    const currentPrefs = authData.prefs || {};
    const navigate = useNavigate();
    const { themeMode } = useTheme()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({
        ...currentPrefs,
        theme: themeMode || '',
        name: authData?.name || '',
        nickname: authData?.nickname || '',
        country: authData?.country || '',
        email: authData?.email || '',
        profile_picture: authData?.profile_picture || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Handle file change event
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // const uploadProfilePicture = async () => {
    //     try {
    //         if (!file) {
    //             console.log("No file selected");
    //             return;
    //         }
    //         const uploadedFile = await appwriteService.uploadFile(file);
    //         const fileId = uploadedFile.$id;

    //         const response = await account.updatePrefs({
    //             ...currentPrefs,
    //             profile_picture: fileId
    //         });

    //         console.log("Profile updated with picture:", response);
    //         dispatch(updateUserData(response));

    //     } catch (error) {
    //         console.error("Error uploading profile picture:", error);
    //     }
    // };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {

            if (!file) {
                console.log("No file selected");
                return;
            }
            const uploadedFile = await appwriteService.uploadFile(file);
            const fileId = uploadedFile.$id;
            const updatedPrefs = {
                ...currentPrefs,
                theme: themeMode,
                name: profile.name,
                nickname: profile.nickname,
                country: profile.country,
                email: profile.email,
                profile_picture: fileId
            };

            const response = await account.updatePrefs(updatedPrefs);

            console.log('Profile updated', response);

            dispatch(updateUserData(response));
            navigate('/')
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };
    console.log("profile:==", profile)

    return (
        <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
            <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-md">
                <h2 className="mb-6 text-3xl font-semibold text-center">Update Your Profile</h2>

                <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={updateProfile}>
                    <div>
                        <label className="block mb-2 text-lg" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="w-full p-3 text-white bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg" htmlFor="nickname">Nickname</label>
                        <input
                            type="text"
                            name="nickname"
                            value={profile.nickname}
                            onChange={handleInputChange}
                            className="w-full p-3 text-white bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your nickname"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg" htmlFor="country">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={profile.country}
                            onChange={handleInputChange}
                            className="w-full p-3 text-white bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your country"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full p-3 text-white bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-2 text-lg" htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleFileChange}
                            className="w-full p-3 text-white bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center col-span-1 md:col-span-2">
                        <Button
                            className="px-8 py-3 font-semibold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                            type="submit"
                        >
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default Profile;
