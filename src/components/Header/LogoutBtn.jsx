import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import Loader from '../Loader';

function LogoutBtn() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        setLoading(true); // Set loading to true when the process starts
        try {
            await authService.logout(); // Await the logout process
            dispatch(logout()); // Dispatch the logout action
        } catch (error) {
            console.error("Logout failed: ", error);
        }
        setLoading(false); // Set loading to false when the process is complete
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center w-full">
                    <Loader />
                </div>
            ) : (
                <button
                    className="inline-block px-6 py-2 fs-700 nav-items-inactive nav-items"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            )}
        </>
    );
}

export default LogoutBtn;
