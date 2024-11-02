import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import productive from '../assets/productivity.png'; // Importing the images
import nature from '../assets/nature.png';
import tech from '../assets/tech.png';
import travel from '../assets/travel.png';
import food from '../assets/food.png';
import fashion from '../assets/fashion.png';
import PostContainer from './container/PostContainer';
function CategoryList({ posts }) {


    const categories = [
        {
            name: "Travel",
            image: travel,
        },
        {
            name: "Productivity",
            image: productive,
        },
        {
            name: "Technology",
            image: tech,
        },
        {
            name: "Nature",
            image: nature,
        },
        {
            name: "Food",
            image: food,
        },
        {
            name: "Fashion",
            image: fashion
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("Travel");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const filtered = posts?.filter((post) => post.category === selectedCategory);
        setFilteredPosts(filtered);
    }, [selectedCategory, posts]);

    return (
        <div className='w-full py-8'>
            <PostContainer>
                <ul className='flex-wrap d-flex'>
                    {categories.map((category, index) => (
                        <li key={index} className='me-2'>
                            <button
                                className={`card tag-btn p-2 ${selectedCategory === category.name ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                <div className='d-flex'>
                                    <img src={category.image} width="32" height="32" alt={category.name} className='me-2' />
                                    <p>{category.name}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </PostContainer>
        </div>
    );
}

export default CategoryList;
