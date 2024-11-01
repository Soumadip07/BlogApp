import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '../assets/search.svg';
import appwriteService from '../appwrite/conifg'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import formatDate from '../utils/ConstanFunc';
import moment from 'moment';

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const searchRef = useRef(null);
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
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchResults([]);
        }
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
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // console.log(searchResults)

    return (
        <div className={`flex flex-col items-center ${searchResults.length > 0 ? 'overlay-wrapper' : ''}`}>
            <div className="flex mb-4 overflow-hidden search-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="flex-grow px-4 py-2 outline-none"
                />
                <button className="search-button">
                    <img src={SearchIcon} alt='search-icon' className='search-icon' />
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="w-full d-flex flex-column justify-content-center align-items-center" ref={searchRef}>
                    {searchResults.length > 0 ? (
                        <ul className='d-flex justify-content-center align-items-center flex-column'>
                            {searchResults.map((result) => (
                                <li
                                    key={result.$id}
                                    className="py-3 mb-2 border-b cursor-pointer search-result-box "
                                    onClick={() => navigate(`/post/${result.$id}`)}
                                >
                                    <div className='d-flex justify-content-around'>
                                        <p className='fs-300 fw-bold'>{formatDate(moment(result?.date).format("YYYY,MM, DD"))}</p>
                                        <p>{result?.title}</p>
                                        <p className='category-card'>{result?.category}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchTerm && <p className='p-1 text-white search-result-box'>No such Posts..</p>
                    )}
                </div>
            )}

        </div >
    );
}

export default SearchBox;
