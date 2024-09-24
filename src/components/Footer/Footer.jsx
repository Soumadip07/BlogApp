import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import NewsLetter from './NewsLetter'
import { useSelector } from 'react-redux';

function Footer() {
    const { posts, status } = useSelector((state) => state.posts || []);
    // console.log(posts)
    return (
        <section className="relative py-10 overflow-hidden border border-t-2 bg-light-primary border-t-black">
            <NewsLetter posts={posts?.documents.slice(15, 16)} />
            <div className="relative z-10 px-4 mx-auto max-w-7xl">
                <div className="flex flex-wrap -m-6">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col justify-between h-full">
                            <div className="inline-flex items-center mb-4">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2024. All Rights Reserved by Wren.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="font-semibold text-gray-500 uppercase text-s tracking-px mb-9">
                                Company
                            </h3>
                            <ul className='text-center'>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="font-semibold text-gray-500 uppercase text-s tracking-px mb-9">
                                Support
                            </h3>
                            <ul className='text-center'>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="font-semibold text-gray-500 uppercase text-s tracking-px mb-9 ">
                                Legals
                            </h3>
                            <ul className='text-center'>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium nav-items"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer