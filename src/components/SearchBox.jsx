import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBox() {
    return (
        <div className="flex bg-white rounded-full overflow-hidden shadow-md w-[500px]">
            <input
                type="text"
                placeholder="Search article"
                className="flex-grow px-4 py-2 outline-none"
            />
            <button className="flex items-center justify-center px-4 py-2 text-white bg-blue-600">
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchBox;
