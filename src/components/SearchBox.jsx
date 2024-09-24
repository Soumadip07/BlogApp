import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import appwriteService from '../appwrite/conifg'
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const handleSearch = async (query) => {
        if (!query) return;

        setLoading(true);
        const response = await appwriteService.getSearchPosts(query);
        console.log(response)
        if (response) {
            setSearchResults(response.documents);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (searchTerm) {
                handleSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [searchTerm]);
    return (
        <div className="flex flex-col items-center">
            <div className="flex bg-white rounded-full overflow-hidden shadow-md w-[500px] mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search article"
                    className="flex-grow px-4 py-2 outline-none"
                />
                <button className="flex items-center justify-center px-4 py-2 text-white bg-blue-600">
                    <FaSearch />
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li
                                    key={result.$id}
                                    className="py-2 border-b cursor-pointer text-danger"
                                    onClick={() => navigate(`/post/${result.$id}`)} // Correctly referencing the result.$id
                                >
                                    {result?.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchTerm && <p>No results found</p>
                    )}
                </div>
            )}

        </div >
    );
}

export default SearchBox;
