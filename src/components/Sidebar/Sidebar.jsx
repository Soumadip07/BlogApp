import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Logo, LogoutBtn } from '../index'
import { FaHome, FaRegNewspaper, FaTags, FaUserPlus, FaSignInAlt, FaPlusCircle, FaList } from 'react-icons/fa'; // Import icons

function Sidebar() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
            icon: <FaHome /> // Add icon here
        },
        {
            name: "Latest",
            slug: "/latest",
            active: authStatus,
            icon: <FaRegNewspaper /> // Add icon here
        },
        {
            name: "Tags",
            slug: "/category",
            active: authStatus,
            icon: <FaTags /> // Add icon here
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
            icon: <FaSignInAlt /> // Add icon here
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
            icon: <FaUserPlus /> // Add icon here
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
            icon: <FaList /> // Add icon here
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
            icon: <FaPlusCircle /> // Add icon here
        },
    ];

    return (
        <div className='z-20 sidebar'>
            <div className='m-4'>
                <Link to='/'>
                    <Logo width='100px' />
                </Link>
            </div>
            <ul className='flex flex-col ml-auto'>
                {navItems.map((item) =>
                    item.active ? (
                        <li key={item.name}>
                            <NavLink
                                to={item.slug}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'd-flex nav-items-active fw-very-bold px-6 py-2  inline-block text-primary-blue'
                                        : 'd-flex nav-items-inactive px-6 py-2  inline-block nav-items'
                                }
                            >
                                <span className='px-2 py-1'>{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
