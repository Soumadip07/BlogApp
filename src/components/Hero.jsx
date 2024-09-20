import React from 'react';
import background from '../assets/object.png';
import SearchBox from './SearchBox';
import FeaturedPost from './FeaturedPost';
import Wave from './Wave';
import Popular from './Popular';
import AllArticles from './AllArticles';
import { useSelector } from 'react-redux';
import FeatureSlider from './FeaturesSlider';
function Hero() {
    const waveColor = localStorage.getItem("themeMode") === "dark" ? '#223044' : '#ffffff';
    // console.log(waveColor, "===", localStorage.getItem("themeMode"))
    const { posts, status } = useSelector((state) => state.posts || []);
    const post1 = posts?.documents?.[12];
    const post2 = posts?.documents?.[24];
    console.log(post1)
    return (
        <div className='flex items-center justify-center flex-column'>
            {/* Hero Section */}
            <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Background Image */}
                <img
                    src={background}
                    alt="background"
                    className="absolute top-0 left-0 object-cover w-full hero-banner"
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full bg-black opacity-25 hero-banner"></div>

                {/* Main Content */}
                <div className="relative z-10 text-center">
                    <h1 className="mb-5 text-4xl font-bold text-white">Our Newsroom</h1>
                    <SearchBox />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 z-10 w-full">
                <Wave color={waveColor} />
            </div>
            {/* Featured Post Section */}
            <div className="my-10">
                <FeaturedPost post={post1} />
            </div>
            <div className="my-10">
                <Popular />
            </div>
            <div className="my-10">
                <FeatureSlider posts={posts?.documents.slice(10, 16)} />
            </div>
            <div className="my-10">
                <AllArticles />
            </div>
        </div>
    );
}

export default Hero;
