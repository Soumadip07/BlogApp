import React from 'react';

const Wave = ({ color = 'white' }) => {
    return (
        <svg
            width=""
            height="263"
            viewBox="0 0 2160 263"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
                fill={color}
            />
        </svg>
    );
};

export default Wave;
