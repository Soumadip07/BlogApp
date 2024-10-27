import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Logo, LogoutBtn } from '../index'

function Sidebar() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Latest",
            slug: "/latest",
            active: authStatus,
        },
        {
            name: "Category",
            slug: "/category",
            active: authStatus,
        },
        // {
        //   name: "User Post",
        //   slug: "/userPost",
        //   active: authStatus,
        // },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
        // {
        //   name: "Profile",
        //   slug: "/profile",
        //   active: authStatus,
        // },
    ]

    return (
        <div className='sidebar'>
            <div className='mr-4'>
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
                                        ? 'nav-items-active fs-700 px-6 py-2  inline-block text-primary-blue'
                                        : 'nav-items-inactive fs-700 px-6 py-2  inline-block nav-items'
                                }
                            >
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
