import React from 'react';
import image from '../assets/Image.png'
import cardPlaceholder from '../assets/centralpush.png';
import appwriteService from '../appwrite/conifg'

function FeaturedPost({ post }) {
    console.log(post)
    return (
        <div className="relative flex justify-center w-full mt-10 fetaure-box">
            <div className="bg-white rounded-xl shadow-lg  flex flex-col md:flex-row w-[90%] max-w-5xl z-10">
                {/* Left Section: Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={post?.featuredImage ? appwriteService.getFilePreview(post?.featuredImage) : cardPlaceholder}
                        alt="Featured Post"
                        className="object-cover w-full rounded-xl fetaured-box"
                    />
                </div>
                {/* Right Section: Content */}
                <div className="flex flex-col justify-between w-full px-5 mt-5 md:w-1/2 md:mt-0">
                    <div>
                        <p className="mb-2 text-xs font-bold text-blue-500 uppercase">{post?.category}</p>
                        <h3 className="mb-3 text-xl font-bold">{post?.title}</h3>
                        <p className="mb-4 text-sm text-gray-600"
                            dangerouslySetInnerHTML={{ __html: post?.content }}
                        >
                        </p>
                    </div>
                    {/* Author and Date Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Author"
                                className="w-8 h-8 mr-2 rounded-full"
                            />
                            <div>
                                <p className="font-medium">Viola Manisa</p>
                                <p className="text-xs">Verified writer</p>
                            </div>
                        </div>
                        <p>02 May</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPost;
