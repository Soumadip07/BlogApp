import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Make sure to install react-icons
import useTheme from '../contexts/theme';

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const changeHandler = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    return (
        <label className="relative inline-flex items-center ml-5 cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={changeHandler}
                checked={themeMode === "dark"}
            />
            <div className={`flex items-center h-8 p-1 transition-colors duration-100 ease-in-out rounded-full shadow-md w-14 ${themeMode === "dark" ? 'bg-heading border border-gray-600' : 'bg-white border border-black'}`}>
                <div className={`transform transition-transform duration-300 ease-in-out ${themeMode === "dark" ? 'translate-x-6' : ''}`}>
                    {themeMode === "dark" ? (
                        <FaMoon className="text-yellow-400" />
                    ) : (
                        <FaSun className="text-yellow-500" />
                    )}
                </div>
            </div>
        </label>
    );
}
